// File Location: frontend/src/components/LoginPopup/LoginPopup.jsx

import React, {
    useContext,
    useState
} from "react";

import "./LoginPopup.css";

import axios from "axios";

import {
    StoreContext
} from "../../context/StoreContext";

import {
    auth,
    googleProvider,
    signInWithPopup
} from "../../config/firebase";

const LoginPopup = ({
    setShowLogin
}) => {

    const {
        url,
        setToken,
        setUser
    } = useContext(
        StoreContext
    );

    const [
        currState,
        setCurrState
    ] = useState("Login");

    const [
        data,
        setData
    ] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [
        errorMsg,
        setErrorMsg
    ] = useState("");

    const [
        isLoading,
        setIsLoading
    ] = useState(false);

    // 🔄 Input Change Handler
    const onChangeHandler = (
        event
    ) => {

        const {
            name,
            value
        } = event.target;

        setData((data) => ({
            ...data,
            [name]: value
        }));
    };

    // 📧 Email & Password Authentication
    const onLogin = async (
        event
    ) => {

        event.preventDefault();

        setErrorMsg("");
        setIsLoading(true);

        let newUrl =
            url +
            (
                currState === "Login"
                    ? "/api/user/login"
                    : "/api/user/register"
            );

        try {

            const response =
                await axios.post(
                    newUrl,
                    data
                );

            if (
                response.data.success
            ) {

                // ✅ Save Token
                setToken(
                    response.data.token
                );

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                // ✅ Save User
                if (
                    response.data.user
                ) {

                    setUser(
                        response.data.user
                    );
                }

                // ✅ Close Popup
                setShowLogin(false);

            } else {

                setErrorMsg(
                    response.data.message
                );
            }

        } catch (error) {

            setErrorMsg(
                error.response
                    ?.data?.message ||
                "Authentication process failed."
            );

        } finally {

            setIsLoading(false);
        }
    };

    // 🌐 Google One-Click Authentication
    const handleGoogleSignIn =
        async () => {

            setErrorMsg("");
            setIsLoading(true);

            try {

                // 🔥 Firebase Popup Authentication
                const result =
                    await signInWithPopup(
                        auth,
                        googleProvider
                    );

                const federatedUser =
                    result.user;

                // 🚀 Send User To Backend
                const response =
                    await axios.post(
                        `${url}/api/user/google-login`,
                        {
                            name:
                                federatedUser.displayName,

                            email:
                                federatedUser.email
                        }
                    );

                if (
                    response.data.success
                ) {

                    // ✅ Save JWT Token
                    setToken(
                        response.data.token
                    );

                    localStorage.setItem(
                        "token",
                        response.data.token
                    );

                    // ✅ Save User Context
                    if (
                        response.data.user
                    ) {

                        setUser(
                            response.data.user
                        );
                    }

                    // ✅ Close Popup
                    setShowLogin(false);

                } else {

                    setErrorMsg(
                        response.data.message
                    );
                }

            } catch (error) {

                console.error(
                    "OAuth Internal Redirection Error:",
                    error
                );

                setErrorMsg(
                    "Google Authentication aborted or failed."
                );

            } finally {

                setIsLoading(false);
            }
        };

    return (

        <div
            className="
                fixed inset-0 z-50
                bg-black/60
                backdrop-blur-sm
                flex justify-center items-center
                p-4
                animate-fade-in
            "
        >

            <form
                onSubmit={onLogin}

                className="
                    bg-white
                    w-full max-w-md
                    p-8
                    rounded-2xl
                    shadow-2xl
                    flex flex-col gap-5
                    border border-gray-100
                    transform scale-100
                    transition-all duration-300
                "
            >

                {/* Header */}
                <div
                    className="
                        flex justify-between items-center
                        border-b pb-4
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-gray-800
                        "
                    >
                        {currState}
                    </h2>

                    <button
                        type="button"

                        onClick={() =>
                            setShowLogin(false)
                        }

                        className="
                            btn btn-sm
                            btn-circle
                            btn-ghost
                            text-lg
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* Error Box */}
                {errorMsg && (

                    <div
                        className="
                            alert alert-error
                            bg-red-50
                            text-red-600
                            text-sm
                            py-2 px-4
                            rounded-xl
                            border border-red-100
                        "
                    >

                        <span>
                            {errorMsg}
                        </span>
                    </div>
                )}

                {/* Form Inputs */}
                <div
                    className="
                        flex flex-col gap-4
                    "
                >

                    {currState ===
                        "Sign Up" && (

                        <input
                            name="name"

                            onChange={
                                onChangeHandler
                            }

                            value={
                                data.name
                            }

                            type="text"

                            placeholder="Your Full Name"

                            className="
                                input input-bordered
                                w-full
                                rounded-xl
                                focus:outline-orange-500
                                bg-gray-50
                                border-gray-200
                            "

                            required
                        />
                    )}

                    <input
                        name="email"

                        onChange={
                            onChangeHandler
                        }

                        value={
                            data.email
                        }

                        type="email"

                        placeholder="name@domain.com"

                        className="
                            input input-bordered
                            w-full
                            rounded-xl
                            focus:outline-orange-500
                            bg-gray-50
                            border-gray-200
                        "

                        required
                    />

                    <input
                        name="password"

                        onChange={
                            onChangeHandler
                        }

                        value={
                            data.password
                        }

                        type="password"

                        placeholder="••••••••"

                        className="
                            input input-bordered
                            w-full
                            rounded-xl
                            focus:outline-orange-500
                            bg-gray-50
                            border-gray-200
                        "

                        required
                    />
                </div>

                {/* Login/Register Button */}
                <button
                    type="submit"

                    disabled={
                        isLoading
                    }

                    className="
                        btn
                        bg-orange-500
                        hover:bg-orange-600
                        disabled:bg-gray-300
                        border-none
                        text-white
                        w-full
                        rounded-xl
                        font-semibold
                        tracking-wide
                        text-base
                        shadow-lg
                        shadow-orange-100
                        mt-2
                    "
                >

                    {isLoading ? (

                        <span
                            className="
                                loading
                                loading-spinner
                            "
                        ></span>

                    ) : (

                        currState ===
                        "Sign Up"
                            ? "Create Account"
                            : "Sign In"
                    )}
                </button>

                {/* Divider */}
                <div
                    className="
                        divider
                        text-xs
                        text-gray-400
                        font-medium
                        my-1
                    "
                >
                    OR CONTINUE WITH
                </div>

                {/* 🌐 Google Auth Button */}
                <button
                    type="button"

                    onClick={
                        handleGoogleSignIn
                    }

                    disabled={
                        isLoading
                    }

                    className="
                        btn btn-outline
                        border-gray-200
                        hover:bg-gray-50
                        text-gray-700
                        w-full
                        rounded-xl
                        flex items-center
                        justify-center
                        gap-2
                        font-medium
                    "
                >

                    {/* Google SVG */}
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                    >

                        <path
                            fill="#EA4335"
                            d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.21-3.21C17.55 1.7 14.97 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.75 2.91C6.15 7.14 8.85 5.04 12 5.04z"
                        />

                        <path
                            fill="#4285F4"
                            d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57v2.97h3.91c2.28-2.1 3.54-5.19 3.54-8.69z"
                        />

                        <path
                            fill="#FBBC05"
                            d="M5.25 14.59c-.25-.75-.39-1.55-.39-2.39s.14-1.64.39-2.39L1.5 6.9C.54 8.83 0 10.98 0 13.2s.54 4.37 1.5 6.3l3.75-2.91z"
                        />

                        <path
                            fill="#34A853"
                            d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.91-2.97c-1.08.72-2.47 1.16-4.05 1.16-3.15 0-5.85-2.1-6.8-5.37L1.41 15.82C3.3 19.65 7.25 23 12 23z"
                        />
                    </svg>

                    Continue with Google
                </button>

                {/* Switch Auth Mode */}
                <div
                    className="
                        text-center
                        text-sm
                        text-gray-600
                        mt-2
                    "
                >

                    {currState ===
                    "Login" ? (

                        <p>
                            New to Foodie?{" "}

                            <span
                                onClick={() =>
                                    setCurrState(
                                        "Sign Up"
                                    )
                                }

                                className="
                                    text-orange-500
                                    font-semibold
                                    cursor-pointer
                                    hover:underline
                                "
                            >
                                Create an account
                            </span>
                        </p>

                    ) : (

                        <p>
                            Already have an account?{" "}

                            <span
                                onClick={() =>
                                    setCurrState(
                                        "Login"
                                    )
                                }

                                className="
                                    text-orange-500
                                    font-semibold
                                    cursor-pointer
                                    hover:underline
                                "
                            >
                                Login here
                            </span>
                        </p>
                    )}
                </div>

            </form>
        </div>
    );
};

export default LoginPopup;