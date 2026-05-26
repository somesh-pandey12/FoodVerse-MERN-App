// File Location: admin/src/pages/Add/Add.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
    const url = "http://localhost:8000"; 
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
        if(!image) {
            alert("Please upload an image first!");
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
                alert("Food Item Added Successfully!");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error adding food item:", error);
            alert("Failed to add product.");
        }
    };

    // Inline Styles object for absolute control
    const styles = {
        container: { padding: "40px", width: "100%", maxWidth: "600px" },
        form: { display: "flex", flexDirection: "column", gap: "20px" },
        inputBlock: { display: "flex", flexDirection: "column", gap: "8px" },
        label: { fontSize: "14px", fontWeight: "600", color: "#555555", textAlign: "left" },
        input: { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fafafa" },
        textarea: { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fafafa", resize: "vertical" },
        row: { display: "flex", gap: "20px", width: "100%" },
        split: { display: "flex", flexDirection: "column", gap: "8px", width: "50%" },
        uploadBox: { width: "120px", height: "120px", border: "1px dashed #777", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyValue: "center", justifyContent: "center", cursor: "pointer", backgroundColor: "#fafafa", overflow: "hidden" },
        preview: { width: "100%", height: "100%", objectFit: "cover" },
        button: { width: "140px", padding: "12px", backgroundColor: "#ff4321", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={onSubmitHandler}>
                
                {/* 1. Image Upload Block */}
                <div style={styles.inputBlock}>
                    <p style={styles.label}>Upload Image</p>
                    <label htmlFor="image" style={styles.uploadBox}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Preview" style={styles.preview} />
                        ) : (
                            <div style={{ textAlign: 'center', color: '#777', fontSize: '13px' }}>
                                <span style={{ fontSize: '24px' }}>➕</span>
                                <p style={{ margin: 0 }}>Choose Image</p>
                            </div>
                        )}
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </div>
                
                {/* 2. Product Name Block */}
                <div style={styles.inputBlock}>
                    <p style={styles.label}>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' style={styles.input} required />
                </div>

                {/* 3. Description Block */}
                <div style={styles.inputBlock}>
                    <p style={styles.label}>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="4" placeholder='Write content here' style={styles.textarea} required></textarea>
                </div>

                {/* 4. Category & Price Grid Block */}
                <div style={styles.row}>
                    <div style={styles.split}>
                        <p style={styles.label}>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category} style={styles.input}>
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
                    
                    <div style={styles.split}>
                        <p style={styles.label}>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹20' style={styles.input} required />
                    </div>
                </div>

                {/* 5. Submit Button */}
                <button type='submit' style={styles.button}>ADD ITEM</button>
            </form>
        </div>
    );
};

export default Add;