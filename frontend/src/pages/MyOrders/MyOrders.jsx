// File Location: frontend/src/pages/MyOrders/MyOrders.jsx

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

    // 📦 Fetch Orders
    const fetchOrders =
        async () => {

        try {

            setLoading(true);

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

                // ✅ Latest Orders First
                setOrders(
                    response.data.data.reverse()
                );
            }

        } catch (error) {

            console.error(
                "❌ Error fetching user order state:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    // 🚀 Auto Fetch + Live Polling
    useEffect(() => {

        if (token) {

            // Initial Fetch
            fetchOrders();

            // 🔄 Auto Refresh Every 5 Seconds
            const liveTrackingInterval =
                setInterval(() => {

                fetchOrders();

            }, 5000);

            // 🧹 Cleanup
            return () =>
                clearInterval(
                    liveTrackingInterval
                );
        }

    }, [token]);

    // ⏳ Loading UI
    if (loading) {

        return (

            <div
                className="
                    min-h-[50vh]
                    flex
                    justify-center
                    items-center
                "
            >

                <span
                    className="
                        loading
                        loading-spinner
                        loading-lg
                        text-orange-500
                    "
                ></span>

            </div>
        );
    }

    return (

        <div
            className="
                my-orders
                max-w-5xl
                mx-auto
                my-12
                p-4
            "
        >

            {/* Heading */}
            <h2
                className="
                    text-2xl
                    font-bold
                    text-gray-800
                    mb-6
                "
            >
                Track My Orders
            </h2>

            {orders.length === 0 ? (

                <div
                    className="
                        text-center
                        py-12
                        text-gray-500
                        bg-gray-50
                        rounded-2xl
                        border
                        border-dashed
                    "
                >

                    <p
                        className="
                            text-lg
                            font-medium
                        "
                    >
                        You haven't placed
                        any orders yet!
                    </p>

                </div>

            ) : (

                <div
                    className="
                        container
                        flex
                        flex-col
                        gap-5
                    "
                >

                    {orders.map(
                        (
                            order,
                            index
                        ) => (

                            <div
                                key={index}

                                className="
                                    order-card
                                    grid
                                    grid-cols-1
                                    md:grid-cols-6
                                    items-center
                                    gap-4
                                    bg-white
                                    p-5
                                    rounded-2xl
                                    border
                                    border-gray-100
                                    shadow-sm
                                    text-sm
                                    text-gray-600
                                    hover:shadow-md
                                    transition-all
                                "
                            >

                                {/* 📦 Parcel Icon */}
                                <div
                                    className="
                                        flex
                                        justify-center
                                        md:justify-start
                                        col-span-1
                                    "
                                >

                                    <img
                                        src={
                                            assets.parcel_icon
                                        }

                                        alt="Parcel"

                                        className="
                                            w-12
                                            h-12
                                            object-contain
                                        "
                                    />

                                </div>

                                {/* 🍔 Ordered Food Items */}
                                <div
                                    className="
                                        col-span-2
                                    "
                                >

                                    <p
                                        className="
                                            font-semibold
                                            text-gray-800
                                        "
                                    >

                                        {order.items.map(
                                            (
                                                item,
                                                idx
                                            ) => {

                                                if (
                                                    idx ===
                                                    order.items.length - 1
                                                ) {

                                                    return (
                                                        item.name +
                                                        " x " +
                                                        item.quantity
                                                    );
                                                }

                                                return (
                                                    item.name +
                                                    " x " +
                                                    item.quantity +
                                                    ", "
                                                );
                                            }
                                        )}

                                    </p>

                                </div>

                                {/* 💰 Total Price */}
                                <div
                                    className="
                                        col-span-1
                                        text-center
                                        md:text-left
                                        font-bold
                                        text-gray-800
                                        text-base
                                    "
                                >

                                    ₹{order.amount}.00

                                </div>

                                {/* 🧮 Total Items */}
                                <div
                                    className="
                                        col-span-1
                                        text-center
                                        md:text-left
                                        text-gray-500
                                    "
                                >

                                    Items:
                                    {" "}
                                    {
                                        order.items.length
                                    }

                                </div>

                                {/* 🚚 Delivery Status */}
                                <div
                                    className="
                                        col-span-1
                                        flex
                                        items-center
                                        justify-center
                                        md:justify-start
                                        gap-2
                                    "
                                >

                                    <span
                                        className={`
                                            w-2
                                            h-2
                                            rounded-full
                                            ${
                                                order.status ===
                                                "Food Processing"

                                                    ? "bg-amber-500 animate-pulse"

                                                    : order.status ===
                                                      "Out for Delivery"

                                                    ? "bg-blue-500 animate-pulse"

                                                    : "bg-green-500"
                                            }
                                        `}
                                    ></span>

                                    <b
                                        className="
                                            text-gray-700
                                            font-medium
                                        "
                                    >

                                        {order.status}

                                    </b>

                                </div>

                                {/* 🔄 Manual Refresh Button */}
                                <div
                                    className="
                                        md:col-span-6
                                        flex
                                        justify-end
                                    "
                                >

                                    <button
                                        onClick={
                                            fetchOrders
                                        }

                                        className="
                                            px-4
                                            py-2
                                            rounded-xl
                                            bg-orange-500
                                            hover:bg-orange-600
                                            text-white
                                            text-sm
                                            font-medium
                                            transition-all
                                        "
                                    >

                                        Track Order

                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>
            )}

        </div>
    );
};

export default MyOrders;