// File Location: frontend/src/App.jsx

import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {

    const [showLogin, setShowLogin] = useState(false);

    return (
        <>

            {/* Login Popup */}
            {showLogin ? (
                <LoginPopup
                    setShowLogin={setShowLogin}
                />
            ) : null}

            {/* Main App Wrapper */}
            <div
                className="app app-appwrapper"
                style={{
                    width: "80%",
                    margin: "auto",
                    fontFamily: "'Outfit', sans-serif",
                    minHeight: "100vh"
                }}
            >

                {/* Navbar */}
                <Navbar
                    setShowLogin={setShowLogin}
                />

                {/* Main Content */}
                <div
                    className="main-content"
                    style={{
                        padding: "0px 8%"
                    }}
                >

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />

                        <Route
                            path="/order"
                            element={<PlaceOrder />}
                        />

                        <Route
                            path="/verify"
                            element={<Verify />}
                        />

                        <Route
                            path="/myorders"
                            element={<MyOrders />}
                        />

                    </Routes>

                </div>

                {/* Footer */}
                <Footer />

            </div>

        </>
    );
};

export default App;