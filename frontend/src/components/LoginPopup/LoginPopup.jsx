import React, {
    useState,
    useContext
} from "react";

import "./LoginPopup.css";

import axios from "axios";

import { assets }
    from "../../assets/assets.js";

import { StoreContext }
    from "../../context/StoreContext";

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
        errorMessage,
        setErrorMessage
    ] = useState("");

    // 🔄 Input Change Handler
    const onChangeHandler = (
        event
    ) => {

        const name =
            event.target.name;

        const value =
            event.target.value;

        setData((data) => ({
            ...data,
            [name]: value
        }));
    };

    // 🔐 Login/Register Handler
    const onLogin = async (
        event
    ) => {

        event.preventDefault();

        setErrorMessage("");

        // Dynamic Route
        let newUrl = url;

        if (
            currState === "Login"
        ) {

            newUrl +=
                "/api/user/login";

        } else {

            newUrl +=
                "/api/user/register";
        }

        try {

            // ✅ withCredentials for cookies
            const response =
                await axios.post(
                    newUrl,
                    data,
                    {
                        withCredentials:
                            true
                    }
                );

            if (
                response.data.success
            ) {

                // ✅ Save Token
                if (
                    response.data.token
                ) {

                    localStorage.setItem(
                        "token",
                        response.data.token
                    );

                    setToken(
                        response.data.token
                    );
                }

                // ✅ Save User Data
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

                setErrorMessage(
                    response.data.message
                );
            }

        } catch (error) {

            const message =
                error.response
                    ?.data?.message ||
                "Something went wrong. Please try again.";

            setErrorMessage(
                message
            );

            console.error(
                "Authentication Error:",
                error
            );
        }
    };

    // 🎨 Inline Styling
    const styles = {

        overlay: {
            position: "fixed",
            zIndex: 999,
            width: "100%",
            height: "100%",
            backgroundColor:
                "#00000090",
            display: "grid"
        },

        container: {
            placeSelf: "center",
            width:
                "max(23vw, 330px)",
            color: "#808080",
            backgroundColor:
                "white",
            display: "flex",
            flexDirection:
                "column",
            gap: "25px",
            padding:
                "25px 30px",
            borderRadius: "8px",
            fontSize: "14px",
            fontFamily:
                "Outfit, sans-serif",
            boxShadow:
                "0px 0px 20px rgba(0,0,0,0.2)"
        },

        title: {
            display: "flex",
            justifyContent:
                "space-between",
            alignItems:
                "center",
            color: "black",
            fontSize: "20px",
            fontWeight: "bold"
        },

        close: {
            cursor: "pointer",
            width: "16px"
        },

        inputs: {
            display: "flex",
            flexDirection:
                "column",
            gap: "20px"
        },

        inputField: {
            border:
                "1px solid #c9c9c9",
            outline: "none",
            padding: "10px",
            borderRadius: "4px",
            fontSize: "15px"
        },

        btn: {
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            color: "white",
            backgroundColor:
                "#ff4321",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: "500"
        },

        error: {
            color: "red",
            fontSize: "12px",
            margin: "0"
        },

        switch: {
            cursor: "pointer",
            color: "#ff4321",
            fontWeight: "500"
        },

        condition: {
            display: "flex",
            alignItems: "start",
            gap: "8px",
            marginTop: "-15px"
        }
    };

    return (

        <div style={styles.overlay}>

            <form
                onSubmit={onLogin}
                style={styles.container}
            >

                {/* Header */}
                <div
                    style={styles.title}
                    className="login-popup-title"
                >

                    <h2>
                        {currState}
                    </h2>

                    <span
                        onClick={() =>
                            setShowLogin(false)
                        }

                        style={{
                            cursor:
                                "pointer",

                            fontSize:
                                "25px",

                            fontWeight:
                                "500"
                        }}
                    >
                        &times;
                    </span>
                </div>

                {/* Error Message */}
                {errorMessage && (

                    <p style={styles.error}>
                        {errorMessage}
                    </p>
                )}

                {/* Inputs */}
                <div
                    style={styles.inputs}
                >

                    {currState !==
                        "Login" && (

                        <input
                            name="name"

                            onChange={
                                onChangeHandler
                            }

                            value={
                                data.name
                            }

                            type="text"

                            placeholder="Your name"

                            required

                            style={
                                styles.inputField
                            }
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

                        placeholder="Your email"

                        required

                        style={
                            styles.inputField
                        }
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

                        placeholder="Password"

                        required

                        style={
                            styles.inputField
                        }
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    style={styles.btn}
                >

                    {currState ===
                    "Sign Up"
                        ? "Create Account"
                        : "Login"}
                </button>

                {/* Terms */}
                <div
                    style={styles.condition}
                >

                    <input
                        type="checkbox"
                        required
                    />

                    <p>
                        By continuing,
                        I agree to the
                        terms of use &
                        privacy policy.
                    </p>
                </div>

                {/* Switch Login/Register */}
                {currState ===
                "Login" ? (

                    <p>
                        Create a new
                        account?{" "}

                        <span
                            onClick={() =>
                                setCurrState(
                                    "Sign Up"
                                )
                            }

                            style={
                                styles.switch
                            }
                        >

                            Click here
                        </span>
                    </p>

                ) : (

                    <p>
                        Already have
                        an account?{" "}

                        <span
                            onClick={() =>
                                setCurrState(
                                    "Login"
                                )
                            }

                            style={
                                styles.switch
                            }
                        >

                            Login here
                        </span>
                    </p>
                )}

            </form>
        </div>
    );
};

export default LoginPopup;