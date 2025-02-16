
import jwt from 'jsonwebtoken'
import dishModel from '../../modal/cart.js';
import admin from '../../modal/admin.js';


let cart_detail = async(req ,res ) =>{
    let {token} = req.params;
    let email = jwt.decode(token)
    
    let result = await dishModel.find({user_id: email.email});
    
    if(result.length > 0){
        let result1 = await admin.findOne({_id: result[0].restaurant});
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
        console.log(result2)
        if(result.length > 0){
            res.send({success: true,  dish: result, restaurant: result1, total: total })
        }
        else{
            res.send({success: false,  message: "no data found"})
        }

    }
   
}
export default cart_detail;