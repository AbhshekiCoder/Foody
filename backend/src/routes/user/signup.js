import express from 'express';
import register_user from '../../controller/userControllers/register.js';

const userrouter = express.Router();

userrouter.post('/signup', register_user);
export default userrouter;