import dish_Model from "../../modal/dish.js";


let dish = async(req, res)=>{
    let result = await dish_Model.find();
    if(result){
        res.send(result);
    }
    else{
        res.send("Something went wrong")
    }

}
export default dish;