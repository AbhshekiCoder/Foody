import path from "path";
import dish_Model from "../../modal/dish.js";
import fs from 'fs';
import { fileURLToPath } from "url";
import { response } from "express";
import admin from "../../modal/admin.js";



let dish = async(req, res) =>{
    let {name, description, id, type, price} = req.body;
  
     let result1 = await  admin.findById(id);
 
     let _filename = fileURLToPath(import.meta.url); 
     let __dirname = path.dirname(_filename)
    let dish = new dish_Model( {
        name: name,
        description: description,
        image:  fs.readFileSync(path.join(__dirname, '/images/' + req.file.filename)),
        id: result1._id,
        restaurant_name: result1.restaurant_name,
        type: type,
        price: price
    })

    let result = await dish.save();
    if(result){
        res.send({success: true, message: "Successfully updated"})
    }
    else{
        res.send({success: false, message: "something went wrong"});
    }

}


export default dish;