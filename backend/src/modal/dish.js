import mongoose from "mongoose";
import { type } from "os";


let dish_Sechema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    image:{
        
        
    },
    id:{
        type: mongoose.Schema.Types.ObjectId, ref: "Admin",
        require: true
    },
    restaurant_name:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    }
})

let dish_Model = mongoose.model('dish', dish_Sechema);

export default dish_Model;