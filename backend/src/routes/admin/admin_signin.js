import express from 'express';
import login_admin from  '../../controller/admin/login_admin.js';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const admin_signin = express.Router();

admin_signin.post('/admin_signin', login_admin )
export default admin_signin;