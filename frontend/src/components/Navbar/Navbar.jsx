// File Location: frontend/src/components/Navbar/Navbar.jsx

import { useState, useContext } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("Home");

    const {
        cartItems,
        token,
        setToken
    } = useContext(StoreContext);

    const navigate = useNavigate();

    const getTotalCartItemsCount = () => {

        let totalItems = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }

        return totalItems;
    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken("");

        navigate("/");

        alert("Logged Out Successfully");
    };

    return (

        <div
            className="navbar-container"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 4%",
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}
        >

            <Link
                to="/"
                className="navbar-logo"
                onClick={() => setMenu("Home")}
                style={{
                    textDecoration: "none",
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "#ff4321"
                }}
            >

                Tomato
                <span style={{ color: "#495057" }}>
                    .
                </span>

            </Link>

            <ul
                className="navbar-menu"
                style={{
                    display: "flex",
                    listStyle: "none",
                    gap: "20px",
                    margin: 0,
                    padding: 0,
                    fontSize: "16px",
                    color: "#495057",
                    fontWeight: "500",
                    cursor: "pointer"
                }}
            >

                <Link
                    to="/"
                    onClick={() => setMenu("Home")}
                    style={{
                        textDecoration: "none",
                        color:
                            menu === "Home"
                                ? "#ff4321"
                                : "inherit",
                        borderBottom:
                            menu === "Home"
                                ? "2px solid #ff4321"
                                : "none",
                        paddingBottom: "2px"
                    }}
                >
                    Home
                </Link>

                <li
                    onClick={() => setMenu("Menu")}
                    style={{
                        color:
                            menu === "Menu"
                                ? "#ff4321"
                                : "inherit",
                        borderBottom:
                            menu === "Menu"
                                ? "2px solid #ff4321"
                                : "none",
                        paddingBottom: "2px"
                    }}
                >
                    Menu
                </li>

                <li
                    onClick={() =>
                        setMenu("Mobile App")
                    }
                    style={{
                        color:
                            menu === "Mobile App"
                                ? "#ff4321"
                                : "inherit",
                        borderBottom:
                            menu === "Mobile App"
                                ? "2px solid #ff4321"
                                : "none",
                        paddingBottom: "2px"
                    }}
                >
                    Mobile App
                </li>

                <li
                    onClick={() =>
                        setMenu("Contact Us")
                    }
                    style={{
                        color:
                            menu === "Contact Us"
                                ? "#ff4321"
                                : "inherit",
                        borderBottom:
                            menu === "Contact Us"
                                ? "2px solid #ff4321"
                                : "none",
                        paddingBottom: "2px"
                    }}
                >
                    Contact Us
                </li>

            </ul>

            <div
                className="navbar-right"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "25px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search food..."
                    onChange={(e) =>
                        console.log(
                            "Searching for:",
                            e.target.value
                        )
                    }
                    style={{
                        border: "1px solid #ccc",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        outline: "none"
                    }}
                />

                <Link
                    to="/cart"
                    className="navbar-cart-icon"
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        textDecoration: "none"
                    }}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#495057"
                        strokeWidth="2"
                    >

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />

                    </svg>

                    {getTotalCartItemsCount() > 0 && (

                        <div
                            className="cart-badge"
                            style={{
                                position: "absolute",
                                top: "-10px",
                                right: "-10px",
                                backgroundColor: "#ff4321",
                                color: "white",
                                fontSize: "11px",
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold"
                            }}
                        >

                            {getTotalCartItemsCount()}

                        </div>

                    )}

                </Link>

                {!token ? (

                    <button
                        className="navbar-button"
                        onClick={() =>
                            setShowLogin(true)
                        }
                        style={{
                            backgroundColor:
                                "transparent",
                            color: "#495057",
                            fontSize: "16px",
                            border:
                                "1px solid #ff4321",
                            padding: "8px 25px",
                            borderRadius: "50px",
                            cursor: "pointer",
                            transition: "0.3s",
                            fontWeight: "500"
                        }}
                    >

                        Sign In

                    </button>

                ) : (

                    <div
                        className="navbar-profile"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px"
                        }}
                    >

                        <button
                            onClick={() =>
                                navigate("/myorders")
                            }
                            style={{
                                padding: "8px 14px",
                                border:
                                    "1px solid #ddd",
                                backgroundColor:
                                    "white",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            📦 My Orders
                        </button>

                        <img
                            src="https://placehold.co/35x35?text=U"
                            alt="profile"
                            style={{
                                width: "35px",
                                borderRadius: "50%"
                            }}
                        />

                        <button
                            onClick={logout}
                            style={{
                                padding: "6px 12px",
                                backgroundColor:
                                    "#ff4321",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}
                        >

                            Logout

                        </button>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Navbar;