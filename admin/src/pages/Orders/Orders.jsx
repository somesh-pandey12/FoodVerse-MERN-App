// File Location: admin/src/pages/Orders/Orders.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css'; // 👈 Custom CSS file link kiye hain

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚚 Fetch global user orders pipeline
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        alert("Failed to extract active routing orders data.");
      }
    } catch (error) {
      console.error("Orders Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📈 Update status control toggle node
  const statusHandler = async (event, orderId) => {
    const updatedStatus = event.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: updatedStatus
      });
      if (response.data.success) {
        await fetchAllOrders(); // Status update hote hi table refresh
      }
    } catch (error) {
      console.error("Status Update Failed:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-page-container">
      <div className="orders-page-header">
        <h3 className="orders-title">Live Orders Hub</h3>
        <span className="orders-counter">{orders.length} Active Workflows</span>
      </div>

      {loading ? (
        <div className="orders-loading">Loading incoming logistics streaming...</div>
      ) : orders.length > 0 ? (
        <div className="orders-list-wrapper">
          {orders.map((order, idx) => (
            <div key={order._id || idx} className="order-card-item">
              
              {/* Box 1: Package Icon */}
              <div className="order-icon-box">
                <span className="box-emoji">📦</span>
              </div>

              {/* Box 2: Food Items & Customer Address */}
              <div className="order-details-box">
                <p className="order-items-string">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                
                {/* Shipping Target Block */}
                <div className="customer-shipping-info">
                  <p className="shipping-label">Shipping Target:</p>
                  <p className="customer-name">{order.address.firstName + " " + order.address.lastName}</p>
                  <p className="customer-address">
                    {order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.country}
                  </p>
                  <p className="customer-phone">📞 {order.address.phone}</p>
                </div>
              </div>

              {/* Box 3: Metrics & Pricing */}
              <div className="order-metrics-box">
                <p className="metrics-label">Metrics Data</p>
                <p className="metrics-text">Items: <strong>{order.items.length} types</strong></p>
                <p className="metrics-text">Net Amount: <span className="order-total-price">₹{order.amount}</span></p>
                <p className="payment-method-tag">Method: <strong>{order.paymentType || "Online"}</strong></p>
              </div>

              {/* Box 4: Logistics Status Dropdown Selection */}
              <div className="order-status-box">
                <label className="status-label">Order Stage</label>
                <select 
                  onChange={(e) => statusHandler(e, order._id)} 
                  value={order.status} 
                  className="status-select-dropdown"
                >
                  <option value="Food Processing">⏱️ Food Processing</option>
                  <option value="Out for Delivery">🚀 Out for Delivery</option>
                  <option value="Delivered">✅ Delivered</option>
                </select>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="empty-orders-fallback">
          <p>No user records or payment orders streaming at this hour.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;