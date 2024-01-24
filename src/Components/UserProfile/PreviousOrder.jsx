import React, { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";

const PreviousOrder = () => {
  const [orders, setOrder] = useState([]);
  const email = localStorage.getItem("loggedInUserEmail");
  const wurl = "https://chair-ismatic-backend.onrender.com";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${wurl}/bill/getBillByEmail/${email}`);

      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const handleUpdateOrder = async (id) => {
    try {
      const response = await axios.put(`${wurl}/bill/cancelOrder/${id}`);

      if (response.status === 200) {
        console.log("Order details after cancellation:", response.data);
        fetchOrders();
      } else {
        console.error(
          "Error updating order status:",
          response.data.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error updating order status:",
        error.message || "Unknown error"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [email]);

  return (
    <div>
      <p className="userTitle"> Your Orders </p>
      <table className="usersTable">
        <thead>
          <tr>
            <td className="table-data-title">Id</td>
            <td className="table-data-title">Date</td>
            <td className="table-data-title">Price</td>
            <td className="table-data-title">Status</td>
            <td className="table-data-title"></td>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id} className="table-data-row">
                <td className="table-data-data">{order._id}</td>
                <td className="table-data-data">{order.date}</td>
                <td className="table-data-data">{order.totalPrice}</td>
                <td className="table-data-data">{order.status}</td>
                <td className="table-data-data">
                  <button
                    className="updateDataBtn"
                    onClick={() => handleUpdateOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default PreviousOrder;
