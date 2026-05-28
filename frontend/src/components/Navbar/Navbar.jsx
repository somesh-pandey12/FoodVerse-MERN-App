// File Location: frontend/src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const { token, setToken, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Session Termination Handler
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setDropdownOpen(false);
        navigate("/");
    };

    // Smooth Scrolling & Route Navigation Interceptor
    const handleNavigation = (targetId, menuName) => {
        setMenu(menuName);
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const element = document.getElementById(targetId);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Corporate Inline UI Stylesheet
    const styles = {
        navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 8%", backgroundColor: "#ffffff", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)", sticky: "top", zIndex: 100, position: "sticky", top: 0 },
        logo: { fontSize: "28px", fontWeight: "800", color: "#fc8019", cursor: "pointer", letterSpacing: "-0.5px", margin: 0 },
        menuList: { display: "flex", listStyle: "none", gap: "30px", color: "#3d4152", fontWeight: "500", fontSize: "15px", cursor: "pointer" },
        activeItem: { paddingBottom: "2px", borderBottom: "3px solid #fc8019", color: "#fc8019" },
        rightContainer: { display: "flex", alignItems: "center", gap: "35px" },
        cartWrapper: { position: "relative", cursor: "pointer", fontSize: "22px", display: "flex", alignItems: "center" },
        cartBadge: { position: "absolute", top: "-8px", right: "-10px", backgroundColor: "#fc8019", color: "white", fontSize: "11px", borderRadius: "50%", padding: "2px 6px", fontWeight: "600" },
        signInBtn: { backgroundColor: "transparent", border: "1px solid #3d4152", padding: "9px 22px", borderRadius: "4px", fontSize: "14px", fontWeight: "600", color: "#3d4152", cursor: "pointer", transition: "0.2s" },
        profileMenuWrapper: { position: "relative" },
        avatarBtn: { backgroundColor: "#f2f2f2", border: "none", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "#3d4152" },
        dropdown: { position: "absolute", right: 0, top: "45px", backgroundColor: "white", boxShadow: "0px 4px 15px rgba(0,0,0,0.15)", borderRadius: "6px", width: "150px", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 200 },
        dropdownItem: { padding: "12px 16px", fontSize: "14px", color: "#3d4152", cursor: "pointer", borderBottom: "1px solid #f2f2f2", transition: "0.2s", display: "flex", gap: "8px" }
    };

    return (
        <div style={styles.navbar}>
            {/* Brand Logo Node - Rebranded to FoodVerse */}
            <h1 onClick={() => { navigate("/"); setMenu("home"); }} style={styles.logo}>
                FoodVerse
            </h1>

            {/* Middle Nav Matrix */}
            <ul style={styles.menuList}>
                <li onClick={() => { navigate("/"); setMenu("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={menu === "home" ? styles.activeItem : {}}>Home</li>
                <li onClick={() => handleNavigation("explore-menu", "menu")} style={menu === "menu" ? styles.activeItem : {}}>Menu</li>
                <li onClick={() => handleNavigation("app-download", "mobile-app")} style={menu === "mobile-app" ? styles.activeItem : {}}>Mobile App</li>
                <li onClick={() => handleNavigation("footer", "contact-us")} style={menu === "contact-us" ? styles.activeItem : {}}>Contact Us</li>
            </ul>

            {/* Operational Utilities Container */}
            <div style={styles.rightContainer}>
                {/* Dynamic Cart Icon Link */}
                <div onClick={() => navigate("/cart")} style={styles.cartWrapper}>
                    🛍️
                    {getTotalCartAmount() > 0 && (
                        <div style={styles.cartBadge}>!</div>
                    )}
                </div>

                {/* Verification Controlled Authentication Cluster */}
                {!token ? (
                    <button onClick={() => setShowLogin(true)} style={styles.signInBtn}>
                        Sign In
                    </button>
                ) : (
                    <div style={styles.profileMenuWrapper}>
                        {/* User Dynamic Profile Avatar */}
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)} 
                            style={styles.avatarBtn}
                            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                        >
                            👤
                        </button>

                        {/* Professional Account Dropdown List */}
                        {dropdownOpen && (
                            <div style={styles.dropdown}>
                                <div 
                                    style={styles.dropdownItem} 
                                    onMouseDown={() => navigate("/myorders")}
                                >
                                    📦 Orders
                                </div>
                                <div 
                                    style={{ ...styles.dropdownItem, color: "red", borderBottom: "none" }} 
                                    onMouseDown={logout}
                                >
                                    🚪 Logout
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;