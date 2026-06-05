// File Location: frontend/src/context/StoreContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Global Axios Configuration
axios.defaults.withCredentials = true;
axios.defaults.headers.common["token"] =
    localStorage.getItem("token") || "";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // 🌐 Backend Base URL
    const url = "http://localhost:8000";

    // 🔐 Authentication State
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    // ⏳ Loading State
    const [loading, setLoading] = useState(true);

    // 🛒 Cart State
    const [cartItems, setCartItems] = useState({});

    // 🍔 Food List State
    const [food_list, setFoodList] = useState([]);

    // 🧯 Fallback Demo Data
    const fallback_list = [
        {
            _id: "1",
            name: "Premium Greek Salad",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
            price: 120,
            description: "Crisp cucumbers, tomatoes, olives, and feta cheese.",
            category: "Salad",
        },
        {
            _id: "2",
            name: "Crunchy Veg Roll",
            image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500",
            price: 100,
            description: "Freshly wrapped sautéed vegetables.",
            category: "Rolls",
        },
        {
            _id: "3",
            name: "Classic Chocolate Fudge",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
            price: 250,
            description: "Rich chocolate layered with smooth ganache.",
            category: "Cake",
        },
    ];

    // 🍔 Fetch Food List
    const fetchFoodList = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${url}/api/food/list`);

            if (
                response.data.success &&
                response.data.data.length > 0
            ) {
                setFoodList(response.data.data);
            } else {
                setFoodList(fallback_list);
            }
        } catch (error) {
            console.error(
                "Failed executing catalog data load:",
                error
            );
            setFoodList(fallback_list);
        } finally {
            setLoading(false);
        }
    };

    // 👤 Check User Authentication
    const checkUserAuth = async (activeToken) => {
        try {
            const response = await axios.get(
                `${url}/api/user/me`,
                {
                    headers: {
                        token: activeToken,
                    },
                }
            );

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

    // 📥 Load Persistent Cart Data
    const loadCartData = async (activeToken) => {
        try {
            const response = await axios.get(
                `${url}/api/cart/get`,
                {
                    headers: {
                        token: activeToken,
                    },
                }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error("Cart retrieval error:", error);
        }
    };

    // 🛒 Add Item To Cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        const activeToken =
            token || localStorage.getItem("token");

        if (activeToken) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    {
                        headers: {
                            token: activeToken,
                        },
                    }
                );
            } catch (error) {
                console.error("Cart sync error:", error);
            }
        }
    };

    // ❌ Remove Item From Cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };

            if (updated[itemId] > 1) {
                updated[itemId] -= 1;
            } else {
                delete updated[itemId];
            }

            return updated;
        });

        const activeToken =
            token || localStorage.getItem("token");

        if (activeToken) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    {
                        headers: {
                            token: activeToken,
                        },
                    }
                );
            } catch (error) {
                console.error("Cart sync error:", error);
            }
        }
    };

    // 💰 Calculate Total
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount +=
                        itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // 🚀 Initial Bootstrap
    useEffect(() => {
        async function loadAllData() {
            await fetchFoodList();

            const persistentToken =
                localStorage.getItem("token");

            if (persistentToken) {
                setToken(persistentToken);

                // ✅ Update Axios token globally
                axios.defaults.headers.common["token"] =
                    persistentToken;

                const isAuthValid =
                    await checkUserAuth(persistentToken);

                if (isAuthValid) {
                    await loadCartData(persistentToken);
                }
            }
        }

        loadAllData();
    }, []);

    // ✅ Keep Axios token synced whenever login/logout happens
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        } else {
            delete axios.defaults.headers.common["token"];
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        user,
        setUser,
        loading,
        url,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;