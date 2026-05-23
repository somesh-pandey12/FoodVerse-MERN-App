import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
// import "./PlaceOrder.css";

const PlaceOrder = () => {

    const {
        getTotalCartAmount,
        token,
        food_list,
        cartItems,
        url,
    } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const placeOrderSubmit = async (event) => {

        event.preventDefault();

        let orderItems = [];

        food_list.forEach((item) => {

            if (cartItems[item._id] > 0) {

                let itemInfo = {
                    ...item,
                    quantity: cartItems[item._id],
                };

                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 40,
        };

        try {

            let response = await axios.post(
                url + "/api/order/place",
                orderData,
                {
                    headers: { token },
                }
            );

            if (response.data.success) {

                const { session_url } = response.data;

                window.location.replace(session_url);

            } else {

                alert("Error placing order");
            }

        } catch (error) {

            console.error("Order processing failed", error);
        }
    };

    return (

        <form
            onSubmit={placeOrderSubmit}
            className='place-order'
            style={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
                gap: "50px",
                marginTop: "100px"
            }}
        >

            {/* Left Side */}
            <div
                className="place-order-left"
                style={{
                    width: "100%",
                    maxWidth: "max(30vw, 500px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >

                <p
                    className="title"
                    style={{
                        fontSize: "30px",
                        fontWeight: "600",
                        marginBottom: "30px",
                        color: "#262626"
                    }}
                >
                    Delivery Information
                </p>

                <div
                    className="multi-fields"
                    style={{ display: "flex", gap: "10px" }}
                >

                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                        style={inputStyle}
                    />

                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                        style={inputStyle}
                    />

                </div>

                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                    style={inputStyle}
                />

                <input
                    required
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                    style={inputStyle}
                />

                <div
                    className="multi-fields"
                    style={{ display: "flex", gap: "10px" }}
                >

                    <input
                        required
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                        style={inputStyle}
                    />

                    <input
                        required
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                        style={inputStyle}
                    />

                </div>

                <div
                    className="multi-fields"
                    style={{ display: "flex", gap: "10px" }}
                >

                    <input
                        required
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip Code"
                        style={inputStyle}
                    />

                    <input
                        required
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                        style={inputStyle}
                    />

                </div>

                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                    style={inputStyle}
                />

            </div>

            {/* Right Side */}
            <div
                className="place-order-right"
                style={{
                    width: "100%",
                    maxWidth: "max(40%, 500px)"
                }}
            >

                <div
                    className="cart-total"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >

                    <h2>Cart Totals</h2>

                    <div>

                        <div
                            className="cart-total-details"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#555"
                            }}
                        >
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>

                        <hr style={{ margin: "10px 0px" }} />

                        <div
                            className="cart-total-details"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#555"
                            }}
                        >
                            <p>Delivery Fee</p>

                            <p>
                                ₹{
                                    getTotalCartAmount() === 0
                                        ? 0
                                        : 40
                                }
                            </p>
                        </div>

                        <hr style={{ margin: "10px 0px" }} />

                        <div
                            className="cart-total-details"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "600",
                                color: "#000"
                            }}
                        >
                            <b>Total</b>

                            <b>
                                ₹{
                                    getTotalCartAmount() === 0
                                        ? 0
                                        : getTotalCartAmount() + 40
                                }
                            </b>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={getTotalCartAmount() === 0}
                        style={{
                            border: "none",
                            color: "white",
                            backgroundColor: "#ff4c24",
                            width: "max(15vw, 200px)",
                            padding: "12px 0px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "20px"
                        }}
                    >
                        PROCEED TO PAYMENT
                    </button>

                </div>

            </div>

        </form>
    );
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #c5c5c5",
    borderRadius: "4px",
    outline: "none",
};

export default PlaceOrder;