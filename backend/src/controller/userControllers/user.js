import user_modal from "../../modal/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from  'dotenv';

dotenv.config();

let user_name = async(req, res)=>{
    let {token} = req.body;

    let email = jwt.decode(token);

    try{
        console.log(email)
        let result = await user_modal.findOne({email: email.email});
        if(result){
            res.status(200).send(result)
        }
      
    }catch(err){
        console.log(err.message)
    }



}
export default user_name;