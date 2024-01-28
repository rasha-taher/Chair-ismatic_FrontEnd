import React, { useState } from "react";
import "../Style/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const wurl = "https://chair-ismatic-backend.onrender.com";
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
        const accessToken = data.data.accessToken;

        document.cookie = `access_token=${accessToken}; path=/; max-age=${30 * 60}`;
        window.location.href = "/";
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
      <div className="login-page-Left">
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
            <p>
              {" "}
              Don't have an account? <Link to="/signup">Sign Up!</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="login-page-Right"></div>
    </div>
  );
};

export default Login;
