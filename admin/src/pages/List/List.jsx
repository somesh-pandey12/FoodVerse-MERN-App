// File Location: admin/src/pages/List/List.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css'; // 👈 Nayi custom CSS file link kar di

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch all items from Database
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        alert("Error fetching food database inventory.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove item from Database
  const removeFood = async (foodId) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        if (response.data.success) {
          alert("Dish removed successfully.");
          await fetchList(); // Table refresh karne ke liye
        } else {
          alert("Could not remove item.");
        }
      } catch (error) {
        console.error("Remove Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-page-container">
      <div className="list-page-header">
        <p className="list-title">All Foods Menu Inventory</p>
        <span className="list-counter">{list.length} Items Listed</span>
      </div>

      {loading ? (
        <div className="list-loading">Loading catalog matrix...</div>
      ) : list.length > 0 ? (
        <div className="table-responsive-wrapper">
          <table className="custom-admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id}>
                  <td>
                    {/* 🖼️ Fixed Size Wrapper Image */}
                    <div className="table-image-box">
                      <img 
                        src={`${url}/images/${item.image}`} 
                        alt={item.name} 
                      />
                    </div>
                  </td>
                  <td className="food-name-cell">{item.name}</td>
                  <td><span className="category-tag">{item.category}</span></td>
                  <td className="price-text-cell">₹{item.price}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => removeFood(item._id)} 
                      className="table-delete-btn"
                    >
                      Delete 🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-list-fallback">
          <p>No food items added yet. Go to 'Add Item' tab!</p>
        </div>
      )}
    </div>
  );
};

export default List;