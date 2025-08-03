
import jwt from 'jsonwebtoken'
import dishModel from '../../modal/cart.js';
import admin from '../../modal/admin.js';
import restaurant from './restaurant.js';


let cart_detail = async(req ,res ) =>{
    let {token} = req.params;
    let email = jwt.decode(token)
    
   
    try{

    
    let result = await dishModel.find({user_id: email.email});
    console.log(result, email )
    
    if(result){
        
        let result2 =  await dishModel.aggregate([
            {$match:{user_id: email.email}},
            {
                $group:{
                    _id: null,
                     total:{$sum: "$price"},
                     count:{$sum: "$count"}
                }
            }

    ])
   
    let result1 = await admin.findById(result[0].restaurant);
   
    let total  = result2[0].total * result2[0].count;
     
        if(result ){
        
            res.send({success: true, restaurant: result1, dish: result,  total: total })
        }
        else{
            res.send({success: false,  message: "no data found"})
        }

    }
}catch(err){
    console.log(err.message)
}
   
}
export default cart_detail;