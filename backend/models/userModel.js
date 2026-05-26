import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            default: ""
        },

        googleId: {
            type: String,
            default: ""
        },

        // Stores cart items like:
        // { "item_id_123": 2 }
        cartData: {
            type: Object,
            default: {}
        }
    },
    {
        minimize: false,
        timestamps: true
    }
);

const userModel =
    mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;