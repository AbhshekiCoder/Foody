import express from 'express';
import admin_modal  from '../../modal/admin.js';
import bcrypt from 'bcrypt';
import fs, { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sendPassword from '../../middleware/sendPassword.js'







const register_admin = async ( req, res)=>{
    try{
        let {name, phone, email, restaurant_name, file} = req.body;
             let _filename = fileURLToPath(import.meta.url); 
             let __dirname = path.dirname(_filename)

          let result = await   admin_modal.findOne({email: email})
          if(result){
            console.log(result)
            res.send({success: false, message: "email already registered" });
          }
          else{
            console.log("jkdjd")
            
   
         
         
          
          
         
           let password = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    for(let i = 0; i<6; i++){
        let num = Math.floor(Math.random() * characters.length);
        password += characters[num];
    }
           let htmlContent = `<p>Diggy<p>
           <div>this is your password for access admin pannel id is same as your email</div>
           <div>
            password: ${password}
           </div>
            `
      

        
         await sendPassword(email, "password", htmlContent);
          
          
          
            let Admin = new admin_modal({
                phone: phone,
                name: name,
                email: email,
                restaurant_name: restaurant_name,
                image: fs.readFileSync( path.join(__dirname, '/images/' + req.file.filename)),
                password: password
                
           })
          let result2 = await Admin.save();
          if(result2){
            
           res.send({success: true, message: "successfully registered your id and password send with your email"});
          }
          
          
          else{
          
           res.status(200).send({success: false, message: "Something went wrong"})
          }
          
           

          
          }
    
    }catch(err){
        res.status(500).send({message: err.message})
        console.log(err.message)
    }

}
export default register_admin;