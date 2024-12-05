import express from 'express';
import user_modal from '../../modal/user.js';



const register_user = async(req, res)=>{
    try{
        let {name, phone, email, password} = req.body;
        let User = new user_modal({
             phone: phone,
             name: name,
             email: email,
             password: password
        })
       
        await User.save();

       
       
       
            res.status(200).send({success: true, message: "registration successfully"})
        
       
    }catch(err){
        res.status(500).send({message: err.message})
    }
}
export default register_user;