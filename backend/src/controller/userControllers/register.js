import express from 'express';
import user_modal from '../../modal/user.js';
import bcrypt from 'bcrypt';




const register_user = async(req, res)=>{
    try{
        let {name, phone, email, password} = req.body;
        let hash = await bcrypt.hash(password, 10);
        let User = new user_modal({
             phone: phone,
             name: name,
             email: email,
             password: hash
        })
       let result = await user_modal.findOne({email: email});
      
       if(result){
       
        res.send({success: false, message: "your are already registered"});
        
       }
       else{
        await User.save();
        res.status(200).send({success: true, message: "registration successfully"})
       }
       
        
       
    }catch(err){
        res.status(500).send({message: err.message})
    }
}
export default register_user;