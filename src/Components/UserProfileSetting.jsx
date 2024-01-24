import "../Style/UserProfileSetting.css";
import Footer from "./Footer";
import MenuBar from "./MenuBar";
import { useState } from "react";
import UserProfile from "./UserProfile/UserProfile";
import ChangePassword from "./UserProfile/ChangePassword";
import axios from "axios";
import PreviousOrder from "./UserProfile/PreviousOrder";
import { Link } from "react-router-dom";
import SwitchToClient from "./UserProfile/SwitchToClient";
import SwitchToSeller from "./UserProfile/SwitchToSeller";
const UserProfileSetting = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const email = localStorage.getItem("loggedInUserEmail");
  const wurl = "https://chair-ismatic-backend.onrender.com";

  const handleClick = (section) => {
    setActiveSection(section);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        wurl + `/user/deleteUserByEmail/${email}`
      );
      if (response.data.success) {
        localStorage.clear();
        window.location.href = "/";
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const role = localStorage.getItem("role");
  return (
    <div>
      <MenuBar />
      <div className="userProfile">
        <div className="insideUserProfile">
          <div className="user-menu-bar">
            <ul className="user-menu-ul">
              <li
                className={`user-menu-li ${
                  activeSection === "Profile" ? "active" : ""
                }`}
                onClick={() => handleClick("Profile")}
              >
                My details
              </li>
              <li
                className={`user-menu-li ${
                  activeSection === "changePassword" ? "active" : ""
                }`}
                onClick={() => handleClick("changePassword")}
              >
                Change Password
              </li>
              {role == "customer" && (
                <li
                  className={`user-menu-li ${
                    activeSection === "yourOrder" ? "active" : ""
                  }`}
                  onClick={() => handleClick("yourOrder")}
                >
                  Your Order
                </li>
              )}
              {role == "vendor" && (
                <li
                  className={`user-menu-li ${
                    activeSection === "switchToClient" ? "active" : ""
                  }`}
                  onClick={() => handleClick("switchToClient")}
                >
                  Switch To Client
                </li>
              )}
              {role == "customer" && (
                <li
                  className={`user-menu-li ${
                    activeSection === "switchToSeller" ? "active" : ""
                  }`}
                  onClick={() => handleClick("switchToSeller")}
                >
                  Switch To Seller
                </li>
              )}
              <li
                className={`user-menu-li ${
                  activeSection === "logOut" ? "active" : ""
                }`}
                onClick={handleLogout}
              >
                Logout
              </li>
              <li
                className={`user-menu-li ${
                  activeSection === "deleteAccount" ? "active" : ""
                }`}
                onClick={() => handleClick("deleteAccount")}
              >
                Delete Account
              </li>
            </ul>
          </div>

          <div className="user-menu-content">
            <div
              id="Profile"
              style={{
                display: activeSection === "Profile" ? "block" : "none",
              }}
            >
              <UserProfile />
            </div>
            <div
              id="changePassword"
              style={{
                display: activeSection === "changePassword" ? "block" : "none",
              }}
            >
              <ChangePassword />
            </div>
            <div
              id="yourOrder"
              style={{
                display: activeSection === "yourOrder" ? "block" : "none",
              }}
            >
              <PreviousOrder />
            </div>
            <div
              id="switchToClient"
              style={{
                display: activeSection === "switchToClient" ? "block" : "none",
              }}
            >
              <SwitchToClient />
            </div>
            <div
              id="switchToSeller"
              style={{
                display: activeSection === "switchToSeller" ? "block" : "none",
              }}
            >
              <SwitchToSeller />
            </div>
            <div
              id="deleteAccount"
              style={{
                display: activeSection === "deleteAccount" ? "block" : "none",
              }}
            >
              <div className="delete-modal">
                <p className="deleteText">
                  Are you sure you want to delete your account?
                </p>
                <Link to="/profile">
                  <button className="updateDataBtn ">Back To profile</button>
                </Link>
                <button
                  className="updateDataBtn deleteBtn"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfileSetting;
