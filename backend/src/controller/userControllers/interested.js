import interestedModel from "../../modal/interested.js";
import jwt from "jsonwebtoken";


const interested = async(req, res) =>{
    const {id, token} = req.body;
    
    const email = jwt.decode(token);
 
 try{
    const result = await interestedModel.findOne({$and:[{restaurant: id, user_id: email.email}]});
    console.log(result);
    if(result){
        const result1 = await interestedModel.deleteOne({$and:[{restaurant: id, user_id: email.email}]});

        res.send({success: false, message: "successfully updated", data: result})
    
        
    }
    else{
        console.log("hello")
            let obj = new interestedModel({
                restaurant: id,
                user_id: email.email
            })
            const result = await obj.save()
            if(result){
                res.send({success: true, message: "successfully updated"})
            }
        }
}catch(err){
    console.log(err.message)
}
}
    export default interested;

