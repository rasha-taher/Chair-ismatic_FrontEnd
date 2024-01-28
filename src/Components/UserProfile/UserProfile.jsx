import React, { useState, useEffect } from "react";
import "../../Style/UserProfileSetting.css";
import axios from "axios";
import defaultImage from "../../Images/nonprof.png";
import Modal from "../Modal";
const UserProfile = () => {
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("loggedInUserEmail"));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [succesText, setSuccesText] = useState("");

  const wurl = "https://chair-ismatic-backend.onrender.com";
  useEffect(() => {
    // Fetch user data from backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          wurl + `/user/getUserByEmail/${email}`
        ); // Replace with your backend API endpoint
        const userData = response.data[0];

        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phoneNumber || "");
        setImagePreview(userData.profileImage || defaultImage);
        setGender(userData.gender || "");
        setBirthDay(userData.birthday || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Update user data in the backend
      await axios.put(wurl + `/user/updateUserByEmail/${email}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        profileImage: image,
        gender,
        birthday,
      });
      setSuccessModal(true);
      setSuccesText(`Updated Successfully`);
    } catch (error) {
      setErrorText(
        "An error occurred while updating your information. Please try again."
      );
      setErrorModal(true);
    }
  };
  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  return (
    <div>
      <div className="imageDiv">
        {imagePreview && (
          <img src={imagePreview} className="userImage" alt="user" />
        )}
        <div className="nextToImage">
          <p className="userTitle"> Profile </p>
          <p className="smallerTitle">Update your photo and personal details</p>
          <input
            type="file"
            accept="image/*"
            className="user-upload-image"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div className="userProfileDetails">
        <div>
          <p className="userInfoText"> First Name: </p>
          <input
            type="text"
            id="firstName"
            className="signUp-content width-plus"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <p className="userInfoText"> Last Name: </p>
          <input
            type="text"
            className="signUp-content width-plus"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <p className="userInfoText"> Email </p>
        <input
          type="email"
          className="signUp-content width-plus"
          placeholder="Enter Your Email"
          value={email}
          disabled
        />
        <p className="userInfoText"> Phone Number: </p>
        <input
          type="text"
          className="signUp-content width-plus"
          placeholder="Enter Your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <p className="userInfoText"> Your Gender</p>

        <div className="form-check">
          <input
            type="radio"
            name="gender"
            value="Male"
            className="form-check-input"
            checked={gender === "Male"}
            onChange={() => setGender("Male")}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            className="form-check-input"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
          />
          Female
          <input
            type="radio"
            name="gender"
            value="Unknown"
            className="form-check-input"
            checked={gender === "Unknown"}
            onChange={() => setGender("Unknown")}
          />
          Prefer not to say
        </div>

        <p className="userInfoText"> BirthDay </p>
        <input
          type="datepicker"
          className="signUp-content width-plus"
          placeholder="dd/mm/yyyy"
          value={birthday}
          onChange={(e) => setBirthDay(e.target.value)}
        />
      </div>
      <div className="user-btn-div">
        <button type="button" className="saveBtns" onClick={handleSave}>
          Save
        </button>
      </div>
      {/* Success Modal */}
      {successModal && (
        <Modal modalText={succesText} buttonText="Ok" closeModal={closeModal} />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal modalText={errorText} buttonText="Ok" closeModal={closeModal} />
      )}
    </div>
  );
};

export default UserProfile;
