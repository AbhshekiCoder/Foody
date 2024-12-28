import admin from "../../modal/admin.js";


let restaurant = async(req, res)=>{
    let {id} = req.params;

    let result = await admin.findOne({_id: id});
    if(result){
        res.send({success: true, data: result});
    }
    else{
        res.send({success: false, message: "data not found"})
    }

}

export default restaurant;