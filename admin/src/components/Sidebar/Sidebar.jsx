import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {

    const sidebarStyle = {
        width: "18vw",
        minWidth: "180px",
        minHeight: "calc(100vh - 65px)",
        borderRight: "1px solid #e4e4e4",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingTop: "30px",
        paddingLeft: "10%"
    };

    const linkStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 15px",
        border: "1px solid #a9a9a9",
        borderRight: "none",
        borderRadius: "5px 0 0 5px",
        textDecoration: "none",
        color: "#495057",
        fontWeight: "500",
        fontSize: "15px",
        backgroundColor: isActive ? "#fff0ed" : "transparent",
        borderColor: isActive ? "#ff4321" : "#a9a9a9",
    });

    return (
        <div className='sidebar' style={sidebarStyle}>

            <div className="sidebar-options">

                <NavLink
                    to='/add'
                    className="sidebar-option"
                    style={linkStyle}
                >
                    <span>➕</span>
                    <p style={{ margin: 0 }}>Add Items</p>
                </NavLink>

                <NavLink
                    to='/list'
                    className="sidebar-option"
                    style={linkStyle}
                >
                    <span>📜</span>
                    <p style={{ margin: 0 }}>List Items</p>
                </NavLink>

                <NavLink
                    to='/orders'
                    className="sidebar-option"
                    style={linkStyle}
                >
                    <span>🚚</span>
                    <p style={{ margin: 0 }}>Orders Management</p>
                </NavLink>

            </div>

        </div>
    );
};

export default Sidebar;