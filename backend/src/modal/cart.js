import mongoose from "mongoose";






let dishschema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    dish_id:{
        type: mongoose.SchemaTypes.ObjectId, ref: 'dish',
        require: true
    },
    restaurant:{
        type: String,
        require: true

    },
    user_id:{
        type: String,
        require: true
    },
    count:{
        type: Number
    },
    price:{
        type: Number
    }
}) 

let dishModel = mongoose.model('cart', dishschema);

export default dishModel;