import React from 'react';
import './ExploreMenu.css';


const demo_menu_list = [
  { menu_name: "Salad", menu_image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150" },
  { menu_name: "Rolls", menu_image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=150" },
  { menu_name: "Deserts", menu_image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150" },
  { menu_name: "Sandwich", menu_image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=150" },
  { menu_name: "Cake", menu_image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150" },
  { menu_name: "Pure Veg", menu_image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150" },
  { menu_name: "Pasta", menu_image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150" },
  { menu_name: "Noodles", menu_image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=150" }
];

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience.</p>
      <div className="explore-menu-list">
        {demo_menu_list.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className='explore-menu-list-item'
            >
              <img 
                className={category === item.menu_name ? "active" : ""} 
                src={item.menu_image} 
                alt={item.menu_name} 
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;