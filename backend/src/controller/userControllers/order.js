import express from 'express';
import orderModel from '../../modal/order.js';
import razorpay from 'razorpay'
import dishModel from '../../modal/cart.js';


const razorpayInstance = new razorpay({
    key_id: "rzp_test_pEZdDpwnJejkWR",
    key_secret: "YVC6HQFJ8OJGeFq6MNzCzjEN",
  });
  
let Order  = async(req, res) =>{
    let {name, email, phone, address, price, username, dish, restaurant} = req.body;
    console.log(name)
    try{
        const options = {
            amount: price * 100, // Amount in paise (500.00 INR)
            currency: "INR",
            receipt: "receipt#1",
          };
         
        let order = await razorpayInstance.orders.create(options);
        console.log(order)
        if(order){
            let obj = new orderModel ({
                name: name,
                restaurant: restaurant,
                address: address,
                user:{username: username, email: email, phone: phone},
                price: price,
                dishes: dish
        
            })
        
            let result = obj.save();
            if(result){
                res.send({success: true,  data: order});
                let result = await dishModel.deleteMany({$and:[{user_id: email}, {restaurant: restaurant}]})
                
            }
            else{
                res.send({success: false, message: "Something Went Wrong"})
            }
    
        
        
    }
   

    }catch(err){
        console.log(err.message)
    }
}

export default Order;