import express from 'express';
import login_user from '../../controller/userControllers/login.js';

let userlogin = express.Router()

userlogin.post('/login', login_user);
export default userlogin;