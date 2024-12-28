import express from 'express';
import user_name from '../../controller/userControllers/user.js';

let username = express.Router()

username.post('/user',  user_name);

export default username;