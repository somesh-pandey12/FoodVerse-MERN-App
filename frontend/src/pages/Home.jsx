// File Location: frontend/src/pages/Home/Home.jsx

import { useState } from "react";

import Header from "../components/Header/Header";
import ExploreMenu from "../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay";
import AppDownload from '../components/AppDownload/AppDownload'

const Home = () => {

    const [category, setCategory] = useState("All");

    return (

        <div className="home-page">

            {/* Header / Banner */}
            <Header />

            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    background: "#fff4f2",
                    padding: "50px 30px",
                    margin: "30px 0px",
                    borderRadius: "20px",
                    textAlign: "center"
                }}
            >

                <div
                    className="hero-content"
                    style={{
                        maxWidth: "700px",
                        margin: "auto"
                    }}
                >

                    <h1
                        style={{
                            fontSize: "48px",
                            fontWeight: "700",
                            color: "#ff4321",
                            marginBottom: "20px"
                        }}
                    >
                        Delicious Food
                    </h1>

                    <p
                        style={{
                            fontSize: "18px",
                            color: "#555",
                            lineHeight: "30px",
                            marginBottom: "30px"
                        }}
                    >
                        Order your favorite food from the best restaurants nearby.
                    </p>

                    <button
                        style={{
                            backgroundColor: "#ff4321",
                            color: "white",
                            border: "none",
                            padding: "12px 28px",
                            borderRadius: "50px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        View Menu
                    </button>

                </div>

            </div>

            {/* Explore Menu */}
            <div id="explore-menu">

                <ExploreMenu
                    category={category}
                    setCategory={setCategory}
                />

            </div>

            {/* Food Items */}
            <FoodDisplay
                category={category}
            />
            <AppDownload />   
        </div>
    );
};

export default Home;