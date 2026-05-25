import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Login Popup */}
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} />
      ) : null}

      {/* Main App Wrapper */}
      <div
        className="app app-appwrapper"
        style={{
          width: '80%',
          margin: 'auto',
          fontFamily: "'Outfit', sans-serif",
          minHeight: '100vh'
        }}
      >
        {/* Navbar */}
        <Navbar setShowLogin={setShowLogin} />

        {/* Main Content */}
        <div
          className="main-content"
          style={{ padding: '0px 8%' }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;