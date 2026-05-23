import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  // Navigate Hook
  const navigate = useNavigate();

  // Total Amount Calculation
  const getTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {

          totalAmount +=
            itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  return (

    <div className='cart'>

      {/* Cart Items */}
      <div className="cart-items">

        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item, index) => {

          if (cartItems[item._id] > 0) {

            return (

              <div key={index}>

                <div className='cart-items-title cart-items-item'>

                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "50px",
                      borderRadius: "4px"
                    }}
                  />

                  <p>{item.name}</p>

                  <p>${item.price}</p>

                  <p>{cartItems[item._id]}</p>

                  <p>
                    ${item.price * cartItems[item._id]}
                  </p>

                  <p
                    onClick={() => removeFromCart(item._id)}
                    className='cross'
                  >
                    x
                  </p>

                </div>

                <hr />

              </div>
            );
          }

          return null;
        })}

      </div>

      {/* Cart Bottom */}
      <div
        className="cart-bottom"
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "space-between",
          gap: "max(12vw, 20px)"
        }}
      >

        {/* Cart Totals */}
        <div
          className="cart-total"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >

          <h2>Cart Totals</h2>

          <div>

            <div
              className="cart-total-details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#555"
              }}
            >
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr style={{ margin: "10px 0px" }} />

            <div
              className="cart-total-details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#555"
              }}
            >
              <p>Delivery Fee</p>

              <p>
                ${getTotalCartAmount() === 0 ? 0 : 2}
              </p>
            </div>

            <hr style={{ margin: "10px 0px" }} />

            <div
              className="cart-total-details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "600",
                color: "#000"
              }}
            >
              <b>Total</b>

              <b>
                ${
                  getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 2
                }
              </b>

            </div>

          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate('/order')}
            style={{
              border: "none",
              color: "white",
              backgroundColor: "#ff4c24",
              width: "max(15vw, 200px)",
              padding: "12px 0px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            PROCEED TO CHECKOUT
          </button>

        </div>

        {/* Promo Code */}
        <div
          className="cart-promocode"
          style={{ flex: 1 }}
        >

          <p style={{ color: "#555" }}>
            If you have a promo code, Enter it here
          </p>

          <div
            className="cart-promocode-input"
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#eaeaea",
              borderRadius: "4px"
            }}
          >

            <input
              type="text"
              placeholder='promo code'
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                paddingLeft: "10px",
                height: "50px"
              }}
            />

            <button
              style={{
                width: "max(10vw, 150px)",
                padding: "12px 5px",
                backgroundColor: "black",
                border: "none",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
                height: "50px"
              }}
            >
              Submit
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;