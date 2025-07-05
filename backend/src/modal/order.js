import mongoose from 'mongoose';
import { type } from 'os';

let orderSchema = new mongoose.Schema({
    name:{
        type: Array
    },
    restaurant:{
        type: String

    },
    address:{
        type: String
    },
    user:{
        username:{
            type: String
        },
        email:{
            type: String
        },
        phone:{
            type: Number
        }
    },
    status:{
        type: String,
        enum: ['created', 'completed'],
        default: 'created'

    },
    price:{
        type: String
    },
    dishes:{
        type: Array
        

    }
    

})

let orderModel = mongoose.model("Order", orderSchema);

export default orderModel