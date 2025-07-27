import orderModel from "../../modal/order.js";
import jwt from 'jsonwebtoken'


let order = async(req, res)=>{
    let {token} = req.params;
    let email = jwt.decode(token)

    let result = await orderModel.find({'user.email': email.email})
    if(result){
        res.send({success: true, data: result});
    }
    else{
        res.send({success: false, message: "data not found"})
    }

}

export default order;