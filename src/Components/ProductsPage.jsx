import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import axios from "axios";
import ProductComponent from "./ProductComponent";
import "../Style/ProductsPage.css";
import { Link } from "react-router-dom";
const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const wurl = "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (selectedCategory) {
          url = `${wurl}/product/getProductByCategory/${selectedCategory}`;
        } else {
          url = `${wurl}/product/getAllProduct`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

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

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleResetClick = () => {
    setSelectedCategory(null);
  };
 
  const getImageSrc = (imageData) => {
    const imageType = imageData.substring(5, imageData.indexOf(";"));
    return `data:${imageType};base64,${imageData}`;
  };

  return (
    <div>
      <MenuBar />
      <div className="productsPageContainer">
        <p className="productsPageTitle"> Our Products List</p>
        <p className="underText">
          We specialize in both buying and selling high-quality, marketable
          furniture, showcasing our unique aesthetic in every piece.
        </p>
        <div className="categoriesListDiv">
          {categories.map((category) => (
            <div
              key={category._id}
              className="singleCategories"
              onClick={() => handleCategoryClick(category.category)} 
              style={{
                backgroundColor:
                  selectedCategory === category.category ? "#863230" : "",
                color: selectedCategory === category.category ? "#fff" : "",
              }}
            >
              {category.category}
            </div>
          ))}
          <div
            className="continueShopping"
            onClick={handleResetClick}
            style={{
              backgroundColor: selectedCategory === null ? "#863230" : "",
              color: selectedCategory === null ? "#fff" : "",
            }}
          >
            Reset
          </div>
        </div>
        <div className="productCategoriesList">
          <div className="innerProductCategoriesList">
            {products.map((product) => (
              <div key={product._id} className="productWrapper">
               
                <Link to={`/productDetails/${product._id}`}>
                  <ProductComponent
                    image={getImageSrc(product.image[0])}
                    productName={product.name}
                    price={product.price}
                    discount={product.discountPrice}
                    showDiscount={product.showDiscount}
                    soldOut={product.soldOut}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
