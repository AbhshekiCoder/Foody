import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from '../../modal/admin.js';
import fs, {readFileSync} from 'fs'


let AdminProfileUpdate = async(req, res) =>{
    let {address, id } = req.body;
     let _filename = fileURLToPath(import.meta.url); 
     let __dirname = path.dirname(_filename);
   
    try{
        let result = await admin.findByIdAndUpdate(id, {address: address, image: fs.readFileSync( path.join(__dirname, '/images/' + req.file.filename)), type: req.file.mimetype})
       if(result){
           res.status(200).send({success: true, message: "Successfully Updated"});
        }
        else{
          res.status(500).send({success: false, message: "Something went wrong"})
        }

     }catch(err){
      console.log(err.message)
     }
     

}
export default AdminProfileUpdate;
