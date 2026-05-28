// File Location: admin/src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'

const App = () => {
  // 🔥 BACKEND ANCHOR LINK: Isko yahan declare kiya taaki saare pages ko mil sake
  const url = "http://localhost:8000";

  return (
    <div className='admin-app' style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>
      
      {/* Top Navbar Header */}
      <div className="navbar" style={{ display: "flex", justifyBetween: "space-between", alignItems: "center", padding: "12px 4%", backgroundColor: "white", borderBottom: "1px solid #e4e4e4" }}>
        <h2 style={{ color: "#ff4321", fontWeight: "700", margin: 0, fontSize: "24px", display: "flex", alignItems: "center" }}>
          Tomato. 
          <span style={{ fontSize: "12px", color: "#656565", fontWeight: "500", border: "1px solid #656565", padding: "2px 6px", borderRadius: "4px", marginLeft: "5px" }}>
            ADMIN PANEL
          </span>
        </h2>
        <img src="https://placehold.co/40x40?text=Admin" alt="profile" style={{ width: "40px", borderRadius: "50%" }} />
      </div>

      {/* Main Dashboard Body */}
      <div className="app-content" style={{ display: 'flex', width: "100%" }}>
        <Sidebar />
        
        <div className="page-container" style={{ flexGrow: 1, padding: '40px', backgroundColor: "#fcfcfc", minHeight: "calc(100vh - 65px)" }}>
          <Routes>
            {/* 1. Default root path pe automatic /add par bhej dega */}
            <Route path="/" element={<Navigate to="/add" />} />
            
            {/* 2. Operational Routes (Yahan url={url} pass kar diya hai properly) */}
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            
            {/* 3. Catch-all fallback route (Isko hamesha sabse NEECHE hona chahiye!) */}
            <Route path="*" element={<Navigate to="/add" />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App;