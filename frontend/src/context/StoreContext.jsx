// File Location: frontend/src/context/StoreContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:8000";
    const [token, setToken] = useState(localStorage.getItem("token") || "mock-token-active");
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);

    // Fallback Mock Data in case backend is offline during manual testing
    const fallback_list = [
        { _id: "1", name: "Premium Greek Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500", price: 120, description: "Crisp cucumbers, tomatoes, festive olives, and premium feta cheese.", category: "Salad" },
        { _id: "2", name: "Crunchy Veg Roll", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500", price: 100, description: "Freshly flaked flatbread wrapped around sautéed seasoned vegetables.", category: "Rolls" },
        { _id: "3", name: "Classic Chocolate Fudge", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500", price: 250, description: "Gooey chocolate richness layered with velvety smooth ganache.", category: "Cake" }
    ];

    // Fetch dynamic food items list from database
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

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[itemId] > 1) updated[itemId] -= 1;
            else delete updated[itemId];
            return updated;
        });
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

    useEffect(() => {
        fetchFoodList();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;