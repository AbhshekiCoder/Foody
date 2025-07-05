import express from 'express';
import dishModel from '../../modal/cart.js';
import jwt from 'jsonwebtoken';

let Carts = async(req, res) =>{
    let {name, restaurant, dish_id, token, count, price } = req.body;
    let email = jwt.decode(token);
    console.log(name,email)
  
    try{
        let cart = new dishModel({
            name: name,
            restaurant: restaurant,
            dish_id: dish_id,
            user_id: email.email,
            count: 1,
            price: price
        });
        if(count == 0){
            let data = await dishModel.deleteOne({$and:[{user_id: email.email}, {dish_id: dish_id}]});
            res.send({success: false})
            return;
        }
        //✅ Check if the user has a cart item for this restaurant
let existingDish = await dishModel.findOne({ user_id: email.email, restaurant: restaurant });

if (!existingDish) {
  // 🔄 New restaurant: delete all old dishes from other restaurant
  await dishModel.deleteMany({ user_id: email.email });

  // Save the new dish
  await cart.save();
  res.send({ success: true, data: cart });
} else {
  // ✅ Restaurant already in cart: update or insert
  let updated = await dishModel.updateOne(
    { user_id: email.email, dish_id: dish_id  },
    { $set: { count: count, name: name, restaurant, price } },
    { upsert: true }
  );

  let result2 = await dishModel.findOne({ user_id: email.email, dish_id: dish_id });
  if (result2) {
    res.send({ success: true, data: result2 });
  } else {
    res.send({ success: false });
  }
}
    }catch(err){
        console.log(err.message)
    }

}
export default Carts;