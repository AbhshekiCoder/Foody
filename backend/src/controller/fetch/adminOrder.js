import orderModel from "../../modal/order.js";



const adminOrder = async(req, res) =>{
    const {id} = req.params;
    console.log(id)
    try{
    const result = await orderModel.find({restaurant: id});
    console.log(result)
    if(result){
        res.send({success: true, data: result})
    }
}catch(err){
    res.send({success: false, message: err.message})
}
    
}

export default adminOrder;