import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("Home");

  // Humne context se token aur functions nikal liye hain taaki logout/login state bhi manage ho sake
  const { cartItems, token, setToken } = useContext(StoreContext);

  // Cart ke total items count karne ke liye helper function jo bina crash kiye badge update karega
  const getTotalCartItemsCount = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.replace("/"); // User ko homepage par drop karne ke liye
  };

  return (
    <div className="navbar-container">

      <Link
        to='/'
        className="navbar-logo"
        onClick={() => setMenu("Home")}
        style={{ textDecoration: 'none' }}
      >
        Tomato<span>.</span>
      </Link>

      <ul className="navbar-menu">
        <Link
          to='/'
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Home
        </Link>
        <li
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("Mobile App")}
          className={menu === "Mobile App" ? "active" : ""}
        >
          Mobile App
        </li>
        <li
          onClick={() => setMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <Link to='/cart' className="navbar-cart-icon" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4 submodulezm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          
          {/* Sahi function call jo crash proof hai */}
          {getTotalCartItemsCount() > 0 && (
            <div className="cart-badge" style={{
              position: 'absolute', top: '-8px', right: '-8px',
              backgroundColor: '#ff4321', color: 'white', fontSize: '10px',
              width: '18px', height: '18px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
            }}>
              {getTotalCartItemsCount()}
            </div>
          )}
        </Link>

        {/* Dynamic Login / Logout Toggle Button */}
        {!token ? (
          <button
            className="navbar-button"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="https://placehold.co/35x35?text=User" alt="profile" style={{ width: "35px", borderRadius: "50%", cursor: 'pointer' }} />
            <button 
              onClick={logout} 
              style={{ padding: "6px 12px", backgroundColor: "#ff4321", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;