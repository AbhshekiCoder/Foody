import express from 'express';
import dishModel from '../../modal/cart.js';
import jwt from 'jsonwebtoken';

let Carts = async(req, res) =>{
    let {name, restaurant, dish_id, token, count, price } = req.body;
    let email = jwt.decode(token);
    console.log(price)
  
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
        let result = await dishModel.findOne({$and:[{user_id: email.email}, {dish_id: dish_id}]})
        if(!result){
            
            let result1 = await cart.save();
         
            if(result1){
                res.send({success: true, data: result1});
            }
        }
        else{
            let result = await dishModel.updateOne({user_id: email.email, dish_id: dish_id}, {$set:{count: count}})
            if(result){
                let result2 = await dishModel.findOne({$and:[{user_id: email.email}, {dish_id: dish_id}]});
                if(result2){
                    console.log(result2)
                    res.send({success: true, data: result2})

                }
                
            }
        }
    }catch(err){
        console.log(err.message)
    }

}
export default Carts;