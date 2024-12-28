import dish_Model from "../../modal/dish.js";



let dish_fetch = async(req ,res ) =>{
    let {id} = req.params;
    
    let result = await dish_Model.find({id: id});
    if(result.length > 0){
        res.send({success: true,  data: result})
    }
    else{
        res.send({success: false,  message: "no data found"})
    }
}
export default dish_fetch;