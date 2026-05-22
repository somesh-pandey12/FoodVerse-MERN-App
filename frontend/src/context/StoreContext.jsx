import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // ================= STATES =================
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");

    // ================= BACKEND URL =================
    const url = "http://localhost:4000";

    // ================= ADD TO CART =================
    const addToCart = async (itemId) => {

        // Update frontend cart instantly
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1,
            }));
        } else {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1,
            }));
        }

        // Update backend cart
        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        }
    };

    // ================= REMOVE FROM CART =================
    const removeFromCart = async (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1,
        }));

        // Update backend cart
        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }
    };

    // ================= TOTAL CART AMOUNT =================
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                let itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // ================= FETCH FOOD LIST =================
    const fetchFoodList = async () => {
        try {

            const response = await axios.get(
                url + "/api/food/list"
            );

            setFoodList(response.data.data);

        } catch (error) {
            console.log("Error fetching food list:", error);
        }
    };

    // ================= LOAD CART DATA =================
    const loadCartData = async (token) => {
        try {

            const response = await axios.post(
                url + "/api/cart/get",
                {},
                { headers: { token } }
            );

            setCartItems(response.data.cartData);

        } catch (error) {
            console.log("Error loading cart data:", error);
        }
    };

    // ================= LOAD DATA ON REFRESH =================
    useEffect(() => {

        async function loadData() {

            await fetchFoodList();

            if (localStorage.getItem("token")) {

                const savedToken = localStorage.getItem("token");

                setToken(savedToken);

                await loadCartData(savedToken);
            }
        }

        loadData();

    }, []);

    // ================= CONTEXT VALUE =================
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
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;