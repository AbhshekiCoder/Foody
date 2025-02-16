import user_modal from "../../modal/user.js";
import jwt from 'jsonwebtoken'

let profileUpdate = async(req, res) =>{
    let {phone, email, token} = req.body;
    let user = jwt.decode(token);
    
    try{
        if(!email && phone){
            console.log("hello")
            try{
                let result = await user_modal.updateOne(
                    {email: user.email},
                    {
                    $set:{
                       
                        phone: phone
        
                    }
                }
                )
                let userdata = await user_modal.findOne({email: user.email})
                if(result){

                    res.status(200).send({success: true, message: "Successfully Updated", data: userdata})
                   
                }
                else{
                  
                    res.status(400).send({success: false, message: "something went wrong"})
        
                }
    

            }catch(err){
                console.log(err.message)
            }
           
        }
       
        else{
            let result = await user_modal.updateOne(
                {email: user.email},
                {
                $set:{
                   
                    email: email    
                }
            }
            )
            let userdata = await user_modal.findOne({email: user.email})
            if(result){
                res.status(200).send({success: true, message: "Successfully Updated", data: userdata})
            }
            else{
                res.status(400).send({success: false, message: "something went wrong"})
    
            }

        }
        
    }
    catch(err){
        res.status(500).send(err.message)
        console.log(err.message)
    }

}
export default profileUpdate;