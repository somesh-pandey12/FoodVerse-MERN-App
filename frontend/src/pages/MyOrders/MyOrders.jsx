import React from "react";

const { useContext, useEffect, useState } = React;
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        if (response.data.success) {
            setOrders(response.data.data.reverse()); // Latest orders top par dikhane ke liye reverse kiya
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {orders.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            {/* Ek box ya parcel icon handle karne ke liye text ya emoji */}
                            <span className="order-icon">📦</span>
                            <p>
                                {order.items.map((item, idx) => {
                                    if (idx === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p>₹{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span>&#x25cf;</span> <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;