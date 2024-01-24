import "../../Style/Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
const AdminAddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [succesText, setSuccesText] = useState("");

  const wurl = "https://chair-ismatic-backend.onrender.com";
  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post(wurl + "/user/addUser", {
        email,
        password,
        is_admin: false,
        is_client: userType === "Customer",
        is_vendor: userType === "Vendor",
        is_admin: userType === "Admin",
        firstName,
        lastName,
        phoneNumber,
      });
      setSuccessModal(true);
      setSuccesText(`User Added Successfully`);
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorText(
        "An error occurred while creating the user. Please try again."
      );
      setErrorModal(true);
    }
  };

  return (
    <div className="adminAddUser">
      <p className="divTitle">Add a user </p>
      <div className="groupInColumn">
        <div>
          <p className="descText">First Name: </p>
          <input
            type="text"
            className="addUserInput"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <p className="descText"> Last Name : </p>
          <input
            type="text"
            className="addUserInput"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <p className="descText">Email : </p>
      <input
        type="text"
        className="addUserInput"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <p className="descText">Password : </p>
      <input
        type="password"
        className="addUserInput"
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="descText">Phone Number: </p>
      <input
        type="number"
        className="addUserInput"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <select
        className="addUserInput userTypSelect"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="">Select User Type</option>
        <option value="Customer">Customer</option>
        <option value="Vendor">Vendor</option>
        <option value="Admin">Admin</option>
      </select>
      <div className="btn-div">
        <button type="submit" className="signUpBtn" onClick={handleSubmit}>
          Create Account
        </button>
      </div>
      {/* Success Modal */}
      {successModal && (
        <Modal
          modalText={succesText}
          buttonText="Start Browsing"
          closeModal={closeModal}
        />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal modalText={errorText} buttonText="Ok" closeModal={closeModal} />
      )}
    </div>
  );
};

export default AdminAddUser;
