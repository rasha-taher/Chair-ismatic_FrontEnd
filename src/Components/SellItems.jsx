import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import axios from "axios";
import "../Style/SellItem.css";
import Modal from "./Modal";

const SellItems = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]); // Change from '' to []
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [succesText, setSuccesText] = useState("");
  const wurl = "http://localhost:8080";
  const email = localStorage.getItem("loggedInUserEmail");

  const handleProceed = () => {
    window.location.href = "/yourproduct";
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [...images];
  
    for (let i = 0; i < Math.min(files.length, 3 - images.length); i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result;
        newImages.push(base64String);
        if (i === Math.min(files.length, 3 - images.length) - 1) {
          setImages(newImages);
          setImagePreview(newImages[0]); 
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleFormSubmit = async () => {
      const imageBase64Array = images.map((image) => image.split(",")[1]);
      console.log('Image Base64 Array:', imageBase64Array);
    try {
      const response = await axios.post(`${wurl}/product/addProduct`, {
        name: productName,
        image: imageBase64Array,
        colors,
        description,
        price,
        discountPrice,
        quantity,
        category: selectedCategory,
        user_email: email,
      });
      setSuccessModal(true);
      setSuccesText(`Item Added Successfully !`);
    } catch (error) {
      setErrorText("Error adding product. Please try again.");
      setErrorModal(true);
      console.error("Error adding product:", error);
    }
  };
  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${wurl}/category/getAllCategories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleColorChange = (event) => {
    const newColors = [...colors];
    if (newColors.length < 3) {
      newColors.push(event.target.value);
      setColors(newColors);
    }
  };
  const handleAddColor = () => {
    if (colors.length < 3) {
      setColors([...colors, ""]);
    }
  };
  const handleAddImage = () => {
    if (images.length < 3) {
      document.getElementById("fileInput").click();
    }
  };
  const handleRemoveColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div>
      <MenuBar />
      <div className="sellItemContainer">
        <div className="insideSellItemContainer">
          <p className="sellItemTitle"> Post Your Product</p>

          <div className="sellItemDetails">
            <div className="productCategoryToSell">
              <p className="descText">Choose A Category: </p> &nbsp;
              <select
                className="selectCategory"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option> Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.category}>
                    {" "}
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="productCategoryToSell">
              <p className="descText"> Name Your Product: </p>
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

              <p className="descText addrow"> Choose Colors: 
                {colors.length < 3 && (
                <button className="plusButton" onClick={handleAddColor}>
                  +
                </button>
                
              )}</p>
              {colors.map((color, index) => (
                <>
                <input
                  key={index}
                  type="color"
                  className="colorPicker "
                  value={color}
                  onChange={(e) => {
                    const newColors = [...colors];
                    newColors[index] = e.target.value;
                    setColors(newColors);
                  }}
                />
                <button className="plusButton" onClick={() => handleRemoveColor(index)}>
                Remove
              </button>
              </>
              ))}
            

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
              <p className="descText addrow"> Upload Images: {images.length < 3 && (
                  <button className="plusButton" onClick={handleAddImage}>
                    +
                  </button>
                )}</p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="product-input"
                multiple // Allow multiple file selection
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div className="sellItemImage">
                {images.map((image, index) => (
                  <>
                  <img
                    key={index}
                    src={image}
                    className="imagePreview"
                    alt={`Preview ${index}`}
                  />
                  <button
               className="plusButton"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
              </>
                ))}
              </div>
            </div>
          </div>
          <div className="viewCart">
            <button className="proceedBtn" onClick={handleFormSubmit}>
              Post Item
            </button>
          </div>
        </div>
      </div>
      {successModal && (
        <Modal
          modalText={succesText}
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

export default SellItems;
