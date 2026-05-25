import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
    const url = "http://localhost:5000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Burger"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({ name: "", description: "", price: "", category: "Burger" });
                setImage(false);
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Backend status check karo!");
        }
    };

    return (
        <div style={{ width: "100%", maxWidth: "600px", backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0px 4px 15px rgba(0,0,0,0.05)", color: "#555555" }}>
            <h3 style={{ marginBottom: "25px", color: "#333", fontWeight: "600" }}>Add New Food Product</h3>
            
            <form onSubmit={onSubmitHandler} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* Image Section */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Upload Product Image</span>
                    <label htmlFor="image" style={{ cursor: 'pointer', width: "max-content" }}>
                        <img 
                            src={image ? URL.createObjectURL(image) : "https://placehold.co/120x120?text=📸+Click+To+Upload"} 
                            alt="preview" 
                            style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "6px", border: "2px dashed #ff4321" }}
                        />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Product Name</span>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type item name here' required 
                           style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", outline: "none" }}/>
                </div>

                {/* Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Product Description</span>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="4" placeholder='Write full dish description here' required
                              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", outline: "none", resize: "none" }}></textarea>
                </div>

                {/* Category & Price Row */}
                <div style={{ display: 'flex', gap: '20px', width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>Category</span>
                        <select onChange={onChangeHandler} value={data.category} name="category" required
                                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "white" }}>
                            <option value="Burger">Burger</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                            <option value="North Indian">North Indian</option>
                        </select>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>Price (₹)</span>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹120' required 
                               style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", outline: "none" }}/>
                    </div>
                </div>

                <button type='submit' style={{ padding: "12px", backgroundColor: "#ff4321", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600", fontSize: "16px", marginTop: "10px", transition: "0.3s" }}>
                    ADD PRODUCT
                </button>
            </form>
        </div>
    );
};

export default Add;