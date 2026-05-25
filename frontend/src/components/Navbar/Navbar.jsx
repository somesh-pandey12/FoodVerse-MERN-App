import { useState, useContext } from 'react'; 
import './Navbar.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("Home");
  const { cartItems, token, setToken } = useContext(StoreContext);

  // Safe Cart Items counter helper function
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
    window.location.replace("/");
  };

  return (
    <div className="navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 4%', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>

      {/* Brand Logo */}
      <Link
        to='/'
        className="navbar-logo"
        onClick={() => setMenu("Home")}
        style={{ textDecoration: 'none', fontSize: '30px', fontWeight: '700', color: '#ff4321' }}
      >
        Tomato<span style={{ color: '#495057' }}>.</span>
      </Link>

      {/* Navigation Links */}
      <ul className="navbar-menu" style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0, fontSize: '16px', color: '#495057', fontWeight: '500', cursor: 'pointer' }}>
        <Link
          to='/'
          onClick={() => setMenu("Home")}
          style={{ textDecoration: 'none', color: menu === "Home" ? "#ff4321" : "inherit", borderBottom: menu === "Home" ? "2px solid #ff4321" : "none", paddingBottom: '2px' }}
        >
          Home
        </Link>
        <li onClick={() => setMenu("Menu")} style={{ color: menu === "Menu" ? "#ff4321" : "inherit", borderBottom: menu === "Menu" ? "2px solid #ff4321" : "none", paddingBottom: '2px' }}>Menu</li>
        <li onClick={() => setMenu("Mobile App")} style={{ color: menu === "Mobile App" ? "#ff4321" : "inherit", borderBottom: menu === "Mobile App" ? "2px solid #ff4321" : "none", paddingBottom: '2px' }}>Mobile App</li>
        <li onClick={() => setMenu("Contact Us")} style={{ color: menu === "Contact Us" ? "#ff4321" : "inherit", borderBottom: menu === "Contact Us" ? "2px solid #ff4321" : "none", paddingBottom: '2px' }}>Contact Us</li>
      </ul>

      {/* Right Side Control Panel */}
      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        
        {/* Search Icon Component */}
        <div className="navbar-search-icon" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#495057" /* Dark color manually assigned */
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* 🛒 Main Cart Icon Trigger with explicit style visibility */}
        <Link to='/cart' className="navbar-cart-icon" style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#495057" /* Explicit color taaki background me chhpe na */
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          
          {/* Cart Counter Red Badge notification */}
          {getTotalCartItemsCount() > 0 && (
            <div className="cart-badge" style={{
              position: 'absolute', top: '-10px', right: '-10px',
              backgroundColor: '#ff4321', color: 'white', fontSize: '11px',
              width: '18px', height: '18px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
            }}>
              {getTotalCartItemsCount()}
            </div>
          )}
        </Link>

        {/* User Authentication Gate */}
        {!token ? (
          <button
            className="navbar-button"
            onClick={() => setShowLogin(true)}
            style={{ backgroundColor: 'transparent', color: '#495057', fontSize: '16px', border: '1px solid #ff4321', padding: '8px 25px', borderRadius: '50px', cursor: 'pointer', transition: '0.3s', fontWeight: '500' }}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="https://placehold.co/35x35?text=User" alt="profile" style={{ width: "35px", borderRadius: "50%" }} />
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