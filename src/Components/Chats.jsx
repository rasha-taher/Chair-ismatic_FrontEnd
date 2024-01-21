import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import user from '../Images/nonprof.png'
import '../Style/Chats.css'
import send from '../Images/send.svg'
import io from 'socket.io-client';
import { useParams } from 'react-router-dom'; 

const socket = io(); // Connect to the Socket.IO server

const Chats = () => {
    const { vendorEmail } = useParams(); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const wurl = "http://localhost:8080";
    useEffect(() => {
      
        socket.emit('join_room', vendorEmail);
        fetchMessages(vendorEmail);
    
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
          // Update messages by appending the new message
          setMessages(prevMessages => [...prevMessages, data]);
        });
    
        return () => {
          // Clean up event listeners when the component unmounts
          socket.off('receive_message');
        };
    }, [vendorEmail]);

  
    const fetchMessages = (vendorEmail) => {
      // Fetch messages from the server based on the vendor's email
      // You need to implement this endpoint on your server
      // Example: /api/messages/:vendorEmail
      fetch(wurl+`/api/messages/${vendorEmail}`)
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => console.error('Error fetching messages:', error));
    };
  
    const handleSendMessage = () => {
      // Send a new message to the server
      socket.emit('send_message', { room: vendorEmail, message: newMessage });
      setNewMessage(newMessage);
    };
  return (
    <div>
      <MenuBar />
      <div className="userProfile">
        <div className="insideUserProfile">
          <div className="user-chat-bar">
            <div className="chatTitle">
             Recent Chats
            </div>
            <div className="single-user">
            <img src={user} className="userChatImage"/>
            <div>
            <p className="userChatName">
            {vendorEmail}
                </p>
                <p className="latestMessage">
                  {messages.length > 0 && messages[messages.length - 1].text}
                </p>
            </div>
            </div>
          </div>

          <div className="user-chat-content">
           <div className="chats">
            <div className="userChatUserName">
            <img src={user}/>
            <p className="insideChatUserName">
            {vendorEmail}
                 </p>
            </div>
            <div className="messageContainer">
                {messages.map((message, index) => (
                  <div key={index} className="singleMessage">
                    <p className="messageText">
                      {message.sender}: {message.text}
                    </p>
                  </div>
                ))}
              </div>
           </div>
           <div className="toSendMessage">
              <input
                className="sendAMessage"
                placeholder="Enter Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="sendMessageBtn" onClick={handleSendMessage}>
                <img src={send} alt="Send"/>
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
