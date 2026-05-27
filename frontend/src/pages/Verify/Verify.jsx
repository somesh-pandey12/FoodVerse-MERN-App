import React, {
    useContext,
    useEffect
} from "react";

import "./Verify.css";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import {
    StoreContext
} from "../../context/StoreContext";

import axios from "axios";

const Verify = () => {

    // Get URL Query Params
    const [searchParams] =
        useSearchParams();

    const success =
        searchParams.get(
            "success"
        );

    const orderId =
        searchParams.get(
            "orderId"
        );

    const { url } =
        useContext(
            StoreContext
        );

    const navigate =
        useNavigate();

    // Verify Stripe Payment
    const verifyPayment =
        async () => {

        try {

            const response =
                await axios.post(
                    `${url}/api/order/verify`,
                    {
                        success,
                        orderId
                    }
                );

            if (
                response.data.success
            ) {

                // Payment Success
                navigate(
                    "/myorders"
                );

            } else {

                // Payment Failed
                navigate("/");
            }

        } catch (error) {

            console.error(
                "❌ Payment Verification Error:",
                error
            );

            navigate("/");
        }
    };

    // Auto Verify On Page Load
    useEffect(() => {

        if (
            orderId &&
            success
        ) {

            verifyPayment();

        } else {

            navigate("/");
        }

    }, [success, orderId]);

    return (

        <div
            className="verify-page"
            style={{
                minHeight: "70vh",
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

            {/* Loading Spinner */}
            <div
                className="payment-spinner"
                style={{
                    width: "90px",
                    height: "90px",
                    border:
                        "6px solid #d9d9d9",
                    borderTopColor:
                        "#ff4321",
                    borderRadius:
                        "50%",
                    animation:
                        "rotate 1s linear infinite"
                }}
            ></div>

            <h3
                style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#222"
                }}
            >
                Verifying your transaction...
            </h3>

            <p
                style={{
                    fontSize: "15px",
                    color: "#666"
                }}
            >
                Please do not close
                this window or click
                the back button.
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