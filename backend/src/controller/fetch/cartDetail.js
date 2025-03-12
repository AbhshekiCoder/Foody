
import jwt from 'jsonwebtoken'
import dishModel from '../../modal/cart.js';
import admin from '../../modal/admin.js';


let cart_detail = async(req ,res ) =>{
    let {token} = req.params;
    let email = jwt.decode(token)
    try{

    
    let result = await dishModel.findOne({user_id: email.email});
    
    if(result){
        let result1 = await admin.findOne({restaurant_name: result.restaurant   });
       
        let result2 =  await dishModel.aggregate([
            {$match:{user_id: email.email}},
            {
                $group:{
                    _id: null,
                     total:{$sum: "$price"},
                     count:{$sum: 1}
                }
            }

    ])

    let total  = result2[0].total * result2[0].count;
       
        if(result.length > 0){
            res.send({success: true,  dish: result, restaurant: result1, total: total })
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