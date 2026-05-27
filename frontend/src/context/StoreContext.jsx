// File Location: frontend/src/context/StoreContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // 1. Maintain consistent architecture base configuration
    const url = "http://localhost:8000";
    
    // UI state states — token is now a simple boolean tracking active sessions
    const [token, setToken] = useState(false);
    const [user, setUser] = useState(null); 
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);

    // Global Axios Flag: Forces browser to include cookies automatically with cross-origin requests
    axios.defaults.withCredentials = true;

    // Fallback Mock Data in case backend is offline during manual testing
    const fallback_list = [
        { _id: "1", name: "Premium Greek Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500", price: 120, description: "Crisp cucumbers, tomatoes, festive olives, and premium feta cheese.", category: "Salad" },
        { _id: "2", name: "Crunchy Veg Roll", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500", price: 100, description: "Freshly flaked flatbread wrapped around sautéed seasoned vegetables.", category: "Rolls" },
        { _id: "3", name: "Classic Chocolate Fudge", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500", price: 250, description: "Gooey chocolate richness layered with velvety smooth ganache.", category: "Cake" }
    ];

    // 2. Fetch dynamic food items list from database
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success && response.data.data.length > 0) {
                setFoodList(response.data.data);
            } else {
                setFoodList(fallback_list);
            }
        } catch (error) {
            console.log("⚠️ Backend offline, loading Swiggy premium fallback layout.");
            setFoodList(fallback_list);
        }
    };

    // 3. Handshake Session Validation Routine (Resume-Grade Authentication Verification)
    // Instead of trusting stateful local client text strings, we ping the backend server
    const checkUserAuth = async () => {
        try {
            const response = await axios.get(`${url}/api/user/me`);
            if (response.data.success) {
                setToken(true);
                setUser(response.data.user);
                
                // Automatically populate database cart state if saved data exists
                if (response.data.user.cartData) {
                    setCartItems(response.data.user.cartData);
                }
            } else {
                clearAuthSession();
            }
        } catch (error) {
            // Safe fallback loop if server returns 401/500/offline status
            clearAuthSession();
        }
    };

    const clearAuthSession = () => {
        setToken(false);
        setUser(null);
    };

    // 4. Enhanced Database-Synced Cart Operations
    const addToCart = async (itemId) => {
        // Optimistic UI update: change client state instantly for smooth responsiveness
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        // If authenticated via cookie, securely stream mutation to database endpoint
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId });
            } catch (error) {
                console.error("❌ Failed to synchronize cart item addition with server:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[itemId] > 1) updated[itemId] -= 1;
            else delete updated[itemId];
            return updated;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId });
            } catch (error) {
                console.error("❌ Failed to synchronize cart item removal with server:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // 5. App Initialization Setup Lifecycle
    useEffect(() => {
        const initializeAppState = async () => {
            await fetchFoodList();
            await checkUserAuth();
        };
        initializeAppState();
    }, [token]); // Re-triggers verification on active login action steps

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        user,
        setUser
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;