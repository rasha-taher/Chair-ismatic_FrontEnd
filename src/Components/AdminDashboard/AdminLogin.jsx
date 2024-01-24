import React, { useState } from "react";
import "../../Style/Admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const wurl = "https://chair-ismatic-backend.onrender.com";
  const handleLogin = async () => {
    try {
      const response = await fetch(wurl + "/user/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem("role", data.data.is_admin ? "admin" : "");
        window.location.href = "/dashboard"; // Redirect to the dashboard
      } else {
        // Handle login failure
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in as admin:", error);
    }
  };

  return (
    <div className="adminLoginContainer">
      <div className="loginAdminDiv">
        <label>Email</label>
        <input
          type="text"
          className="adminInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="adminInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="adminLoginBtn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
