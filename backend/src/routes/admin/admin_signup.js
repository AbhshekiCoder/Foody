import express from 'express';
import register_admin from  '../../controller/admin/register_admin.js';
import upload from '../../middleware/upload.js';

const admin_signup = express.Router();




admin_signup.post('/admin_signup', upload.single('file'),  register_admin);
export default admin_signup;