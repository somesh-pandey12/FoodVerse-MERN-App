// File Location: frontend/src/components/FoodDisplay/FoodDisplay.jsx

import React, {
    useContext
} from "react";

import "./FoodDisplay.css";

import {
    StoreContext
} from "../../context/StoreContext";

import FoodItem
    from "../FoodItem/FoodItem";

import FoodSkeleton
    from "../FoodSkeleton/FoodSkeleton";

const FoodDisplay = ({
    category
}) => {

    const {
        food_list
    } = useContext(
        StoreContext
    );

    const styles = {

        display: {
            marginTop: "30px",
            padding: "0 4vw"
        },

        title: {
            fontSize:
                "max(2vw, 24px)",

            fontWeight: "600",

            color: "#262626"
        },

        list: {
            display: "grid",

            gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",

            gap: "30px",

            marginTop: "30px"
        }
    };

    return (

        <div
            className="food-display"
            style={styles.display}
            id="food-display"
        >

            <h2 style={styles.title}>
                Top dishes near you
            </h2>

            <div
                className="food-display-list"
                style={styles.list}
            >

                {/* Loading Skeleton */}
                {food_list.length === 0 ? (

                    Array.from({
                        length: 8
                    }).map(
                        (_, index) => (

                        <FoodSkeleton
                            key={index}
                        />
                    ))

                ) : (

                    food_list.map(
                        (
                            item,
                            index
                        ) => {

                        if (
                            category ===
                                "All" ||

                            category ===
                                item.category
                        ) {

                            return (

                                <FoodItem
                                    key={index}

                                    id={
                                        item._id
                                    }

                                    name={
                                        item.name
                                    }

                                    description={
                                        item.description
                                    }

                                    price={
                                        item.price
                                    }

                                    image={
                                        item.image
                                    }
                                />
                            );
                        }

                        return null;
                    })
                )}

            </div>

        </div>
    );
};

export default FoodDisplay;