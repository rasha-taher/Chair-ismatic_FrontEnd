import React, { useState, useEffect } from "react";
import "../Style/Chats.css";
import userNotFound from '../Images/nonprof.png';

const Conversations = ({ currentUser, onClick, isClicked }) => {
  return (
    <div onClick={() => onClick(currentUser)} className={`conversation ${isClicked ? 'clicked' : ''}`}>
      <div className="chats">
        <div key={currentUser.email} className="single-user">
          {currentUser.profileImage ? (
            <img src={currentUser.profileImage} className="userChatImage" alt="Profile" />
          ) : (
            <img src={userNotFound} className="userChatImage" alt="User Not Found" />
          )}
          <div>
            <p className={`userChatName ${isClicked ? 'clicked' : ''}`}>
              {currentUser.firstName} {currentUser.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;