import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client"; // ✅ Added

// ✅ Global Axios Configuration
axios.defaults.withCredentials = true;

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // 🌐 Backend Base URL
    const url =
        import.meta.env.VITE_BACKEND_URL ||
        "https://food-verse-mern-app.onrender.com";

    // ✅ Socket Connection
    const socket = io(url, {
        withCredentials: true,
        transports: ["websocket", "polling"],
    });

    // Debugging
    useEffect(() => {
        console.log("Current Backend URL:", url);
    }, [url]);

    // 🔐 Authentication State
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);

    // 🍔 Fetch Food List
    const fetchFoodList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Failed to load catalog:", error);
        } finally {
            setLoading(false);
        }
    };

    // 👤 Check User Authentication
    const checkUserAuth = async (activeToken) => {
        try {
            const response = await axios.get(`${url}/api/user/me`, {
                headers: { token: activeToken },
            });

            if (response.data.success) {
                setUser(response.data.user);
                return true;
            }

            return false;
        } catch (error) {
            console.error("Auth check failed:", error);
            return false;
        }
    };

    // 📥 Load Cart
    const loadCartData = async (activeToken) => {
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { token: activeToken },
            });

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error("Cart retrieval error:", error);
        }
    };

    // 🚀 Initial Bootstrap
    useEffect(() => {
        async function loadAllData() {
            await fetchFoodList();

            const persistentToken = localStorage.getItem("token");

            if (persistentToken) {
                setToken(persistentToken);

                const isAuthValid = await checkUserAuth(persistentToken);

                if (isAuthValid) {
                    await loadCartData(persistentToken);
                }
            }
        }

        loadAllData();
    }, []);

    // ✅ Socket Events
    useEffect(() => {
        socket.on("connect", () => {
            console.log("🔌 Socket Connected:", socket.id);
        });

        socket.on("status_changed", (data) => {
            console.log("📦 Order Status Updated:", data);

            // Yahan toast ya state update kar sakte ho
            // Example:
            // toast.success(`Order status: ${data.status}`);
        });

        return () => {
            socket.off("connect");
            socket.off("status_changed");
        };
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,

        addToCart: async (itemId) => {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1,
            }));

            await axios.post(`${url}/api/cart/add`, { itemId });
        },

        removeFromCart: async (itemId) => {
            setCartItems((prev) => {
                const updated = { ...prev };

                if (updated[itemId] > 1) updated[itemId] -= 1;
                else delete updated[itemId];

                return updated;
            });

            await axios.post(`${url}/api/cart/remove`, { itemId });
        },

        getTotalCartAmount: () => {
            let total = 0;

            for (const item in cartItems) {
                let info = food_list.find((p) => p._id === item);

                if (info) {
                    total += info.price * cartItems[item];
                }
            }

            return total;
        },

        token,
        setToken,
        user,
        setUser,
        loading,
        url,

        // ✅ Make socket available everywhere
        socket,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;