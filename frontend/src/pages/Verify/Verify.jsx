// File Location: frontend/src/pages/Verify/Verify.jsx

import React from "react";

const { useContext, useEffect } = React;

import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

import axios from "axios";

import "./Verify.css";

const Verify = () => {

    const [searchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(StoreContext);

    const navigate = useNavigate();

    // Verify Stripe Payment
    const verifyPayment = async () => {

        try {

            const response = await axios.post(
                url + "/api/order/verify",
                {
                    success,
                    orderId
                }
            );

            if (response.data.success) {

                navigate("/myorders");

            } else {

                navigate("/");
            }

        } catch (error) {

            console.error(
                "Payment Verification Error:",
                error
            );

            navigate("/");
        }
    };

    useEffect(() => {

        verifyPayment();

    }, []);

    return (

        <div
            className="verify-screen"
            style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}
        >

            {/* Loading Spinner */}
            <div
                className="spinner"
                style={{
                    width: "90px",
                    height: "90px",
                    border: "6px solid #d9d9d9",
                    borderTopColor: "#ff4321",
                    borderRadius: "50%",
                    animation: "rotate 1s linear infinite"
                }}
            ></div>

            <p
                style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#555"
                }}
            >
                Verifying your payment, please do not close the window...
            </p>

            {/* Spinner Animation */}
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
};

export default Verify;