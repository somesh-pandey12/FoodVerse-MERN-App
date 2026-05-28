// File Location: frontend/src/context/StoreContext.jsx

import React, {
    createContext,
    useState,
    useEffect
} from "react";

import axios from "axios";

export const StoreContext =
    createContext(null);

const StoreContextProvider = (props) => {

    // Backend Base URL
    const url =
        "http://localhost:8000";

    // Authentication State
    const [token, setToken] =
        useState("");

    const [user, setUser] =
        useState(null);

    // Loading State (Skeleton Loader Support)
    const [loading, setLoading] =
        useState(true);

    // Cart State
    const [cartItems, setCartItems] =
        useState({});

    // Food List State
    const [food_list, setFoodList] =
        useState([]);

    // Automatically include cookies
    axios.defaults.withCredentials = true;

    // Backup Fallback Data
    const fallback_list = [
        {
            _id: "1",
            name: "Premium Greek Salad",
            image:
                "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
            price: 120,
            description:
                "Crisp cucumbers, tomatoes, olives, and feta cheese.",
            category: "Salad"
        },

        {
            _id: "2",
            name: "Crunchy Veg Roll",
            image:
                "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500",
            price: 100,
            description:
                "Freshly wrapped sautéed vegetables.",
            category: "Rolls"
        },

        {
            _id: "3",
            name: "Classic Chocolate Fudge",
            image:
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
            price: 250,
            description:
                "Rich chocolate layered with smooth ganache.",
            category: "Cake"
        }
    ];

    // Fetch Food List
    const fetchFoodList = async () => {

        try {

            setLoading(true);

            const response =
                await axios.get(
                    `${url}/api/food/list`
                );

            if (
                response.data.success &&
                response.data.data.length > 0
            ) {

                setFoodList(
                    response.data.data
                );

                console.log(
                    "🛒 Live Food Data Synced:",
                    response.data.data
                );

            } else {

                setFoodList(
                    fallback_list
                );
            }

        } catch (error) {

            console.log(
                "⚠️ Backend offline, loading fallback data."
            );

            console.error(error);

            setFoodList(
                fallback_list
            );

        } finally {

            setLoading(false);
        }
    };

    // Check User Authentication
    const checkUserAuth = async (
        localToken
    ) => {

        try {

            const response =
                await axios.get(
                    `${url}/api/user/me`,
                    {
                        headers: {
                            token:
                                localToken
                        }
                    }
                );

            if (response.data.success) {

                setUser(
                    response.data.user
                );

                // Load saved cart data
                if (
                    response.data.user
                        .cartData
                ) {

                    setCartItems(
                        response.data.user
                            .cartData
                    );
                }

            } else {

                clearAuthSession();
            }

        } catch (error) {

            if (
                error.response
                    ?.status === 401
            ) {

                localStorage.removeItem(
                    "token"
                );

                clearAuthSession();
            }
        }
    };

    // Clear Auth Session
    const clearAuthSession =
        () => {

            setToken("");

            setUser(null);
        };

    // Add To Cart
    const addToCart = async (
        itemId
    ) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]:
                (prev[itemId] || 0) + 1
        }));

        // Sync with backend if logged in
        if (token) {

            try {

                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    {
                        headers: {
                            token
                        }
                    }
                );

            } catch (error) {

                console.error(
                    "❌ Cart sync failed:",
                    error
                );
            }
        }
    };

    // Remove From Cart
    const removeFromCart = async (
        itemId
    ) => {

        setCartItems((prev) => {

            const updated = {
                ...prev
            };

            if (
                updated[itemId] > 1
            ) {

                updated[itemId] -= 1;

            } else {

                delete updated[itemId];
            }

            return updated;
        });

        // Sync remove with backend
        if (token) {

            try {

                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    {
                        headers: {
                            token
                        }
                    }
                );

            } catch (error) {

                console.error(
                    "❌ Remove sync failed:",
                    error
                );
            }
        }
    };

    // Calculate Total Cart Amount
    const getTotalCartAmount =
        () => {

            let totalAmount = 0;

            for (const item in cartItems) {

                if (
                    cartItems[item] > 0
                ) {

                    let itemInfo =
                        food_list.find(
                            (product) =>
                                product._id === item
                        );

                    if (itemInfo) {

                        totalAmount +=
                            itemInfo.price *
                            cartItems[item];
                    }
                }
            }

            return totalAmount;
        };

    // Initial App Load
    const loadData = async () => {

        await fetchFoodList();

        const localToken =
            localStorage.getItem(
                "token"
            );

        if (localToken) {

            setToken(localToken);

            await checkUserAuth(
                localToken
            );
        }
    };

    useEffect(() => {

        loadData();

    }, []);

    const contextValue = {

        food_list,
        setFoodList,

        cartItems,
        setCartItems,

        addToCart,
        removeFromCart,

        getTotalCartAmount,

        token,
        setToken,

        user,
        setUser,

        loading,

        url
    };

    return (
        <StoreContext.Provider
            value={contextValue}
        >
            {props.children}
        </StoreContext.Provider>
    );
};

export default
    StoreContextProvider;