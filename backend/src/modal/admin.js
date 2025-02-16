import mongoose from "mongoose";
import { type } from "os";


let adminSchema =  new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    phone:{
        type: Number,
        require: true
    },
    restaurant_name:{
        type: String,
        require: true
    },
    image:{
        
    },
    password:{
        type: String
    },
    address:{
        type: String,
        default: ""
    },
    type:{
        type: String,
        default: ""
    }


})

let admin = mongoose.model('admin', adminSchema);

export default admin;