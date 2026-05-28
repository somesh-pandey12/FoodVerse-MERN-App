// File Location: frontend/src/components/FoodSkeleton/FoodSkeleton.jsx
import React from 'react';

const FoodSkeleton = () => {
    return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse w-full">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded-full w-24"></div>
      </div>
    </div>
  );
};

export default FoodSkeleton;