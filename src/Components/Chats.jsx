import React, { useContext, useEffect, useRef, useState } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import "../Style/Chats.css";
import axios from "axios";
import send from "../Images/send.svg";
import userNotFound from "../Images/nonprof.png";
import { io } from "socket.io-client";
import Conversations from "./Conversations";
import Message from "./MessageDiv";

const Chats = () => {
  const user = localStorage.getItem("loggedInUserEmail");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const [selectedUser, setSelectedUser] = useState(null);
  const wurl = "http://localhost:8080";
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderEmail,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user && user.followings) {  // Check if user and user.followings are defined
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(
          user.followings.filter((f) => users.some((u) => u.userEmail === f))
        );
      });
    }
  }, [user]);
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          wurl + "/conversation/getConversationOfUser/" + user
        );
        setConversations(res.data);
        console.log("The conversation:", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          wurl + "/message/getMessages/" + currentChat._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.email
    );

    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(wurl + "/message/addMessage/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <MenuBar />
      <div className="userProfile">
        <div key={user} className="insideUserProfile">
          <div className="user-chat-bar">
            <div className="chatTitle">Recent Chats</div>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations conversation={c} currentUser={user} />
              </div>
            ))}
          </div>

          <div className="user-chat-content">
            {currentChat ? (
              <div ref={scrollRef}>
                {messages.map((m) => (
                  <Message message={m} own={m.sender === user} />
                ))}
              </div>
            ) : (
              <span> Open a Conversation To Start A Chat</span>
            )}

            <div className="toSendMessage">
              <input
                className="sendAMessage"
                placeholder="Enter Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="sendMessageBtn" onClick={handleSubmit}>
                <img src={send} alt="Send" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chats;
