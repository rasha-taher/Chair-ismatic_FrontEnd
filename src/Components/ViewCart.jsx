import React from "react";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import { useCart } from "../CartContext";
import bin from "../Images/bin.svg";
import "../Style/ViewCart.css";

const ViewCart = () => {
  const { cart, setCart } = useCart(); 

  const handleRemove = (id) => {
    // Find the index of the item with the specified id
    const indexToRemove = cart.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      // Create a new array without the item to be removed
      const updatedCart = [...cart.slice(0, indexToRemove), ...cart.slice(indexToRemove + 1)];
      
      // Update the cart state with the new array
      setCart(updatedCart);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getImageSrc = (imageData) => {
    const imageType = imageData.substring(5, imageData.indexOf(";"));
    return `data:${imageType};base64,${imageData}`;
  };
  return (
    <div>
      <MenuBar />
      <div className="viewCart">
        <div className="insideViewCart">
          <div className="cartHead">
            <p className="cartTitle"> Your Cart</p>
            <p className="continueShopping">
              <Link to="/products">Continue Shopping </Link>
            </p>
          </div>

          <div className="viewCartTable">
            <div className="tableHead">
              <div className="cartProduct">Product</div>
              <div className="cartProductForBill">Quantity</div>
              <div className="cartProductForBill">Total</div>
              <div className="cartProductBin"></div>
            </div>

            <div className="viewCartDetailsContainer">
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <div className="viewCartDetails" key={item.id}>
                    <div className="cartProduct">
                      <img
                        src={getImageSrc(item.image)}
                        alt="product image"
                        className="cartProductImage"
                      />
                      <div className="cartProductDetail">
                        <p className="cartProductName">{item.name}</p>
                        <div className="productPriceDiv">
                          <p className="productComponentPrice">{item.price}$</p>
                        </div>
                      </div>
                    </div>
                    <div className="cartProductForBill">{item.quantity}</div>
                    <div className="cartProductForBill">{item.price * item.quantity}$</div>
                    <div className="cartProductBin">
                      <button onClick={() => handleRemove(item.id)}>
                        <img src={bin} alt="bin" className="bin" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <div className="viewCart">
              <div className="cartProduct fullPrice">Estimated Price</div>
              <div className="cartProductForBill">{calculateTotalQuantity()}</div>
              <div className="cartProductForBill">{calculateCartTotal()}$</div>
              <div className="cartProductBin"></div>
            </div>
            <div className="viewCart">
              <Link to="/checkOut">
                <button className="proceedBtn"> Proceed To Checkout </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewCart;
