import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import Modal from "./Modal";
import "../Style/SellItem.css";

const VendorEditProduct = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState("");
  const [chosenColorIndex, setChosenColorIndex] = useState(0);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const wurl = "https://chair-ismatic-backend.onrender.com";

  const handleProceed = () => {
    window.location.href = `/productDetails/${id}`;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setImage([base64String]); // Set image as an array
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${wurl}/product/getProductById/${id}`
        );
        const product = response.data[0];

        setProductName(product.name);
        setDescription(product.description);
        setSelectedCategory(product.category);
        setColors(product.colors || []);
        setQuantity(product.quantity);
        setPrice(product.price);
        setDiscountPrice(product.discountPrice);
        setImage(product.image || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  const handlePostItem = async () => {
    try {
      const updatedProduct = {
        name: productName,
        description: description,
        category: selectedCategory,
        color: colors,
        quantity: quantity,
        price: price,
        discountPrice: discountPrice,
        image: image,
      };

      const response = await axios.put(
        `${wurl}/product/updateProductById/${id}`,
        updatedProduct
      );

      if (response.data.success) {
        setSuccessText("Edit Product Successfully!");
        setSuccessModal(true);
      } else {
        setErrorText("Error editing the product. Please try again.");
        setErrorModal(true);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...colors];
    updatedColors[index] = newColor;
    setColors(updatedColors);
  };
  
    const getImageSrc = (imageData) => {
    const imageType = imageData.substring(5, imageData.indexOf(";"));
    return `data:${imageType};base64,${imageData}`;
  };
  return (
    <div>
      <MenuBar />
      <div className="sellItemContainer">
        <div className="insideSellItemContainer">
          <p className="sellItemTitle"> Edit Your Product</p>

          <div className="sellItemDetails">
            <div className="productCategoryToSell">
              <p className="descText"> Category Of Your Product: </p> &nbsp;
               <input
                type="text"
                className="productInputsToSell"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled
              />
            </div>

            <div className="productCategoryToSell">
              <p className="descText"> Name Of Your Product: </p>
              <input
                type="text"
                className="productInputsToSell"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <p className="descText"> Description: </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="productInputsToSell textArea"
              />
              <p className="descText"> Colors: </p>
              <div className="colorPickerContainer">
                {colors.map((c, index) => (
                  <input
                    key={index}
                    type="color"
                    className={`colorPicker ${
                      chosenColorIndex === index ? "selected" : ""
                    }`}
                    value={c}
                    onChange={(e) => {
                      handleColorChange(index, e.target.value);

                      setChosenColorIndex(index);
                    }}
                  />
                ))}
              </div>
              <p className="descText"> Quantity Available: </p>
              <input
                type="number"
                className="productInputsToSell"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="productCategoryToSell">
              <p className="descText"> Price: </p>
              <input
                type="number"
                className="productInputsToSell"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <p className="descText"> Discount Price: </p>
              <input
                type="number"
                className="productInputsToSell"
                placeholder="Only set a discount price when it is available"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
            <div className="productCategoryToSell">
              <p className="descText"> Upload Image: </p>
              <input
                type="file"
                accept="image/*"
                className="product-input"
                onChange={handleImageUpload}
              />
              <div className="sellItemImage">
                {image.map((c, index) => (
                  <img
                    key={index}
                    src={getImageSrc(c)}
                    className="imagePreview"
                    alt="Preview"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="viewCart">
            <button className="proceedBtn" onClick={handlePostItem}>
              Save Change, indes
            </button>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {successModal && (
        <Modal
          modalText={successText}
          buttonText="View Product"
          closeModal={handleProceed}
        />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal
          modalText={errorText}
          buttonText="Try Again"
          closeModal={closeModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default VendorEditProduct;
