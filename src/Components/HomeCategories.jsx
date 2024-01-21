import "../Style/HomeCategories.css";
import React, { useState } from "react";
const HomeCategories = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleClick = (index) => {
    setSelectedItem(index === selectedItem ? null : index);
  };

  const categories = [
    {
      title: "Desktops",
      desc: "Having a nice and comfy desktop is everyone’s dream, so we ensured to provide you with the best one",
    },
    {
      title: "Sofas",
      desc: "Having a nice and comfy sofa is everyone’s dream, so we ensured to provide you with the best one",
    },
    {
      title: "Tables",
      desc: "Having a nice and comfy table is everyone’s dream, so we ensured to provide you with the best one",
    },
    {
      title: "Lamps",
      desc: "Having a nice and comfy lamp is everyone’s dream, so we ensured to provide you with the best one",
    },
    {
      title: "Beds",
      desc: "Having a nice and comfy bed is everyone’s dream, so we ensured to provide you with the best one",
    },
  ];
  return (
    <div className="categorieSection">
      <div className="wrapper">
        <div className="container">
          <input type="radio" className="inputSlide" name="slide" id="c1" defaultChecked />
          <label htmlFor="c1" className="card"></label>
          <input type="radio"  className="inputSlide" name="slide" id="c2" />
          <label htmlFor="c2" className="card"></label>
          <input type="radio"  className="inputSlide" name="slide" id="c3" />
          <label htmlFor="c3" className="card"></label>
          <input type="radio"  className="inputSlide" name="slide" id="c4" />
          <label htmlFor="c4" className="card"></label>
        </div>
      </div>
      <div className="featureLeftDiv">
        <p className="featureTitle">Categories</p>
        <p className="featureQuestion">Our best recommendation</p>
        <ul className="category-ul">
          {categories.map((category, index) => (
            <li className="category-li" key={index}>
              <div
                className={`category-li-div `}
                onClick={() => handleClick(index)}
                style={{
                  
                  backgroundColor:
                    index === selectedItem ? "#863230" : "transparent",
              
                }}
              >
                <p className="category-li-title">{category.title}</p>
                {index === selectedItem && (
                  <p className="category-li-desc">{category.desc}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeCategories;
