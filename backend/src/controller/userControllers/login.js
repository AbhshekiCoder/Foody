import user_modal from "../../modal/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from  'dotenv';

dotenv.config();

let user_login = async(req, res)=>{
    console.log(process.env.JWT_SECRET)
    let {email, password} = req.body;
    console.log(email)
    try{
       let user =  await user_modal.findOne({email: email});
       if(!user){
        res.send({success: false, message: "you are not registered"});
        return;
       }
       else{
        let result =  await user_modal.findOne({email: email});
         let hash = await bcrypt.compare(password, result.password);
         if(hash){
          
           let token =  jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: "1hr"} );
           res.status(200).send({success: true, message: "login successfully", token: token});
          

         }
        else{
            res.send({success: false, message: "invalid email or password"})
        }
       }
    }catch(err){
        res.send({message: err.message});
    }
    
}
export default user_login;