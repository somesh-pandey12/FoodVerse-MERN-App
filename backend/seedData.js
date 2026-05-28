// File Location: backend/seedData.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

const dummyFoods = [
  { name: "Greek Salad", description: "Fresh crunchy greens with feta cheese and premium olive oil dressing", price: 140, category: "Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
  { name: "Veg Caesar Salad", description: "Crisp romaine lettuce tossed with creamy signature Caesar dressing", price: 160, category: "Salad", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400" },
  { name: "Avocado Garden Salad", description: "Rich buttery avocado slices with garden fresh organic vegetables", price: 210, category: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
  { name: "Cheese Spring Roll", description: "Golden crispy fried sheets stuffed with mixed vegetables and gooey melted cheese", price: 120, category: "Rolls", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
  { name: "Spicy Kathi Roll", description: "Flaky paratha loaded with spicy chunks of veggies and tangy green chutney", price: 110, category: "Rolls", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400" },
  { name: "Chocolate Lava Cake", description: "Warm chocolate cake with a rich oozing molten chocolate core center", price: 180, category: "Deserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
  { name: "Red Velvet Pastry", description: "Layered sponge cake topped with premium rich cream cheese frosting layers", price: 150, category: "Deserts", image: "https://images.unsplash.com/photo-1586040140378-b5634cb4c8fc?w=400" },
  { name: "Classic Club Sandwich", description: "Double decker toasted bread loaded with crisp lettuce, tomato, and fresh herb spread", price: 130, category: "Sandwich", image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=400" },
  { name: "Grilled Paneer Sandwich", description: "Spiced tandoori paneer slices grilled over buttered sourdough sheets", price: 150, category: "Sandwich", image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400" },
  { name: "Premium Vanilla Cake", description: "Classic Madagascar vanilla bean sponge cake layered with rich butter-cream frosting", price: 450, category: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { name: "Strawberry Bliss Cake", description: "Fluffy cake embedded with fresh seasonal strawberry syrup pulp compote", price: 490, category: "Cake", image: "https://images.unsplash.com/photo-1464349172904-c5966c999313?w=400" },
  { name: "Paneer Tikka Masala", description: "Juicy tandoori paneer cubes simmered gently inside rich aromatic tomato gravy", price: 280, category: "Pure Veg", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" },
  { name: "Dal Makhani Grand", description: "Slow cooked black lentils enriched overnight using fresh churned white butter", price: 240, category: "Pure Veg", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
  { name: "White Sauce Pasta", description: "Penne pasta enveloped inside velvety parmesan cream reduction with bell peppers", price: 190, category: "Pasta", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400" },
  { name: "Arrabbiata Red Pasta", description: "Fiery spicy Italian plum tomato sauce pasta infused using garlic flakes", price: 180, category: "Pasta", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400" },
  { name: "Hakka Noodles", description: "Wok-tossed stir-fried chinese noodles layered with crisp julienned seasonal veggies", price: 140, category: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
  { name: "Schezwan Noodles", description: "Spicy thin wheat noodles tossed in hot home-brewed authentic red Schezwan pepper pod paste", price: 160, category: "Noodles", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400" },
  { name: "Crunchy Coleslaw Salad", description: "Finely shredded purple cabbage with house special sweet mayo dip base dressing", price: 120, category: "Salad", image: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?w=400" },
  { name: "Mexican Salsa Wrap", description: "Soft tortilla packed tightly with refried beans, sweet corn, and hot tomato salsa", price: 140, category: "Rolls", image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400" },
  { name: "Blueberry Cheesecake Slice", description: "Classic dense cold-set cheesecake layer with sweet wild blueberry coulis layout topping", price: 220, category: "Deserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
  { name: "Corn and Cheese Sandwich", description: "Juicy golden sweet kernels combined with shredded mozzarella inside pan-toasted edges", price: 110, category: "Sandwich", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400" },
  { name: "Black Forest Cake", description: "Traditional German chocolate sponge layered with sweet cherries and rich whipped cream", price: 470, category: "Cake", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400" },
  { name: "Malai Kofta Deluxe", description: "Fried paneer potato dumplings floating softly within rich sweet cashew nut cream curry", price: 290, category: "Pure Veg", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400" },
  { name: "Pesto Basil Pasta", description: "Fusilli pasta coated evenly inside aromatic green fresh basil leaf pine nut paste infusion", price: 210, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" },
  { name: "Chili Garlic Noodles", description: "Hot fiery standard string noodles stir fried with dry red chilis and crushed garlic cloves", price: 150, category: "Noodles", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400" }
];

const seedDatabase = async () => {
  try {
    // MongoDB connect karo (Apne process.env variables verify rakhna)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("⚡ Database Node Anchored Successfully for Seeding...");

    // Safe clear to avoid infinity duplicate lists
    const count = await foodModel.countDocuments();
    if (count > 15) {
        console.log("⚠️ Database catalog has ample data already. Aborting duplicate seed injection.");
        process.exit();
    }

    // Direct Bulk insertion array pipeline
    await foodModel.insertMany(dummyFoods);
    console.log("🎯 Successful! 25 Premium Food catalog records injected into MongoDB!");
    
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Operation Failed miserably:", error);
    process.exit(1);
  }
};

seedDatabase();