import { useContext } from "react";
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

    const imageUrl = image?.startsWith("http")
        ? image
        : `${url}/images/${image}`;

    return (

        <div
            className="food-item"
            style={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease"
            }}
        >

            <div
                className="food-item-img-container"
                style={{
                    position: "relative"
                }}
            >

                <img
                    className="food-item-image"
                    src={imageUrl}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        display: "block"
                    }}
                />

                {!cartItems[id] ? (

                    <button
                        onClick={() => addToCart(id)}
                        className="add-btn"
                        style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "#ffffff",
                            color: "#ff4321",
                            fontSize: "24px",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
                        }}
                    >
                        +
                    </button>

                ) : (

                    <div
                        className="food-item-counter"
                        style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "8px 12px",
                            backgroundColor: "#ffffff",
                            borderRadius: "50px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
                        }}
                    >

                        <button
                            onClick={() => removeFromCart(id)}
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#ffe5e0",
                                color: "#ff4321",
                                fontSize: "18px",
                                fontWeight: "700",
                                cursor: "pointer"
                            }}
                        >
                            −
                        </button>

                        <span
                            style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                minWidth: "18px",
                                textAlign: "center"
                            }}
                        >
                            {cartItems[id]}
                        </span>

                        <button
                            onClick={() => addToCart(id)}
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#ff4321",
                                color: "#ffffff",
                                fontSize: "18px",
                                fontWeight: "700",
                                cursor: "pointer"
                            }}
                        >
                            +
                        </button>

                    </div>

                )}

            </div>

            <div
                className="food-item-info"
                style={{
                    padding: "18px"
                }}
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

                    <h3
                        style={{
                            margin: 0,
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#2c2c2c"
                        }}
                    >
                        {name}
                    </h3>

                    <span
                        style={{
                            backgroundColor: "#fff3ed",
                            color: "#ff4321",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600"
                        }}
                    >
                        ⭐ 4.5
                    </span>

                </div>

                <p
                    className="food-item-desc"
                    style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        lineHeight: "1.5",
                        minHeight: "42px",
                        marginBottom: "15px"
                    }}
                >
                    {description}
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <p
                        className="food-item-price"
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#ff4321"
                        }}
                    >
                        ₹{price}
                    </p>

                    <span
                        style={{
                            fontSize: "13px",
                            color: "#16a34a",
                            fontWeight: "600"
                        }}
                    >
                        Free Delivery
                    </span>

                </div>

            </div>

        </div>
    );
};

export default FoodItem;