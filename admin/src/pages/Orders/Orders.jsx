
import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // Backend URL
    const url = "http://localhost:8000";

    // Fetch All Orders
    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(
                url + "/api/order/list"
            );

            if (response.data.success) {
                setOrders(
                    response.data.data.reverse()
                );
            }
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    };
    // Update Order Status
    const statusHandler = async (
        event,
        orderId
    ) => {
        try {
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
        } catch (error) {
            console.log("Error updating status:", error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="order-page p-6 w-full">

            <h2 className="text-2xl font-bold mb-2">
                Orders Management
            </h2>

            <p className="text-gray-600 mb-6">
                Yahan saare restaurant orders real-time display honge.
            </p>

            <div className="order-list flex flex-col gap-4">

                {orders.map((order, index) => (

                    <div
                        key={index}
                        className="order-item grid grid-cols-1 md:grid-cols-4 gap-4 items-center border p-4 rounded bg-gray-50 shadow-sm text-sm"
                    >

                        {/* Order Items */}
                        <div>
                            <p className="font-bold mb-1">
                                Items:
                            </p>

                            {order.items.map((item, idx) => (
                                <p key={idx}>
                                    {item.name} x {item.quantity}
                                </p>
                            ))}
                        </div>

                        {/* Customer Address */}
                        <div>
                            <p className="font-bold mb-1">
                                Delivery Address:
                            </p>

                            <p>
                                {order.address.firstName}{" "}
                                {order.address.lastName}
                            </p>

                            <p>
                                {order.address.street},{" "}
                                {order.address.city}
                            </p>

                            <p>
                                {order.address.state},{" "}
                                {order.address.zipcode}
                            </p>

                            <p>
                                Phone: {order.address.phone}
                            </p>
                        </div>

                        {/* Amount */}
                        <div>
                            <p className="font-bold">
                                Total Items:
                            </p>

                            <p>
                                {order.items.length}
                            </p>

                            <p className="text-lg font-semibold text-green-600 mt-2">
                                ₹{order.amount}
                            </p>
                        </div>

                        {/* Order Status */}
                        <select
                            onChange={(event) =>
                                statusHandler(
                                    event,
                                    order._id
                                )
                            }
                            value={order.status}
                            className="border p-2 rounded bg-white font-medium"
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