import mongoose from "mongoose";


const interestedSchema =  new mongoose.Schema({
    user_id:{
        type: String,
        require: true
    },
    restaurant:{
        type: String,
        require: true
    },
   

})

const interestedModel = mongoose.model("interested", interestedSchema);

export default interestedModel;