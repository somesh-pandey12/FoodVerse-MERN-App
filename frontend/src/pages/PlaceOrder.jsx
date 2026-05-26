
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
    const { token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "", lastName: "", email: "",
        street: "", city: "", state: "",
        zipcode: "", country: "", phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
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

        // Calculate delivery fee and total calculations
        let subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let orderData = {
            address: data,
            items: orderItems,
            amount: subtotal + 40,
        };

        try {
            const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                alert("Order Placed Successfully via Cash on Delivery (COD)!");
                navigate('/myorders'); 
            } else {
                alert("Error placing order.");
            }
        } catch (error) {
            console.error(error);
            alert("Please make sure you are logged in.");
        }
    };

    return (
        <form onSubmit={placeOrderHandler} className='place-order flex items-start justify-between gap-12 mt-24 max-w-5xl mx-auto'>
            <div className="place-order-left w-full max-w-lg">
                <p className='title text-2xl font-bold mb-8'>Delivery Information</p>
                <div className="multi-fields flex gap-2 mb-4">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' className='w-full border p-2 rounded' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' className='w-full border p-2 rounded' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' className='w-full border p-2 rounded mb-4' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' className='w-full border p-2 rounded mb-4' />
                <div className="multi-fields flex gap-2 mb-4">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className='w-full border p-2 rounded' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className='w-full border p-2 rounded' />
                </div>
                <div className="multi-fields flex gap-2 mb-4">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' className='w-full border p-2 rounded' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='w-full border p-2 rounded' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' className='w-full border p-2 rounded' />
            </div>
            
            <div className="place-order-right w-full max-w-sm border p-6 rounded flex flex-col gap-4 bg-gray-50">
                <h2 className="text-xl font-bold">Cart Totals</h2>
                <button type='submit' className='bg-tomato text-white py-2 px-4 rounded font-semibold mt-4 hover:bg-orange-600 transition-all'>PROCEED TO PAYMENT</button>
            </div>
        </form>
    );
};

export default PlaceOrder;