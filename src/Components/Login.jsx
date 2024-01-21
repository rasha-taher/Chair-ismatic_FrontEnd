import React, { useState } from "react";
import "../Style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const wurl = "http://localhost:8080";
  const handleLogin = async () => {
    try {
      const response = await fetch(wurl + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the server response includes a data field with accessToken
        const accessToken = data.data.accessToken;
        // Store the accessToken securely (e.g., in local storage or a state management tool)
        console.log("Login successful! Access Token:", accessToken);
      } else {
        // Handle error responses
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <div className="login-Left">
        <div className="inside-login-Left">
          <p className="loginTitle">Log In</p>
          <p className="undertext">Enter Your Personal Information</p>
          <div className="login-information">
            <input
              type="text"
              className="login-content"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="login-content"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn-div">
            <button className="loginBtn" onClick={handleLogin}>
              Login
            </button>
            <p> Don't have an account? Sign Up! </p>
          </div>
        </div>
      </div>
      <div className="login-Right"></div>
    </div>
  );
};

export default Login;
