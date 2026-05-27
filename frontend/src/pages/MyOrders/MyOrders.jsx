
import React from "react";

const {
    useContext,
    useEffect,
    useState
} = React;

import "./MyOrders.css";

import axios from "axios";

import {
    StoreContext
} from "../../context/StoreContext";

import {
    assets
} from "../../assets/assets.js";

const MyOrders = () => {

    const {
        url,
        token
    } = useContext(
        StoreContext
    );

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // Fetch Orders
    const fetchOrders =
        async () => {

        try {

            const response =
                await axios.post(
                    `${url}/api/order/userorders`,
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            token
                        }
                    }
                );

            if (
                response.data.success
            ) {

                setOrders(
                    response.data.data.reverse()
                );
            }

        } catch (error) {

            console.error(
                "❌ Error fetching orders:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    // Auto Fetch + Live Polling
    useEffect(() => {

        if (token) {

            // Initial Fetch
            fetchOrders();

            // Poll Every 5 Seconds
            const liveTrackingInterval =
                setInterval(() => {

                fetchOrders();

            }, 5000);

            // Cleanup
            return () =>
                clearInterval(
                    liveTrackingInterval
                );
        }

    }, [token]);

    // Loading State
    if (loading) {

        return (

            <div
                className="my-orders-loading"
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection:
                        "column",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    gap: "20px"
                }}
            >

                <div
                    className="payment-spinner"
                    style={{
                        width: "60px",
                        height: "60px",
                        border:
                            "5px solid #ddd",
                        borderTopColor:
                            "#ff5722",
                        borderRadius:
                            "50%",
                        animation:
                            "rotate 1s linear infinite"
                    }}
                ></div>

                <p>
                    Syncing active order
                    paths...
                </p>

                <style>
                    {`
                        @keyframes rotate {
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                </style>

            </div>
        );
    }

    return (

        <div className="my-orders">

            <h2>
                My Orders
            </h2>

            <div className="container">

                {orders.length === 0 ? (

                    <p className="no-orders-msg">
                        You haven't placed
                        any orders yet!
                    </p>

                ) : (

                    orders.map(
                        (
                            order,
                            index
                        ) => {

                        return (

                            <div
                                key={index}
                                className="my-orders-order"
                            >

                                <img
                                    src={
                                        assets.parcel_icon
                                    }
                                    alt="Parcel"
                                />

                                <p>

                                    {order.items.map(
                                        (
                                            item,
                                            idx
                                        ) => {

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

                                <p className="order-price-bold">
                                    ₹{order.amount}.00
                                </p>

                                <p>
                                    Items:{" "}
                                    {
                                        order.items.length
                                    }
                                </p>

                                <p>

                                    <span
                                        className={`status-dot ${order.status
                                            .replace(/\s+/g, "-")
                                            .toLowerCase()}`}
                                    >
                                        &#x25cf;
                                    </span>{" "}

                                    <b>
                                        {order.status}
                                    </b>

                                </p>

                                <button
                                    className="track-order-btn"
                                    onClick={
                                        fetchOrders
                                    }
                                >
                                    Track Order
                                </button>

                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
};

export default MyOrders;