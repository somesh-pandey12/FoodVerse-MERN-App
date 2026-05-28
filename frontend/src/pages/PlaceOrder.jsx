// File Location: frontend/src/pages/PlaceOrder.jsx

import React, {
    useContext,
    useState,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import axios from "axios";

import {
    StoreContext
} from "../context/StoreContext";

const PlaceOrder = () => {

    const {
        token,
        food_list,
        cartItems,
        url,
        getTotalCartAmount
    } = useContext(
        StoreContext
    );

    const navigate =
        useNavigate();

    // 💳 Payment Method
    const [
        paymentMethod,
        setPaymentMethod
    ] = useState(
        "razorpay"
    );

    // 📦 Address State
    const [data, setData] =
        useState({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            phone: ""
        });

    // 🔄 Input Handler
    const onChangeHandler =
        (event) => {

            const {
                name,
                value
            } = event.target;

            setData(
                (prevData) => ({
                    ...prevData,
                    [name]: value
                })
            );
        };

    // 🚀 Main Place Order Handler
    const placeOrderHandler =
        async (event) => {

            event.preventDefault();

            let orderItems = [];

            // 🛒 Prepare Items
            food_list.forEach(
                (item) => {
                    if (cartItems[item._id] > 0) {
                        let itemInfo = {
                            ...item,
                            quantity: cartItems[item._id]
                        };
                        orderItems.push(itemInfo);
                    }
                }
            );

            // ❌ Empty Cart Protection
            if (orderItems.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // 📦 Final Order Data
            const orderData = {
                address: data,
                items: orderItems,
                amount: getTotalCartAmount() + 40
            };

            // 🔥 Robust Token Fallback Strategy to stop 401 errors
            const activeToken = token || localStorage.getItem("token");

            try {

                // =====================================================
                // 💳 RAZORPAY PAYMENT FLOW
                // =====================================================

                if (paymentMethod === "razorpay") {

                    // 1️⃣ Create Backend Order
                    const response = await axios.post(
                        `${url}/api/order/place`,
                        orderData,
                        {
                            headers: { token: activeToken }
                        }
                    );

                    if (!response.data.success) {
                        alert("Unable to initialize Razorpay payment.");
                        return;
                    }

                    // 2️⃣ Get Razorpay Order
                    const razorpayOrder = response.data.razorpayOrder;

                    // 3️⃣ Configure Razorpay
                    const options = {
                        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                        amount: razorpayOrder.amount,
                        currency: "INR",
                        name: "Tomato Food Delivery",
                        description: "Order Payment",
                        order_id: razorpayOrder.id,
                        handler: async function (paymentResponse) {
                            try {
                                // ✅ Verify Payment (With Active Token Backup)
                                const verifyResponse = await axios.post(
                                    `${url}/api/order/verify`,
                                    {
                                        orderId: response.data.orderId,
                                        success: true,
                                        razorpay_payment_id: paymentResponse.razorpay_payment_id
                                    },
                                    {
                                        headers: { token: activeToken }
                                    }
                                );

                                if (verifyResponse.data.success) {
                                    alert("Payment Successful!");
                                    navigate("/myorders");
                                } else {
                                    alert("Payment verification failed.");
                                }

                            } catch (error) {
                                console.error("Verification Error:", error);
                                alert("Payment verification failed.");
                            }
                        },
                        prefill: {
                            name: `${data.firstName} ${data.lastName}`,
                            email: data.email,
                            contact: data.phone
                        },
                        theme: {
                            color: "#ff4321"
                        }
                    };

                    // 4️⃣ Open Razorpay Popup
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                }

                // =====================================================
                // 💵 CASH ON DELIVERY FLOW
                // =====================================================

                else if (paymentMethod === "cod") {

                    const response = await axios.post(
                        `${url}/api/order/place`,
                        {
                            ...orderData,
                            paymentType: "COD"
                        },
                        {
                            headers: { token: activeToken }
                        }
                    );

                    if (response.data.success) {
                        alert("Order Placed Successfully!");
                        navigate("/myorders");
                    } else {
                        alert("Failed to place COD order.");
                    }
                }

            } catch (error) {
                console.error("❌ Checkout Error:", error);
                alert("Something went wrong during checkout.");
            }
        };

    // 🚫 Redirect If No Cart or Token
    useEffect(() => {
        const localToken = localStorage.getItem("token") || token;
        if (!localToken || getTotalCartAmount() === 0) {
            navigate("/cart");
        }
    }, [token, getTotalCartAmount, navigate]);

    return (
        <form
            onSubmit={placeOrderHandler}
            className="place-order flex flex-col md:flex-row items-start justify-between gap-12 mt-24 max-w-5xl mx-auto p-4"
        >
            {/* LEFT PANEL */}
            <div className="place-order-left w-full max-w-xl">
                <p className="title text-2xl font-bold mb-8 text-gray-800">
                    Delivery Information
                </p>

                <div className="multi-fields flex gap-4 mb-4">
                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full rounded-xl p-3 border"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full rounded-xl p-3 border"
                    />
                </div>

                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                    className="input input-bordered w-full rounded-xl p-3 border mb-4"
                />

                <input
                    required
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street Address"
                    className="input input-bordered w-full rounded-xl p-3 border mb-4"
                />

                <div className="multi-fields flex gap-4 mb-4">
                    <input
                        required
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                        className="input input-bordered w-full rounded-xl p-3 border"
                    />
                    <input
                        required
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                        className="input input-bordered w-full rounded-xl p-3 border"
                    />
                </div>

                <div className="multi-fields flex gap-4 mb-4">
                    <input
                        required
                        name="zipCode"
                        onChange={onChangeHandler}
                        value={data.zipCode}
                        type="text"
                        placeholder="Zip Code"
                        className="input input-bordered w-full rounded-xl p-3 border"
                    />
                    <input
                        required
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                        className="input input-bordered w-full rounded-xl p-3 border"
                    />
                </div>

                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Mobile Number"
                    className="input input-bordered w-full rounded-xl p-3 border"
                />
            </div>

            {/* RIGHT PANEL */}
            <div className="place-order-right w-full max-w-md flex flex-col gap-6">

                {/* CART TOTALS */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Cart Totals
                    </h2>

                    <div className="flex flex-col gap-3 text-sm text-gray-600">
                        <div className="flex justify-between pb-2 border-b">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-800">
                                ₹{getTotalCartAmount()}
                            </span>
                        </div>

                        <div className="flex justify-between pb-2 border-b">
                            <span>Delivery Fee</span>
                            <span className="font-semibold text-gray-800">
                                ₹40
                            </span>
                        </div>

                        <div className="flex justify-between pt-1 text-base font-bold text-gray-900">
                            <span>Total</span>
                            <span className="text-orange-500">
                                ₹{getTotalCartAmount() + 40}
                            </span>
                        </div>
                    </div>
                </div>

                {/* PAYMENT METHOD */}
                <div className="payment-method bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-lg font-bold text-gray-800 mb-4">
                        Select Payment Method
                    </p>

                    <div className="flex flex-col gap-3">
                        {/* Razorpay */}
                        <label
                            onClick={() => setPaymentMethod("razorpay")}
                            className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${
                                paymentMethod === "razorpay"
                                    ? "border-orange-500 bg-orange-50"
                                    : "border-gray-200"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span>💳</span>
                                <span>Razorpay</span>
                            </div>
                            <input
                                type="radio"
                                checked={paymentMethod === "razorpay"}
                                readOnly
                            />
                        </label>

                        {/* COD */}
                        <label
                            onClick={() => setPaymentMethod("cod")}
                            className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${
                                paymentMethod === "cod"
                                    ? "border-orange-500 bg-orange-50"
                                    : "border-gray-200"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span>💵</span>
                                <span>Cash On Delivery</span>
                            </div>
                            <input
                                type="radio"
                                checked={paymentMethod === "cod"}
                                readOnly
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold mt-6 hover:bg-orange-600 transition-all"
                    >
                        {paymentMethod === "razorpay"
                            ? "PROCEED TO PAYMENT"
                            : "PLACE COD ORDER"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;