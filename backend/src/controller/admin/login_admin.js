import express from 'express';
import admin_modal  from '../../modal/admin.js';


let login_admin = async(req, res)=>{
    let {email, password} = req.body;

    try{
        let result = await admin_modal.findOne({$and:[{email: email, password: password}]});
        if(result){
            res.send({success: true, message: "login successfully", id: result._id})
        }
        else{
            res.send({success: false, message: "invalid email or password"});
        }
    }catch(err){
        console.log(err.message);
    }

}

export default login_admin;