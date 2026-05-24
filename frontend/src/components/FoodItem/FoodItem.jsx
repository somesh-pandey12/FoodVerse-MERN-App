import React, { useContext } from "react";
import "./FoodItem.css";

import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({
    id,
    name,
    price,
    description,
    image
}) => {

    const {
        cartItems,
        addToCart,
        removeFromCart,
        url
    } = useContext(StoreContext);

    return (

        <div
            className='food-item'
            style={{
                width: "100%",
                margin: "auto",
                borderRadius: "15px",
                boxShadow: "0px 0px 10px #00000015",
                transition: "0.3s",
                backgroundColor: "white",
                overflow: "hidden"
            }}
        >

            <div
                className="food-item-img-container"
                style={{ position: "relative" }}
            >

                <img
                    className='food-item-image'
                    src={url + "/images/" + image}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover"
                    }}
                />

                {!cartItems[id] ? (

                    <button
                        className='add-btn'
                        onClick={() => addToCart(id)}
                        style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "18px",
                            color: "#ff4321",
                            boxShadow:
                                "0px 2px 5px rgba(0,0,0,0.2)"
                        }}
                    >
                        +
                    </button>

                ) : (

                    <div
                        className='food-item-counter'
                        style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "6px",
                            borderRadius: "50px",
                            backgroundColor: "white",
                            boxShadow:
                                "0px 2px 5px rgba(0,0,0,0.2)"
                        }}
                    >

                        <button
                            className='counter-minus'
                            onClick={() => removeFromCart(id)}
                            style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#ffe8e4",
                                color: "#ff4321",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            -
                        </button>

                        <span
                            style={{
                                fontWeight: "500"
                            }}
                        >
                            {cartItems[id]}
                        </span>

                        <button
                            className='counter-plus'
                            onClick={() => addToCart(id)}
                            style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#ff4321",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            +
                        </button>

                    </div>

                )}

            </div>

            <div
                className="food-item-info"
                style={{ padding: "20px" }}
            >

                <div
                    className="food-item-name-rating"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                    }}
                >

                    <p
                        style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            margin: 0
                        }}
                    >
                        {name}
                    </p>

                    <span
                        className="stars"
                        style={{
                            color: "#ff4321",
                            fontWeight: "bold"
                        }}
                    >
                        ⭐ 4.5
                    </span>

                </div>

                <p
                    className="food-item-desc"
                    style={{
                        color: "#676767",
                        fontSize: "12px",
                        minHeight: "36px",
                        margin: "0 0 10px 0"
                    }}
                >
                    {description}
                </p>

                <p
                    className="food-item-price"
                    style={{
                        color: "#ff4321",
                        fontSize: "20px",
                        fontWeight: "600",
                        margin: 0
                    }}
                >
                    ₹{price}
                </p>

            </div>

        </div>
    );
};

export default FoodItem;