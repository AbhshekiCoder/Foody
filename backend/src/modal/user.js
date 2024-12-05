import mongoose from "mongoose";


let register_Schema = new mongoose.Schema({
    phone:{
        type: String
    },
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

let user_modal = mongoose.model('User', register_Schema)
export default user_modal;