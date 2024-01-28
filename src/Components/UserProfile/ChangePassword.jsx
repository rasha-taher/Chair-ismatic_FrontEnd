import React, { useState } from "react";
import axios from "axios";
import Modal from "../Modal";
import "../../Style/UserProfileSetting.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState("");

  const apiUrl = "https://chair-ismatic-backend.onrender.com";

  const handleProceed = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleUpdatePassword = async () => {
    try {
      // Check if new password matches the regex pattern
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage(
          "Password must be at least 8 characters and contain at least one letter and one number"
        );
      }

      const userEmail = sessionStorage.getItem("loggedInUserEmail");

      const response = await axios.put(`${apiUrl}/user/updatePassword`, {
        email: userEmail,
        oldPassword,
        newPassword,
        confirmPassword,
      });

      // Handle the response based on status
      if (response.status === 200) {
        setSuccessText("Password updated successfully!");
        setSuccessModal(true);
      } else {
        setErrorMessage(
          "Failed to update password. Please check your old password and try again."
        );
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
      setErrorMessage("An unexpected error occurred. Please try again later.");
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
        <Modal
          modalText={successText}
          buttonText="Login"
          closeModal={handleProceed}
        />
      )}
    </div>
  );
};

export default ChangePassword;
