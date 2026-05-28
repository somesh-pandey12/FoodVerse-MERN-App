// File Location: admin/src/pages/Add/Add.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Add.css'; // 👈 Custom CSS file linkage

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload a product image!");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(false);
        alert("Product Added Successfully! 🚀");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Backend connection error.");
    }
  };

  return (
    <div className="add-page-wrapper">
      <div className="add-page-header">
        <h2>Add New Dish</h2>
        <p>Upload a kitchen item to populate your dynamic food delivery catalog.</p>
      </div>

      <form onSubmit={onSubmitHandler} className="add-form-element">
        
        {/* 📸 Image Upload Box */}
        <div className="form-input-group flex-col">
          <label className="input-field-title">Upload Product Image</label>
          <label htmlFor="image" className="image-upload-dropzone">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Preview" className="uploaded-preview-img" />
            ) : (
              <div className="upload-placeholder-content">
                <span className="upload-icon">➕</span>
                <span className="upload-text">Choose File</span>
              </div>
            )}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        {/* 🏷️ Product Name input */}
        <div className="form-input-group flex-col">
          <label className="input-field-title">Product Name</label>
          <input 
            type="text" 
            name="name" 
            onChange={onChangeHandler} 
            value={data.name} 
            placeholder="Type dish name here (e.g., Spicy Hakka Noodles)" 
            required 
            className="styled-text-input"
          />
        </div>

        {/* 📝 Product Description textarea */}
        <div className="form-input-group flex-col">
          <label className="input-field-title">Product Description</label>
          <textarea 
            name="description" 
            onChange={onChangeHandler} 
            value={data.description} 
            rows="4" 
            placeholder="Write clear, appetizing details about ingredients, taste, and portion size..." 
            required
            className="styled-textarea-input"
          ></textarea>
        </div>

        {/* 🎛️ Dual Row Grid: Category & Price */}
        <div className="form-dual-row-grid">
          
          {/* Dropdown Category Box */}
          <div className="form-input-group flex-col">
            <label className="input-field-title">Product Category</label>
            <select 
              name="category" 
              onChange={onChangeHandler} 
              value={data.category}
              className="styled-select-dropdown"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Product Price input */}
          <div className="form-input-group flex-col">
            <label className="input-field-title">Product Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              onChange={onChangeHandler} 
              value={data.price} 
              placeholder="20" 
              required 
              min="1"
              className="styled-text-input price-padding"
            />
          </div>

        </div>

        {/* Action Trigger Button */}
        <button type="submit" className="admin-submit-btn">
          ADD PRODUCT
        </button>

      </form>
    </div>
  );
};

export default Add;