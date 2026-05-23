import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {

  const {
    cartItems,
    addToCart,
    removeFromCart,
    url
  } = useContext(StoreContext);

  return (

    <div className='food-item'>

      <div className="food-item-img-container">

        <img
          className='food-item-image'
          src={url + "/images/" + image}
          alt={name}
        />

        {!cartItems[id] ? (

          <button
            className='add-btn'
            onClick={() => addToCart(id)}
          >
            +
          </button>

        ) : (

          <div className='food-item-counter'>

            <button
              className='counter-minus'
              onClick={() => removeFromCart(id)}
            >
              -
            </button>

            <span>{cartItems[id]}</span>

            <button
              className='counter-plus'
              onClick={() => addToCart(id)}
            >
              +
            </button>

          </div>

        )}

      </div>

      <div className="food-item-info">

        <div className="food-item-name-rating">

          <p>{name}</p>

          <span className="stars">
            ⭐⭐⭐⭐⭐
          </span>

        </div>

        <p className="food-item-desc">
          {description}
        </p>

        <p className="food-item-price">
          ${price}
        </p>

      </div>

    </div>
  );
};

export default FoodItem;