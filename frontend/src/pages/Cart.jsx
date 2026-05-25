import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext'; // Path properly updated
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: '50px', padding: '0 4%', fontFamily: 'sans-serif', color: '#555' }}>
      
      {/* Cart Items List Table */}
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', color: 'grey', fontSize: 'max(1vw, 12px)', borderBottom: '1px solid #e2e2e2', paddingBottom: '10px' }}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', fontSize: 'max(1vw, 14px)', margin: '10px 0', color: 'black' }}>
                  <img src={url + "/images/" + item.image} alt="" style={{ width: '50px', borderRadius: '4px' }} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} style={{ cursor: 'pointer', color: '#ff4321', fontWeight: 'bold' }}>x</p>
                </div>
                <hr style={{ height: '1px', backgroundColor: '#e2e2e2', border: 'none' }} />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Bottom Summary Details Section */}
      <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', gap: 'max(12vw, 20px)', flexWrap: 'wrap-reverse' }}>
        
        {/* Total Calculations */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#262626' }}>Cart Totals</h2>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', padding: '10px 0' }}>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#e2e2e2' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', padding: '10px 0' }}>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#e2e2e2' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#333', padding: '10px 0', fontWeight: 'bold' }}>
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')} style={{ border: 'none', color: 'white', backgroundColor: '#ff4321', width: 'max(15vw, 200px)', padding: '12px 0', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code area */}
        <div style={{ flex: 1 }}>
          <p style={{ color: '#555' }}>If you have a promo code, Enter it here</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eaeaea', borderRadius: '4px' }}>
            <input type="text" placeholder='promo code' style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', paddingLeft: '10px', width: '100%' }} />
            <button style={{ width: 'max(10vw, 150px)', padding: '12px 5px', backgroundColor: 'black', border: 'none', color: 'white', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', cursor: 'pointer' }}>Submit</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;