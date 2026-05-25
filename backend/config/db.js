import mongoose from "mongoose";
import 'dotenv/config'; // Ye line zaroor add karein agar server.js mein nahi hai

export const connectDB = async () => {
    try {
        // process.env.MONGODB_URI ka use karein
        await mongoose.connect(process.env.MONGO_URI || "mongodb://somupandey730_db_user:Somesh123@ac-w5pniit-shard-00-00.j0rbypg.mongodb.net:27017,ac-w5pniit-shard-00-01.j0rbypg.mongodb.net:27017,ac-w5pniit-shard-00-02.j0rbypg.mongodb.net:27017/?ssl=true&replicaSet=atlas-nkrswh-shard-0&authSource=admin&appName=Cluster0");
        console.log("✅ DB Connected Successfully!");
    } catch (error) {
        console.log("❌ DB Connection Failed! Error: ", error.message);
        console.log("👉 Tip: MongoDB Atlas me check karo Network Access me 'Allow Access From Anywhere (0.0.0.0/0)' ON hai ya nahi.");
    }
}