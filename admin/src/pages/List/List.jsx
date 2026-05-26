// File Location: admin/src/pages/List/List.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
    const url = "http://localhost:8000";
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                alert("Error fetching food items.");
            }
        } catch (error) {
            console.error(error);
            alert("Server connection failed.");
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            await fetchList(); // List ko update karne ke liye re-fetch
            if (response.data.success) {
                alert("Item Removed Successfully!");
            }
        } catch (error) {
            console.error(error);
            alert("Error removing item.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list-add flex-col p-6 w-full'>
            <p className='text-xl font-bold mb-4'>All Foods List</p>
            <div className="list-table border border-gray-200 rounded overflow-hidden">
                <div className="list-table-format grid grid-cols-5 items-center gap-4 bg-gray-100 p-3 font-semibold text-sm border-b">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format grid grid-cols-5 items-center gap-4 p-3 text-sm border-b bg-white hover:bg-gray-50'>
                            <img src={`${url}/images/` + item.image} alt={item.name} className='w-12 h-12 object-cover rounded' />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                            <p onClick={() => removeFood(item._id)} className='cursor-pointer text-red-500 font-bold text-center w-6 hover:scale-115 transition-transform'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default List;