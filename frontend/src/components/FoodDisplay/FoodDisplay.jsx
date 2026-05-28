import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import FoodSkeleton from '../FoodSkeleton/FoodSkeleton';

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="food-display">
      <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-6">
        Top dishes near you
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Jab data fetch ho raha ho tab 8 skeleton placeholders dikhenge
          Array(8).fill(0).map((_, idx) => <FoodSkeleton key={idx} />)
        ) : (
          food_list
            .filter(item => category === "All" || category === item.category)
            .map((item) => (
              <FoodItem 
                key={item._id} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
              />
            ))
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;