import React, { useState, useEffect } from "react";
import "../Style/Chats.css";

import userNotFound from "../Images/nonprof.png";
import axios from "axios";
const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const [vendors, setVendors] = useState([]);
  const wurl = "http://localhost:8080";
  useEffect(() => {
    const friendEmail = conversation.members.find(
      (m) => m !== currentUser.email
    );

    const getUser = async () => {
      try {
        const res = await axios.get(
          wurl + `/user/getUserByEmail/${friendEmail}`
        );
        console.log("User Response:", res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const getImageSrc = (imageData) => {
    if (imageData) {
      const imageType = imageData.substring(5, imageData.indexOf(";"));
      return `data:${imageType};base64,${imageData}`;
    } else {
      return userNotFound;
    }
  };
  useEffect(() => {
    axios
      .get(wurl + "/user/vendors")
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching customer data:", error));
  }, []);

  return (
    <div>
      <div className="chats">
      {/* {vendors.map((vendor) => ( */}
              <div
                // key={vendor.email}
                className="single-user"
              >
                <img
                //   src={getImageSrc(vendor.image)}
                  className="userChatImage"
                />
                <div>
                  <p className="userChatName">
                    {/* {vendor.firstName} {vendor.lastName} */}
                  </p>
                  <p className="latestMessage"> 
                  {/* {vendor.email}  */}
                  </p>
                </div>
              </div>
            {/* ))} */}
            </div>
    </div>
  );
};

export default Conversations;
