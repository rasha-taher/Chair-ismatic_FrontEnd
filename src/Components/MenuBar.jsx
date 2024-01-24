import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Style/MenuBar.css";
import logo from "../Images/chairs-black.svg";
import cart from "../Images/cart-black.svg";
import user from "../Images/user.svg";
import Modal from "./Modal";
import burgerMenu from "../Images/lines-menu.svg";
import { jwtDecode as jwt_decode } from "jwt-decode";
const MenuBar = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [switchToSeller, serSwitchToSeller] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("loggedInUserEmail"));
  const [password, setPassword] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState(
    "Incorrect email or password. Please try again."
  );
  const [showMenu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!showMenu);
  };
  const wurl = "http://localhost:8080";
  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
  };

  const closeLogin = (e) => {
    if (e.target.classList.contains("overlay")) {
      setLoginVisible(false);
      serSwitchToSeller(false);
    }
  };

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
        const { data } = await response.json();

        if (data && data.accessToken) {
          const accessToken = data.accessToken;
          const decodedToken = jwt_decode(accessToken);
          const userRole = decodedToken.UserInfo.roles;

          setSuccessModal(true);
          setLoginVisible(false);
          localStorage.clear();
          localStorage.setItem("loggedInUserEmail", email);
          localStorage.setItem("role", userRole);
        } else {
          console.error("Error logging in: Invalid response structure", data);
          setErrorModal(true);
        }
      } else {
        console.error("Error logging in: Response not okay", response);
        setErrorModal(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorModal(true);
    }
  };

  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  const role = localStorage.getItem("role");
  useEffect(() => {
    const closeMenu = () => {
      setMenu(false);
    };

    if (showMenu) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  return (
    <div className="MenuBar">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" className="logoImage" />
          <p className="logoText"> Chair-ismatic</p>
        </div>
      </Link>
     <div className="menuPages nomres">
        <ul className="menu-ul">
          <Link to="/">
            {" "}
            <li className="menu-li">Home</li>{" "}
          </Link>
          {role !== "vendor" && (
            <Link to="/products">
              {" "}
              <li className="menu-li">Products</li>{" "}
            </Link>
          )}
          <Link to="/about">
            {" "}
            <li className="menu-li">About</li>{" "}
          </Link>

          {role && role !== "customer" && (
            <Link to="/yourproduct">
              {" "}
              <li className="menu-li">Your Products</li>{" "}
            </Link>
          )}

          {role && role !== "customer" && (
            <Link to="/sellItems">
              {" "}
              <li className="menu-li">Sell Items</li>{" "}
            </Link>
          )}
          {role && (
            <Link to="/profile">
              {" "}
              <li className="menu-li">Your Profile</li>{" "}
            </Link>
          )}
          {role && (
            <Link to="/chats">
              {" "}
              <li className="menu-li">Your Chats</li>{" "}
            </Link>
          )}
        </ul>
      </div>
      <div className="menuIcons">
      <div className="menuimg" onClick={handleMenu}>
        <img src={burgerMenu} alt="logo" className="logoImage" />
      </div>
      {showMenu && (
        <div className="menuPages insideResp" >
          <ul className="menu-ul">
            <Link to="/">
              {" "}
              <li className="menu-li">Home</li>{" "}
            </Link>
            {role !== "vendor" && (
              <Link to="/products">
                {" "}
                <li className="menu-li">Products</li>{" "}
              </Link>
            )}
            <Link to="/about">
              {" "}
              <li className="menu-li">About</li>{" "}
            </Link>

            {role && role !== "customer" && (
              <Link to="/yourproduct">
                {" "}
                <li className="menu-li">Your Products</li>{" "}
              </Link>
            )}

            {role && role !== "customer" && (
              <Link to="/sellItems">
                {" "}
                <li className="menu-li">Sell Items</li>{" "}
              </Link>
            )}
            {role && (
              <Link to="/profile">
                {" "}
                <li className="menu-li">Your Profile</li>{" "}
              </Link>
            )}
            {role && (
              <Link to="/chats">
                {" "}
                <li className="menu-li">Your Chats</li>{" "}
              </Link>
            )}
          </ul>
        </div>
      )}
      <div>
        <img src={user} alt="user" className="menuIcon" onClick={toggleLogin} />

        <Link to="/cart">
          <img src={cart} alt="cart" className="menuIcon" />
        </Link>
        </div>
      </div>
      {loginVisible && (
        <div className="overlay" onClick={closeLogin}>
          <div className="login-Left">
            <div className="inside-login-Left">
              <p className="loginTitle">Log In</p>
              <p className="undertext">Enter Your Personal Information</p>
              <div className="login-information">
                <input
                  type="text"
                  className="login-content"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="login-content"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btn-div">
                <button className="loginBtn" onClick={handleLogin}>
                  Login
                </button>
                <p>Don't have an account? Sign Up!</p>
              </div>
              <div className="btn-div">
                <Link to="/signup">
                  <button className="loginBtn">Create An Account</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {successModal && (
        <Modal
          modalText="Welcome Back!"
          buttonText="Ok"
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

export default MenuBar;
