import React from "react";
import { useState } from "react";
import "../../Style/Admin.css";
import logout from "../../Images/log-out.svg";
import personAdd from "../../Images/person-add.svg";
import home from "../../Images/home.svg";
import users from "../../Images/users.svg";
import AddUser from "../AdminDashboard/AdminAddUser";
import AdminVendors from "./AdminVendors";
import AdminCustomers from "./AdminCustomers";
import DashboardHome from "./DashboardHome";
import order from "../../Images/order.svg";
import AdminOrders from "./AdminOrders";
import category from '../../Images/category.svg';
import AdminCategories from './AdminCategories'
const Dashboard = () => {
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/admin";
  };
  const [activeSection, setActiveSection] = useState(null);
  const handleClick = (section) => {
    switch (section) {
      case "addUser":
        setActiveSection("addUser");
        break;
      case "home":
        setActiveSection("home");
        break;
      case "seeVendors":
        setActiveSection("seeVendors");
        break;
      case "seeCustomers":
        setActiveSection("seeCustomers");
        break;
      case "orders":
        setActiveSection("orders");
        break;
      case "category":
        setActiveSection("category");
        break;

      default:
        setActiveSection("home");
    }
  };
  return (
    <div>
      <div className="dashboard-container">
        <div className="side-menu">
          <p className="dash-title"> Dashboard </p>
          <ul className="dash-menu-ul">
            <li className="dash-menu-li" onClick={() => handleClick("home")}>
              <img src={home} className="dash-icons" /> <p> Home </p>
            </li>
            <li
              className="dash-menu-li"
              onClick={() => handleClick("seeVendors")}
            >
              <img src={users} className="dash-icons" />
              <p> Vendors</p>
            </li>
            <li
              className="dash-menu-li"
              onClick={() => handleClick("seeCustomers")}
            >
              <img src={users} className="dash-icons" />
              <p> Customers</p>
            </li>
            <li className="dash-menu-li" onClick={() => handleClick("addUser")}>
              {" "}
              <img src={personAdd} className="dash-icons" /> <p>Add A User </p>
            </li>
            <li className="dash-menu-li" onClick={() => handleClick("orders")}>
              {" "}
              <img src={order} className="dash-icons" /> <p>Orders </p>
            </li>
            <li className="dash-menu-li" onClick={() => handleClick("category")}>
              {" "}
              <img src={category} className="dash-icons" /> <p>Categories </p>
            </li>
            <li className="dash-menu-li" onClick={handleLogout}>
              <img src={logout} className="dash-icons" />
              <p> Log Out</p>{" "}
            </li>
          </ul>
        </div>

        <div className="dash-content">
          <div
            id="home"
            style={{ display: activeSection === "home" ? "block" : "none" }}
          >
            <DashboardHome />
          </div>
          <div
            id="addUser"
            style={{ display: activeSection === "addUser" ? "block" : "none" }}
          >
            <AddUser />
          </div>
          <div
            id="seeVendors"
            style={{
              display: activeSection === "seeVendors" ? "block" : "none",
            }}
          >
            <AdminVendors />
          </div>
          <div
            id="seeCustomers"
            style={{
              display: activeSection === "seeCustomers" ? "block" : "none",
            }}
          >
            <AdminCustomers />
          </div>
          <div
            id="orders"
            style={{ display: activeSection === "orders" ? "block" : "none" }}
          >
            <AdminOrders />
          </div>
          <div
            id="category"
            style={{ display: activeSection === "category" ? "block" : "none" }}
          >
            <AdminCategories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
