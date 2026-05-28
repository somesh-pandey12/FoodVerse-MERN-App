// File Location: frontend/src/components/FoodItem/FoodItem.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

// ⚠️ NOTICE: MongoDB standard ke hisab se 'id' ko '_id' me map kiya hai
const FoodItem = ({ _id, id, name, price, description, image }) => {
  
  // Database syncing functions (addToCart, removeFromCart) ko context se nikaala
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Fallback ID selector: Agar parent component se _id ya id kuch bhi aaye, ye handle kar lega
  const itemId = _id || id;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full justify-between">
      
      {/* 📸 Image Layer Node */}
      <div className="relative overflow-hidden bg-gray-100">
        <img 
          src={`${url}/images/${image}`} 
          alt={name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          // 🔥 Fallback Mechanism: Agar image load na ho ya URL galat ho, toh ye default high-quality asset dikha dega
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop";
          }}
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-amber-600 font-semibold px-3 py-1 rounded-full text-xs shadow-sm">
          ★ 4.2
        </span>
      </div>

      {/* 📝 Content Description Layer */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{name}</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* 🏷️ Pricing & Interactive Counter Actions Node */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
          <span className="text-xl font-extrabold text-gray-900">₹{price}</span>
          
          {/* Global DB Linked Counter Operations */}
          {!cartItems[itemId] ? (
            <button 
              onClick={() => addToCart(itemId)} // 🚀 Connects directly to Backend MongoDB Sync
              className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white px-6 rounded-full font-medium tracking-wide shadow-md shadow-orange-200 transition-all transform active:scale-95"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-orange-500 text-white p-1 px-3 rounded-full shadow-md shadow-orange-200">
              <button 
                onClick={() => removeFromCart(itemId)} // 📉 Decrements and syncs with database
                className="font-bold hover:opacity-80 text-lg cursor-pointer"
              >
                -
              </button>
              <span className="font-semibold text-sm w-4 text-center">{cartItems[itemId]}</span>
              <button 
                onClick={() => addToCart(itemId)} // 📈 Increments and syncs with database
                className="font-bold hover:opacity-80 text-lg cursor-pointer"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;