import {mongoose} from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();
let url = process.env.URL;
console.log(url)

function mongodbConnect(){
    mongoose.connect("mongodb+srv://projects:123456ytrewq@cluster0.0qqnloi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Tech_Temple").then(()=>{
        console.log('connected');



        
    }).catch((err)=>{
        console.log(err.message);
    })

}
    
    


    export default mongodbConnect;