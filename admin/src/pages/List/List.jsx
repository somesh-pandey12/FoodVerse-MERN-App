import React, { useEffect, useState } from 'react';
import axios from 'react'; // If you want to grab from context instead, feel free to switch to useContext style

const List = () => {
    // Aligned to default to matching port config
    const url = "http://localhost:8000"; 
    const [list, setList] = useState([]);

    // Database se saare food items fetch karne ka function
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data && response.data.success) {
                setList(response.data.data);
            } else {
                alert("Error: Data fetch nahi ho paya!");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Backend check karo, list fetch karne me dikkat aayi!");
        }
    };

    // Item ko database se delete karne ka function
    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data && response.data.success) {
                alert(response.data.message);
                await fetchList(); 
            } else {
                alert("Error: Food item remove nahi hua");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Delete request failed!");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div style={{ width: "100%", backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0px 4px 15px rgba(0,0,0,0.05)", fontFamily: "sans-serif" }}>
            <h3 style={{ marginBottom: "20px", color: "#333", fontWeight: "600" }}>All Food Items List</h3>
            
            {/* Table Header Row */}
            <div style={{
                display: "grid", gridTemplateColumns: "0.5fr 2fr 1fr 1fr 0.5fr",
                alignItems: "center", gap: "15px", padding: "12px 15px",
                border: "1px solid #6c757d30", backgroundColor: "#f9f9f9", fontWeight: "600", fontSize: "14px", color: "#495057"
            }}>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>

            {/* Dynamic Data Rows from MongoDB */}
            {list.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>Database me koi item nahi mila. Pehle Add section se add karo!</p>
            ) : (
                list.map((item, index) => (
                    <div key={index} style={{
                        display: "grid", gridTemplateColumns: "0.5fr 2fr 1fr 1fr 0.5fr",
                        alignItems: "center", gap: "15px", padding: "12px 15px",
                        border: "1px solid #6c757d20", borderTop: "none", fontSize: "14px", color: "#555"
                    }}>
                        <img src={`${url}/images/${item.image}`} alt={item.name} style={{ width: "50px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                        <p style={{ margin: 0 }}>{item.name}</p>
                        <p style={{ margin: 0 }}>{item.category}</p>
                        <p style={{ margin: 0 }}>₹{item.price}</p>
                        <p onClick={() => removeFood(item._id)} style={{ cursor: "pointer", color: "#ff4321", fontWeight: "bold", textAlign: "center", margin: 0 }}>X</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default List;