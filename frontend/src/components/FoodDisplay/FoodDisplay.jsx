// File Location: frontend/src/components/FoodDisplay/FoodDisplay.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import FoodSkeleton from '../FoodSkeleton/FoodSkeleton';

const FoodDisplay = ({ category }) => {
  // Global catalog state read streams
  const { food_list, loading } = useContext(StoreContext);

  // 1. Filter the food items safely based on categories selection menu active node
  const filteredList = food_list.filter(item => category === "All" || category === item.category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in" id="food-display">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
          Top dishes near you
        </h2>
        {!loading && (
          <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            {filteredList.length} Options Available
          </span>
        )}
      </div>
      
      {/* 🍱 Dynamic Multi-Column Grid Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Active state rendering placeholder skeletons blocks loaders
          Array(8).fill(0).map((_, idx) => <FoodSkeleton key={idx} />)
        ) : filteredList.length > 0 ? (
          filteredList.map((item) => (
            <FoodItem 
              key={item._id} 
              _id={item._id} // 🔥 CRITICAL FIX: Changed 'id' to '_id' to match MongoDB schema and dynamic cart keys syncing
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image} 
            />
          ))
        ) : (
          // 📭 Empty Fallback: Content block placeholder displayed if category filter yields zero data rows
          <div className="col-span-full text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
            <span className="text-4xl mb-3 block">🍽️</span>
            <h3 className="text-lg font-bold text-gray-700">No dishes found in this category</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">We are updating our kitchen catalog, select another category item menu layout stack!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;