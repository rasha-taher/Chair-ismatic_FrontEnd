import React, { useState } from "react";
import axios from "axios";
import "../../Style/UserProfileSetting.css";
import Modal from "../Modal";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [succesText, setSuccesText] = useState("");

  const wurl = "http://localhost:8080";

  const handleProceed = () => {
    window.location.href = "/";
  }
  const handleUpdatePassword = async () => {
    try {
        if (!newPassword || typeof newPassword !== 'string') {
            setErrorMessage("Invalid new password");
            return;
          }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage("Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one digit.");
        return;
      }
  
      const response = await axios.put(wurl+`/user/updatePassword`, {
        currentPassword: oldPassword,
        newPassword: newPassword,
      });
  
  
      if (response.data.success) {
        localStorage.clear()
        setErrorMessage("");
        setSuccessModal(true);
        setSuccesText(`Password updated successfully! Please Login Again`)
      
      } else {
        // Handle the case where the password update fails
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  return (
    <div className="changePassword">
      <p className="userTitle"> Change Your Password </p>
      <input
        type="password"
        className="change-pass-input"
        placeholder="Enter Your Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        className="change-pass-input"
        placeholder="Enter Your New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        className="change-pass-input"
        placeholder="Confirm Your New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button
        type="button"
        className="saveBtns updateBtn"
        onClick={handleUpdatePassword}
      >
        Update Password
      </button>
     {/* Success Modal */}
     {successModal && (
        <Modal modalText={succesText} buttonText="Login" closeModal={handleProceed} />
      )}
    </div>
  );
};

export default ChangePassword;
