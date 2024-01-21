import React from 'react';
import '../Style/ProductComponent.css';

const ProductComponent = ({ image, productName, price, discount, showDiscount, soldOut }) => {
  return (
    <div className='productComponent'>
      {soldOut && <div className='soldOverlay'>Sold Out</div>}
      <img src={image} className='productComponentImage' alt={productName} />
      <p className='productComponentName'>{productName}</p>
      <div className='productPriceDiv'>
        {showDiscount ? (
          <>
            {discount && <p className='productComponentDiscount'>{price}$</p>}
            <p className='productComponentPrice'>{discount}$</p>
          </>
        ) : (
          <p className='productComponentPrice'>{price}$</p>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
