import React, { useContext, useEffect, useRef, useState } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import "../Style/Chats.css";
import axios from "axios";
import send from "../Images/send.svg";
import { io } from "socket.io-client";
import Conversations from "./Conversations";
import Message from "./MessageDiv";

const Chats = () => {
  const user = sessionStorage.getItem("loggedInUserEmail");
  const userRole = sessionStorage.getItem("role");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [clickedUser, setClickedUser] = useState(null);
  const socket = useRef();
  const wurl = "https://chair-ismatic-backend.onrender.com";
  const scrollRef = useRef();
  const handleConversationClick = (user) => {
    setClickedUser(user);
  };

  useEffect(() => {
    axios
      .get(wurl + "/user/getAllUsers")
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching customer data:", error));
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("Received message:", data);
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

   useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (!clickedUser) {
          console.log("No user selected.");
          return;
        }
  
        const res = await axios.get(
          `${wurl}/conversation/getConversationOfTwoUser/${user}/${clickedUser.email}`
        );
  
        if (res.data) {
          setCurrentChat(res.data);
        } else {
          console.log("No conversation found. Creating a new one...");
          createConversation();
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };
  
    const createConversation = async () => {
      try {
        const newConversationRes = await axios.post(
          `${wurl}/conversation/newConversation`,
          {
            senderEmail: user,
            receiverEmail: clickedUser.email,
          }
        );
  
        setCurrentChat(newConversationRes.data);
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    };
  
    fetchConversation();
  }, [user, clickedUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!currentChat || !currentChat.members) {
        // If no currentChat, create a new conversation
        const newConversationData = {
          senderEmail: user,
          receiverEmail: clickedUser.email,
        };

        const newConversationRes = await axios.post(
          wurl + "/conversation/newConversation",
          newConversationData
        );

        const newConversation = newConversationRes.data;
        setCurrentChat(newConversation);
      }

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

      const res = await axios.post(wurl + "/message/addMessage/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error handling submit:", err);
    }
  };

  return (
    <div>
      <MenuBar />
      <div className="userProfile">
        <div key={user} className="insideUserProfile">
          <div className="user-chat-bar">
            <div className="chatTitle">Recent Chats</div>
            {vendors.map((c) => (
              <div key={c.email} onClick={() => setCurrentChat(c)}>
                <Conversations
                  currentUser={c}
                  onClick={handleConversationClick}
                  isClicked={clickedUser === c}
                />
              </div>
            ))}
          </div>

          <div className="user-chat-content">
            {currentChat ? (
              <div className='user-chat-messages'ref={scrollRef}>
                {messages.map((m) => (
                  <Message key={m._id} message={m} own={m.sender === user} />
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
