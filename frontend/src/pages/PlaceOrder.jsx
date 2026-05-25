import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipCode: "", country: "", phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrderSubmit = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        alert("Order Placed Successfully via Cash/Stripe Demo Mode! Backend synchronized.");
        window.location.replace("/"); // Home par safe redirect
      } else {
        alert("Order placing failed. Token status invalid!");
      }
    } catch (error) {
      alert("Error processing order. Please sign in first!");
    }
  };

  return (
    <form onSubmit={placeOrderSubmit} style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '50px', marginTop: '50px', padding: '0 4%', fontFamily: 'sans-serif', flexWrap: 'wrap' }}>
      
      {/* Left side address fields */}
      <div style={{ width: '100%', maxWidth: 'max(30vw, 400px)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p style={{ fontSize: '30px', fontWeight: '600', marginBottom: '30px', color: '#262626' }}>Delivery Information</p>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
        </div>
        
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' style={{ width: '100%', padding: '10px', border: '1px solid #c9c9c9', borderRadius: '4px', outline: 'none' }} />
      </div>

      {/* Right side cart calculation */}
      <div style={{ width: '100%', maxWidth: 'max(40vw, 500px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#262626' }}>Cart Totals</h2>
        <div style={{ width: '100%' }}>
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
        <button type='submit' style={{ border: 'none', color: 'white', backgroundColor: '#ff4321', width: 'max(15vw, 250px)', padding: '12px 0', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', marginTop: '20px' }}>
          PROCEED TO PAYMENT
        </button>
      </div>

    </form>
  );
};

export default PlaceOrder;