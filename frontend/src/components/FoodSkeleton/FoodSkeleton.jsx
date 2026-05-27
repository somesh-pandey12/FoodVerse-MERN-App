// File Location: frontend/src/components/FoodSkeleton/FoodSkeleton.jsx
import React from 'react';

const FoodSkeleton = () => {
    return (
        <div className="w-full m-auto rounded-2xl shadow-md border border-slate-100 bg-white overflow-hidden animate-pulse">
            {/* Food Image Placeholder Container */}
            <div className="w-full h-48 bg-slate-200"></div>
            
            {/* Content Text Blocks Container */}
            <div className="p-5 flex flex-col gap-3">
                {/* Header Row: Title & Star Ratings Placeholder */}
                <div className="flex justify-between items-center">
                    <div className="h-5 w-2/3 bg-slate-200 rounded-md"></div>
                    <div className="h-5 w-12 bg-slate-200 rounded-md"></div>
                </div>

                {/* Subtitle / Description Placeholder Lines */}
                <div className="flex flex-col gap-2 mt-1">
                    <div className="h-3 w-full bg-slate-200 rounded-md"></div>
                    <div className="h-3 w-4/5 bg-slate-200 rounded-md"></div>
                </div>

                {/* Pricing & Cart Action Button Row */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-50">
                    <div className="h-6 w-16 bg-slate-200 rounded-md"></div>
                    <div className="h-8 w-20 bg-slate-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default FoodSkeleton;