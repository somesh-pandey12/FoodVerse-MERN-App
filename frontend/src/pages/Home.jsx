import React, { useState } from "react";

import Header from "../components/Header/Header";
import ExploreMenu from "../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay";

const Home = () => {

    const [category, setCategory] = useState("All");

    return (

        <div className='home-page'>

            {/* Header / Banner */}
            <Header />

            {/* Hero Section */}
            <div className="hero bg-base-200 p-10 mb-8 rounded-xl">

                <div className="hero-content text-center">

                    <div className="max-w-md">

                        <h1 className="text-5xl font-bold text-orange-500">
                            Delicious Food
                        </h1>

                        <p className="py-6">
                            Order your favorite food from the best restaurants nearby.
                        </p>

                        <button className="btn btn-primary bg-orange-500 border-none">
                            View Menu
                        </button>

                    </div>

                </div>

            </div>

            {/* Categories Slider */}
            <ExploreMenu
                category={category}
                setCategory={setCategory}
            />

            {/* Food Items Display */}
            <FoodDisplay category={category} />

        </div>
    );
};

export default Home;