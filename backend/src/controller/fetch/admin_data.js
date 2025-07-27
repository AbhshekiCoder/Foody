import admin from "../../modal/admin.js";


const admin_data = async(req, res) =>{
    const {id} = req.params;
    
    try{
    const result = await admin.findById(id)
    console.log(result)
    if(result){
        res.send({success: true, data: result});
    }
}catch(err){
    console.log(err.message)
}

}

export default admin_data;