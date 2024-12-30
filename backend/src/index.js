import express from 'express';
import dotenv from 'dotenv';
import mongodbConnect from './config/ConnectDB.js';
import mongoose from 'mongoose';
import userrouter from './routes/user/signup.js';
import userlogin from './routes/user/signin.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import username from './routes/user/userdetail.js';
import admin_signup from './routes/admin/admin_signup.js';
import admin_signin from './routes/admin/admin_signin.js';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import dish_fetch from './routes/admin/dish.js';
import dishes from './routes/fetch/dish.js';
import Search from './routes/fetch/search.js';
import dish_search from './routes/fetch/dishSearch.js';
import restaurant_fetch from './routes/fetch/restaurant_fetch.js';
import restaurant_data from './routes/fetch/restaurant_data.js';

let app = express();
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


mongodbConnect()
let _filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(_filename)

app.use('/signup', userrouter)
app.use('/login', userlogin)
app.use('/user', username)
app.use('/admin_signup', admin_signup); 
app.use('/admin_signin', admin_signin)
app.use('/dish_fetch', dish_fetch)
app.use('/dishes', dishes)
app.use('/search', Search)
app.use('/dish_search/:id', dish_search)
app.use('/restaurant/:id', restaurant_fetch)
app.use('/dish/:id', restaurant_data)

app.get('/', (req, res)=>{
    res.send("hello")
})

app.listen(process.env.PORT, ()=>{
    console.log("connected")
})