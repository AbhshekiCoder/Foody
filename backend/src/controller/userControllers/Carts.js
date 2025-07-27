import express from 'express';
import dishModel from '../../modal/cart.js';
import jwt from 'jsonwebtoken';

let Carts = async (req, res) => {
    let { name, restaurant, dish_id, token, count, price } = req.body;
    let email = jwt.decode(token);

    try {
        if (count === 0) {
            // ❌ Delete dish if quantity is 0
            await dishModel.deleteOne({ user_id: email.email, dish_id });
            return res.send({ success: true, message: "Dish removed" });
        }

        // ✅ Check if user already has dish from same restaurant
        let existingDish = await dishModel.findOne({ user_id: email.email, restaurant });

        if (!existingDish) {
            // 🧹 New restaurant: clear previous dishes
            await dishModel.deleteMany({ user_id: email.email });

            // ✅ Add new dish with correct count
            let cart = new dishModel({
                name,
                restaurant,
                dish_id,
                user_id: email.email,
                count, // ✅ FIXED HERE
                price
            });

            await cart.save();
            return res.send({ success: true, data: cart });
        } else {
            // 🔁 Update count for same restaurant dish
            await dishModel.updateOne(
                { user_id: email.email, dish_id },
                { $set: { count, name, restaurant, price } },
                { upsert: true }
            );

            let updated = await dishModel.findOne({ user_id: email.email, dish_id });
            return res.send({ success: true, data: updated });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ success: false, message: "Server error" });
    }
};

export default Carts;
