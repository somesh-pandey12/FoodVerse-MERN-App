import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- Routes import kiya
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
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      <div className="app-appwrapper" style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>
        <Navbar setShowLogin={setShowLogin} />
        
        <div className="main-content" style={{ padding: "0px 8%" }}>
          {}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
          </Routes>
        </div>
        {}
        <Footer/>
      </div>
    </>
  );
};

export default App;