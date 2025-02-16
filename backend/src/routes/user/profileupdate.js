import express from 'express'
import authenticateToken from '../../middleware/authentication.js';
import profileUpdate from '../../controller/userControllers/profileUpdate.js';

let profileupdate = express.Router();
profileupdate.post('/profileUpdated', authenticateToken, profileUpdate);

export default profileupdate;