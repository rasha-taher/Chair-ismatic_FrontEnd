import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import axios from "axios";
import Modal from "./Modal";
import ProductComponent from "./ProductComponent";
import "../Style/ProductsPage.css";
import { Link } from "react-router-dom";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const wurl = "http://localhost:8080";
  const email = localStorage.getItem("loggedInUserEmail");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [succesText, setSuccesText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${wurl}/product/getPoductByVendorEmail/${email}`;
        const response = await axios.get(url);
        console.log(response.data); // Log the response data
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const getImageSrc = (imageData) => {
    if (Array.isArray(imageData) && imageData.length > 0) {
      // Return the base64 string of the first image
      const firstImage = imageData[0].substring(5, imageData[0].indexOf(";"));
      return `data:${firstImage};base64,${imageData[0]}`;
    }
  
    return null; // Handle the case when imageData is not an array or is empty
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        wurl + `/product/deleteProductById/${id}`
      );

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((products) => products._id !== id)
        );
      } else {
        setErrorText(
          "An error occurred while  deleting your product. Please try again."
        );
        setErrorModal(true);
        console.error("Error deleting product:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleProceed = () => {
    window.location.href = "/yourproduct";
  };
  const closeModal = () => {
    setSuccessModal(false);
    setErrorModal(false);
  };
  return (
    <div>
      <MenuBar />
      <div className="productsPageContainer">
        <p className="productsPageTitle"> Your Products </p>
        <div className="productCategoriesList">
          <div className="innerProductCategoriesList">
          {products.length === 0 ? (
  <div className="noProductYet">You haven't added any product yet.</div>
) : (
  products.map((product) => (
    <div key={product._id} className="productWrapper">
      <Link to={`/productDetails/${product._id}`}>
        <ProductComponent
          image={getImageSrc(product.image)}
          productName={product.name}
          price={product.price}
          discount={product.discountPrice}
          showDiscount={product.showDiscount}
          soldOut={product.soldOut}
        />
      </Link>
      <div className="productBtn">
        <Link to={`/editProduct/${product._id}`}>
          <button className="editProductBtn">Edit Product</button>
        </Link>
        <button
          className="editProductBtn deleteBtn"
          onClick={() => deleteProduct(product._id)}
        >
          Delete Product
        </button>
      </div>
    </div>
  ))
)}
          </div>
        </div>
      </div>
      <Footer />
      {/* Success Modal */}
      {successModal && (
        <Modal
          modalText={succesText}
          buttonText="OK"
          closeModal={handleProceed}
        />
      )}

      {/* Error Modal */}
      {errorModal && (
        <Modal modalText={errorText} buttonText="Ok" closeModal={closeModal} />
      )}
    </div>
  );
};

export default VendorProducts;
