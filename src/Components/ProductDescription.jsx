import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import { useCart } from "../CartContext"; // Import useCart from CartContext
import "../Style/ProductDescription.css";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { cart, setCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Added state for the selected image index
  const [chosenColorIndex, setChosenColorIndex] = useState(0);
  const wurl = "https://chair-ismatic-backend.onrender.com";

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(
          `${wurl}/product/getProductById/${id}`
        );
        console.log("Product details:", response.data[0]); // Log the product details
        setProduct(response.data[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductById();
  }, [id]);

  if (!product) {
    return (
      <div>
        <MenuBar />
        <p>Loading...</p>
        <Footer />
      </div>
    );
  }
  const closeModal = () => {
    setAddedToCart(false);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleColorClick = (index) => {
    setChosenColorIndex(index);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const getImageSrc = (imageData) => {
    const imageType = imageData.substring(5, imageData.indexOf(";"));
    return `data:${imageType};base64,${imageData}`;
  };

  const isProductSoldOut = product.quantity === 0;

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product && product.id,
      name: product && product.name,
      price: product && product.discountPrice ? product.discountPrice : product.price,
      quantity,
      image: product && product.image[chosenColorIndex],
      color: product && product.colors[chosenColorIndex],
    };
    setCart((prevCart) => [...prevCart, itemToAdd]);
    setAddedToCart(true);
  };

  const renderColors = (colors) => {
    return colors.map((color, index) => (
      <div
        key={index}
        className={`color c${index + 1} ${
          index === chosenColorIndex ? "selected" : ""
        }`}
        style={{ backgroundColor: color }}
        onClick={() => handleColorClick(index)}
      ></div>
    ));
  };
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };
  return (
    <div>
      <MenuBar />
      <div className="productDetails">
        <div className="innerProductDetails">
          <div className="productDetailsIamges">
            <div>
              <img
                src={getImageSrc(product.image[selectedImageIndex])}
                className="bigImage"
                alt="Product"
              />
              {isProductSoldOut && <div className="soldOut">Sold Out</div>}
            </div>
            <div className="imageDiv">
              {product.image.map((image, index) => (
                <img
                  key={index}
                  src={getImageSrc(image)}
                  className={`smallImages ${
                    index === selectedImageIndex ? "selected" : ""
                  }`}
                  alt="Product"
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="productDetailsDetail">
            <div className="productCategory">
              <p>Category: </p> &nbsp;
              <p className="categorytext">{product.category}</p>
            </div>
            <p className="productName">{product.name}</p>
           
              {product.discountPrice && product.discountPrice !== "" ? (
                <div className="productDetailsIamgesDiv" >
          
                    <span className="productComponentDiscount">
                      {product.price}$
                    </span>{" "}
                    <p className="productPrice">
                    {product.discountPrice}$
                  </p>
              </div>
              ) : (
                <p className="productPrice">{product.price}$</p>
              )}
          
            <div className="flexRow">
              <p className="categorytext">By: &nbsp;</p>{" "}
              <p>{product.user_email}</p>
            </div>
            <div>
              <p className="categorytext">Description:</p>
              <p className="productsDesc">{product.description}</p>
            </div>
            <div>
              <p className="categorytext">Available color:</p>
              <div className="colorDiv">{renderColors(product.colors)}</div>
            </div>
            <div className="buttonsDiv">
              <div className="numberButton">
                <p onClick={handleDecreaseQuantity}>-</p>
                <p>{quantity}</p>
                <p onClick={handleIncreaseQuantity}>+</p>
              </div>
              <button
                className="addToCartBtn"
                onClick={handleAddToCart}
                disabled={isProductSoldOut}
              >
                {isProductSoldOut ? "Sold Out" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {addedToCart && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Product Added To Cart</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={closeModal}
                  >
                    Ok
                  </button>
                  <Link to="/cart">
                    <button type="button" className="btn btn-primary">
                      ViewCart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
