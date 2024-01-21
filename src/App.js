import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import About from "./Components/About";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProductsPage from "./Components/ProductsPage";
import ProductDescription from "./Components/ProductDescription";
import ViewCart from "./Components/ViewCart";
import CheckOut from "./Components/CheckOut";
import SellItems from "./Components/SellItems";
import Admin from "./Components/AdminDashboard/AdminLogin.jsx";
import Dashboard from "./Components/AdminDashboard/Dashboard.jsx";
import Missing from "./Components/Missing";
import UserProfileSetting from "./Components/UserProfileSetting.jsx";
import VendorProducts from "./Components/VendorProducts.jsx";
import VendorEditProduct from "./Components/VendorEditProduct.jsx";
import "./Style/Responsive.css";
import OrderDetail from "./Components/AdminDashboard/OrderDetail.jsx";
import EditOrderDetail from "./Components/AdminDashboard/EditOrderDetail.jsx";
import Chats from "./Components/Chats.jsx";
function App() {
  const userRole = localStorage.getItem("role");
  const PrivateRouteCustomer = ({ element }) => {
    return userRole === "customer" ? (
      element
    ) : (
      <Navigate to="/missing" replace />
    );
  };
  const PrivateRouteVendor = ({ element }) => {
    return userRole === "vendor" ? element : <Navigate to="/missing" replace />;
  };

  const PrivateRouteAdmin = ({ element }) => {
    return userRole === "admin" ? element : <Navigate to="/missing" replace />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route path="/productDetails/:id" element={<ProductDescription />} />
          <Route path="/cart" element={<ViewCart />} />

          <Route
            path="/yourproduct"
            element={<PrivateRouteVendor element={<VendorProducts />} />}
          />
          <Route
            path="/editProduct/:id"
            element={<PrivateRouteVendor element={<VendorEditProduct />} />}
          />
          <Route
            path="/sellItems"
            element={<PrivateRouteVendor element={<SellItems />} />}
          />

          <Route path="/checkOut" element={<CheckOut />} />

          <Route
            path="/dashboard"
            element={<PrivateRouteAdmin element={<Dashboard />} />}
          />

          <Route path="/admin" element={<Admin />} />
          <Route path="/orderDetail/:id" element={<OrderDetail />} />
          <Route path="/editOrderDetail/:id" element={<EditOrderDetail />} />
          <Route path="/missing" element={<Missing />} />
          <Route path="/profile" element={<UserProfileSetting />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/*" element={<Missing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
