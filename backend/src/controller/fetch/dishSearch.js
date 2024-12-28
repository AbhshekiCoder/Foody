import dish_Model from "../../modal/dish.js";



let dishSearch = async(req, res)=>{
    let {id} = req.params;
    console.log(id)
    let result = await dish_Model.find({name: id});
    if(result.length > 0){
        console.log(result)
        res.send({success: true, data: result});
    }
    else{
        res.send({success: false, message: "data not found"});
    }


}

export default dishSearch;