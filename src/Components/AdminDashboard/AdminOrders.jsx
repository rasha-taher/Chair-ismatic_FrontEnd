import React, { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const wurl = "https://chair-ismatic-backend.onrender.com";

  useEffect(() => {
    axios
      .get(wurl + "/bill/getAllBills")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching bill info:", error));
  }, []);
  return (
    <div className="tableContainer">
      <p className="divTitle"> View Orders </p>
      <table className="usersTable">
        <thead>
          <tr>
            <td className="table-data-title">Id</td>
            <td className="table-data-title">Email</td>
            <td className="table-data-title">Phone Number</td>
            <td className="table-data-title">Country</td>
            <td className="table-data-title">Total Price</td>
            <td className="table-data-title">Status</td>
            {/* <td className="table-data-title">Delete</td> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="table-data-row">
              <td className="table-data-data">{order._id}</td>
              <td className="table-data-data">{order.userEmail}</td>
              <td className="table-data-data">{order.phoneNumber}</td>
              <td className="table-data-data">{order.country}</td>
              <td className="table-data-data">{order.totalPrice}$</td>
              <td className="table-data-data">{order.status}</td>

              {/* <td className="table-data-data">
                <Link to={`/orderDetail/${order._id}`}>
                  <button
                    className="updateDataBtn"
                  >
                  View Product
                  </button>
                  </Link>
                </td> */}
              <td className="table-data-data">
                <Link to={`/editOrderDetail/${order._id}`}>
                  <button className="updateDataBtn deleteBtn">
                    Edit Order
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
