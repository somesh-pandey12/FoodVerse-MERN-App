// File Location: frontend/src/pages/PlaceOrder.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
    const { token, food_list, cartItems, url, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    // 💳 Naya state select karne ke liye: 'cod' ya 'stripe'
    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const [data, setData] = useState({
        firstName: "", lastName: "", email: "",
        street: "", city: "", state: "",
        zipCode: "", country: "", phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrderHandler = async (event) => {
        event.preventDefault();
        
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        if (orderItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 40,
        };

        try {
            // 🚀 METHOD CHECK: Agar user ne Stripe select kiya hai
            if (paymentMethod === "stripe") {
                const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
                if (response.data.success) {
                    const { session_url } = response.data;
                    window.location.replace(session_url); 
                } else {
                    alert("Stripe session initialization failed.");
                }
            } 
            // 💵 METHOD CHECK: Agar user ne COD select kiya hai
            else {
                // Backend me COD ke liye route (hum next step me add kar sakte hain, ya same route par backend handle karega)
                // Abhi ke liye normal logic verification stream
                const response = await axios.post(`${url}/api/order/place`, { ...orderData, paymentType: "COD" }, { headers: { token } });
                if (response.data.success) {
                    alert("Order Placed Successfully via Cash on Delivery!");
                    navigate('/myorders');
                } else {
                    alert("Error placing COD order.");
                }
            }
        } catch (error) {
            console.error("Payment integration error: ", error);
            alert("Something went wrong during checkout.");
        }
    };

    useEffect(() => {
        if (!token || getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrderHandler} className='place-order flex flex-col md:flex-row items-start justify-between gap-12 mt-24 max-w-5xl mx-auto p-4'>
            
            {/* Left Panel: Delivery Form */}
            <div className="place-order-left w-full max-w-xl">
                <p className='title text-2xl font-bold mb-8 text-gray-800'>Delivery Information</p>
                
                <div className="multi-fields flex gap-4 mb-4">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
                </div>
                
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500 mb-4' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500 mb-4' />
                
                <div className="multi-fields flex gap-4 mb-4">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
                </div>
                
                <div className="multi-fields flex gap-4 mb-4">
                    <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
                </div>
                
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Mobile Number' className='input input-bordered w-full rounded-xl p-3 border focus:outline-orange-500' />
            </div>
            
            {/* Right Panel: Summary & Payment Selectors */}
            <div className="place-order-right w-full max-w-md flex flex-col gap-6">
                
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Cart Totals</h2>
                    <div className="flex flex-col gap-3 text-sm text-gray-600">
                        <div className="flex justify-between pb-2 border-b">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-800">₹{getTotalCartAmount()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Delivery Fee</span>
                            <span className="font-semibold text-gray-800">₹{getTotalCartAmount() === 0 ? 0 : 40}</span>
                        </div>
                        <div className="flex justify-between pt-1 text-base font-bold text-gray-900">
                            <span>Total Bill</span>
                            <span className="text-orange-500">₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</span>
                        </div>
                    </div>
                </div>

                {/* 💳 NEW: Payment Method Selection Box */}
                <div className="payment-method bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-lg font-bold text-gray-800 mb-4">Select Payment Method</p>
                    
                    <div className="flex flex-col gap-3">
                        {/* Stripe Option */}
                        <label onClick={() => setPaymentMethod("stripe")} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === "stripe" ? "border-orange-500 bg-orange-50/50 text-orange-600 font-semibold" : "border-gray-200 text-gray-600"}`}>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">💳</span>
                                <span>Online Payment (Stripe / Cards)</span>
                            </div>
                            <input type="radio" name="payment" checked={paymentMethod === "stripe"} readOnly className="radio radio-orange" />
                        </label>

                        {/* COD Option */}
                        <label onClick={() => setPaymentMethod("cod")} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === "cod" ? "border-orange-500 bg-orange-50/50 text-orange-600 font-semibold" : "border-gray-200 text-gray-600"}`}>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">💵</span>
                                <span>Cash on Delivery (COD)</span>
                            </div>
                            <input type="radio" name="payment" checked={paymentMethod === "cod"} readOnly className="radio radio-orange" />
                        </label>
                    </div>

                    <button type='submit' className='w-full py-3 bg-orange-500 text-white rounded-xl font-bold tracking-wide mt-6 hover:bg-orange-600 active:scale-[0.99] transition-all shadow-lg shadow-orange-100'>
                        {paymentMethod === "stripe" ? "PROCEED TO ONLINE PAYMENT" : "PLACE COD ORDER"}
                    </button>
                </div>

            </div>
        </form>
    );
};

export default PlaceOrder;