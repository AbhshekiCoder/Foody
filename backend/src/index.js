import express from 'express';
import dotenv from 'dotenv';
import mongodbConnect from './config/ConnectDB.js';
import mongoose from 'mongoose';
import userrouter from './routes/user/signup.js';
import bodyParser from 'body-parser';
let app = express();
dotenv.config()

app.use(bodyParser.json())


mongodbConnect()

app.use('/signup', userrouter)
app.get('/', (req, res)=>{
    res.send("hello")
})
app.listen(process.env.PORT, ()=>{
    console.log("connected")
})