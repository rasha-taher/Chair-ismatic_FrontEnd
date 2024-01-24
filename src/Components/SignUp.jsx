import "../Style/SignUp.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Email_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [succesText, setSuccesText] = useState("");

  const wurl = "http://localhost:8080";
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password == matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = Email_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);

    if (!v1 || !v2 || !userType) {
      setErrorText("Invalid email, password, or user type. Please try again.");
      setErrorModal(true);
      return;
    }

    try {
      const userResponse = await axios.post(wurl + "/user/addUser", {
        email,
        password,
        is_admin: false,
        is_client: userType === "Customer",
        is_vendor: userType === "Vendor",
        is_admin: false,
        firstName,
        lastName,
        phoneNumber,
      });

      localStorage.clear();
      localStorage.setItem("loggedInUserEmail", email);

      console.log("User Type:", userType);
      if (userType === "Customer") {
        localStorage.setItem("role", "customer");
      } else if (userType === "Vendor") {
        localStorage.setItem("role", "vendor");
      }

      setSuccessModal(true);
      setSuccesText(`Welcome ${firstName} ${lastName}!`);

      console.log(userResponse.data);
      console.log(userResponse.accessToken);
      console.log(JSON.stringify(userResponse.data));
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorText(
        "An error occurred while creating the account. Please try again."
      );
      setErrorModal(true);
    }
  };
  const handleProceed = () => {
    window.location.href = "/";
  };
  return (
    <div className="signUp">
      <div className="signUp-Left"></div>
      <div className="signUp-Right">
        <form onSubmit={handleSubmit} className="inside-signUp-Right">
          <p className="signUpTitle">New User?</p>
          <p className="undertext">Enter Your Personal Information</p>
          <div className="signUp-information">
            <div className="signUp-information-row">
              <input
                type="text"
                id="firstName"
                className="signUp-content"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="signUp-content"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              className="signUp-content width-plus"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="signUp-content width-plus"
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="signUp-information-row">
              <input
                type="password"
                className="signUp-content"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />

              <input
                type="password"
                id="confirmPassword"
                className="signUp-content"
                placeholder="Confirm Password"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
            </div>

            {!validPwd ? (
              <p className="error-message">
                Password must be at least 8 characters and include at least one
                uppercase letter, one lowercase letter, and one digit.
              </p>
            ) : (
              !validMatch && (
                <p className="error-message">Passwords do not match.</p>
              )
            )}

            <select
              className="signUp-content width-plus-select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select User Type</option>
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>
          <div className="btn-div">
            <button type="submit" className="signUpBtn">
              Create Account
            </button>
            <p> Already Have an account? Login </p>
          </div>
        </form>
      </div>
      {/* Success Modal */}
      {successModal && (
        <Modal
          modalText={succesText}
          buttonText="Start Browsing"
          closeModal={handleProceed}
        />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal modalText={errorText} buttonText="Ok" closeModal={closeModal} />
      )}
    </div>
  );
};

export default SignUp;
