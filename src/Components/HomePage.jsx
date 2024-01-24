import "../Style/HomePage.css";
import axios from "axios";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import HomeCategories from "./HomeCategories";
import HomeHeroSection from "./HomeHeroSection";
import React, { useState, useEffect } from "react";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const wurl = "https://chair-ismatic-backend.onrender.com";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${wurl}/product/getAllProduct`;
        console.log("Fetching data from URL:", url);
        const response = await axios.get(url);
        console.log("Response data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getImageSrc = (imageData) => {
    const imageType = imageData.substring(5, imageData.indexOf(";"));
    return `data:${imageType};base64,${imageData}`;
  };
  return (
    <div>
      <HomeHeroSection />
      <HomeCategories />
      <div className="featuresSection">
        <p className="featureTitle">Feature</p>
        <p className="featureQuestion"> What do we give you?</p>
        <div className="numbersSection colDisplay">
          <div className="numberDiv">
            <p className="featureSubTitle"> - Free Shipping</p>
            <p className="featureDesc">
              {" "}
              We really understand our customers, so we will ship you your items
              quickly and safely
            </p>
          </div>

          <div className="numberDiv">
            <p className="featureSubTitle"> - Best Prices</p>
            <p className="featureDesc">
              {" "}
              We take pride in offering you the best prices, surpassing others
              while still ensuring the same high-quality standards.
            </p>
          </div>
          <div className="numberDiv">
            <p className="featureSubTitle">- 5 years warranty</p>
            <p className="featureDesc">
              {" "}
              We have utmost confidence in our products, which is why we offer a
              generous 5-year guarantee.
            </p>
          </div>
        </div>
      </div>
      <div className="latestItems">
        <div className="latestItemRow">
          <p className="featureQuestion">Our Latest Products </p>
          <Link to="/products">See More</Link>
        </div>
        <div className="latetProductContainer">
          {products.slice(startIndex, startIndex + 5).map((product) => (
            <Link to={`/productDetails/${product._id}`}>
              <div className="lastestProductProduct">
                <img
                  src={getImageSrc(product.image[0])}
                  className="lastestProductImage"
                />
                <p className="latestProductName"> {product.name}</p>
                <p className="latestProductPrice"> {product.price}$</p>
              </div>
            </Link>
          ))}
          <div className="btn-div"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
