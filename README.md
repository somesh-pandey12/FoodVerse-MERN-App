# Tomato - Premium Swiggy-Inspired Food Delivery Platform

A modern, full-stack production-ready food ordering web application built using the **MERN architecture**. This platform replicates core enterprise features of Swiggy, including real-time dynamic menu filtering, state-managed persistent shopping cart loops, an operational administrative control panel, and cross-origin responsive databases.

## 🚀 Key Features
- **Dynamic Restaurant Catalog:** Real-time synchronization between the Database and Customer view.
- **Context-Driven State Management:** Global state execution utilizing React Context API for optimized multi-component re-renders during cart updates.
- **Fail-Safe Fallbacks:** Adaptive interface layout which switches seamlessly to highly optimized mock buffers if database ports are busy.
- **Admin Management Portal:** Dedicated administrative dashboard allowing operators to implement mutations (Create/Read/Delete operations) on active inventories.
- **Responsive Fluid Layouts:** Pure CSS-in-JS component matrices rendering perfectly across mobile devices, tablets, and wide-screen desktop nodes.

## 🛠️ Tech Stack & Architecture
- **Frontend Architecture:** React.js (Vite workflow environment), JavaScript (ES6+ specs), React Router DOM (Declarative Router).
- **Global State Control:** React Context API & Hooks (`useContext`, `useState`, `useEffect`).
- **Backend Environment:** Node.js, Express.js micro-framework ecosystem.
- **Database Architecture:** MongoDB with programmatic modeling using Mongoose ODM pipelines.
- **Network Interface Layer:** Axios async-await interceptor matrix.

## 📦 Local Installation & Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) active on your host execution instance.

### 1. Set Up and Boot the Backend Server
```bash
cd backend
npm install
node server.js
