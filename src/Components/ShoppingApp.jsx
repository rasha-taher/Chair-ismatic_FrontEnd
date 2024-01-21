// ShoppingApp.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import ViewCart from "./ViewCart";

const ShoppingApp = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/product/:id"
          render={(props) => (
            <ProductDescription {...props} addToCart={addToCart} />
          )}
        />
        <Route path="/viewCart" render={() => <ViewCart cart={cart} />} />
      </Switch>
    </Router>
  );
};

export default ShoppingApp;
