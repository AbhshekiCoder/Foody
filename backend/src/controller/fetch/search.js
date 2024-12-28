import express, { response } from 'express';
import dish_Model from '../../modal/dish.js';
import admin from '../../modal/admin.js';






let search = async(req, res) =>{
    let {input} = req.body;
    let data = input.toUpperCase();
    console.log(data)
    
   let result = await dish_Model.find();
   let array1 = [];
   if(result.length > 0){
   
    let array1 = result.filter(Element => Element.name.toUpperCase().includes(data));
    if(array1.length > 0){
        res.send({success: true, data: array1})

    }
    else{
        let result = await admin.find();
        if(result){
            let array = result.filter(Element => Element.restaurant_name.toUpperCase().includes(data));
            if(array.length > 0){
                res.send({success: true, data: array});
            }
            else{
                res.send({success: false, message: "data not found"})
            }
        }
        
    }
    
    

   }
   else{
    res.send({success: false, message: "data not found"})
   }

}
export default search