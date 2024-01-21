import React, { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DashBoardHome from "./Dashboard";
const EditOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [statusOptions, setStatusOptions] = useState([
    "Packing",
    "On its way",
    "Completed",
    "Canceled",
  ]);

  const wurl = "http://localhost:8080";

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await axios.get(`${wurl}/bill/getBillById/${id}`);
        console.log("Order details:", response.data[0]);
        setOrder(response.data[0]);
        setStatusOptions((prevOptions) => {
          const status = response.data[0].status;
          return prevOptions.includes(status)
            ? prevOptions
            : [status, ...prevOptions];
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchOrderById();
  }, [id]);

  const handleInputChange = (field, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  if (!order) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  const updateOrder = async () => {
    try {
      const response = await axios.put(
        `${wurl}/bill/updateBillById/${id}`,
        order
      );
      console.log("Update response:", response.data);
      // Optionally, you can handle success or error messages here
    } catch (error) {
      console.error("Error updating order:", error);
      // Optionally, you can handle error messages here
    }
  };

  const {
    userEmail,
    firstName,
    lastName,
    phoneNumber,
    country,
    city,
    streetAddress,
    postalCode,
    date,
    status,
    paymentMethod,
    productsInCart,
  } = order;

  return (
    <div className="editOrderDetailDiv">
      <p className="editTitle">Edit Order # {order._id}:</p>
      <div className="editOrderDetail">
        <div>
          <div className="orderDetailRow">
            {" "}
            <p>Email:</p>
            <input
              value={userEmail}
              onChange={(e) => handleInputChange("userEmail", e.target.value)}
              disabled
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>First Name:</p>
            <input
              value={firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>Last Name:</p>
            <input
              value={lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>Phone Number:</p>
            <input
              value={phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className="orderDetailRow">
            {" "}
            <p>Country:</p>{" "}
            <input
              value={country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>City:</p>{" "}
            <input
              value={city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>Street Address:</p>
            <input
              value={streetAddress}
              onChange={(e) =>
                handleInputChange("streetAddress", e.target.value)
              }
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>Postal Code:</p>
            <input
              value={postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className="orderDetailRow">
            {" "}
            <p>Date:</p>{" "}
            <input
              value={date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              disabled
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>Status:</p>{" "}
            <select value={status} onChange={(e) => handleInputChange('status', e.target.value)}>
  {statusOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
          </div>
          <div className="orderDetailRow">
            {" "}
            <p>Payment Method:</p>{" "}
            <input
              value={paymentMethod}
              onChange={(e) =>
                handleInputChange("paymentMethod", e.target.value)
              }
              disabled
            ></input>
          </div>
          <div className="orderDetailRow">
            {" "}
            <div className="biggerText">Products In cart: </div>
            {productsInCart.map((product, index) => (
              <div key={index}>
                <div className="orderDetailRow">
                  {" "}
                  <p>Product Name:</p>{" "}
                  <input
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(
                        `productsInCart.${index}.name`,
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <div className="orderDetailRow">
                  {" "}
                  <p>Quantity:</p>{" "}
                  <input
                    value={product.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        `productsInCart.${index}.quantity`,
                        e.target.value
                      )
                    }
                  ></input>
                </div>
                <div className="orderDetailRow">
                  {" "}
                  <p>Color: </p>
                  <input
                    value={product.color}
                    onChange={(e) =>
                      handleInputChange(
                        `productsInCart.${index}.color`,
                        e.target.value
                      )
                    }
                  ></input>
                </div>
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>
      <button className="updateDataBtn" onClick={updateOrder}>
        Update Order
      </button>
      <Link to="/dashboard">
        <button className="updateDataBtn deleteBtn">Back To Dashboard</button>
      </Link>
    </div>
  );
};

export default EditOrderDetail;
