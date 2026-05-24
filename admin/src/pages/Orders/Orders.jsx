import React from "react";

const { useState, useEffect } = React;

import axios from "axios";

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {

        const response = await axios.get(
            url + "/api/order/list"
        );

        if (response.data.success) {

            setOrders(
                response.data.data.reverse()
            );
        }
    };

    const statusHandler = async (
        event,
        orderId
    ) => {

        const response = await axios.post(
            url + "/api/order/status",
            {
                orderId,
                status: event.target.value
            }
        );

        if (response.data.success) {

            await fetchAllOrders();
        }
    };

    useEffect(() => {

        fetchAllOrders();

    }, []);

    return (

        <div className='order-management-panel'>

            <h2>Orders Management</h2>

            <p style={{ color: "#555" }}>
                Yahan saare orders real-time display honge.
            </p>

            <h3>Live Restaurant Orders Grid</h3>

            <div className="order-list">

                {orders.map((order, index) => (

                    <div
                        key={index}
                        className='order-item'
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "10px"
                        }}
                    >

                        <p className='order-item-food'>

                            {order.items.map(
                                (item, idx) => {

                                    return idx ===
                                        order.items.length - 1
                                        ? item.name +
                                        " x " +
                                        item.quantity
                                        : item.name +
                                        " x " +
                                        item.quantity +
                                        ", ";
                                }
                            )}

                        </p>

                        <p className="order-item-name">

                            {order.address.firstName +
                                " " +
                                order.address.lastName}

                        </p>

                        <div className="order-item-address">

                            <p>
                                {order.address.street + ","}
                            </p>

                            <p>
                                {order.address.city +
                                    ", " +
                                    order.address.state +
                                    ", " +
                                    order.address.zipcode}
                            </p>

                        </div>

                        <p className='order-item-phone'>
                            {order.address.phone}
                        </p>

                        <p>
                            Items: {order.items.length}
                        </p>

                        <p>
                            Total Amount: ₹{order.amount}
                        </p>

                        <select
                            onChange={(event) =>
                                statusHandler(
                                    event,
                                    order._id
                                )
                            }
                            value={order.status}
                        >

                            <option value="Food Processing">
                                Food Processing
                            </option>

                            <option value="Out for Delivery">
                                Out for Delivery
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                        </select>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Orders;