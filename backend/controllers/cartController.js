// File Location: backend/controllers/cartController.js
import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData || {};
      
      const { itemId } = req.body;
      if (!cartData[itemId]) {
         cartData[itemId] = 1;
      } else {
         cartData[itemId] += 1;
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error adding to cart" });
   }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData || {};
      
      const { itemId } = req.body;
      if (cartData[itemId] > 0) {
         cartData[itemId] -= 1;
         if (cartData[itemId] === 0) {
            delete cartData[itemId];
         }
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error removing from cart" });
   }
};

// Get user cart data
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData || {};
      res.json({ success: true, cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching cart" });
   }
};

export { addToCart, removeFromCart, getCart };