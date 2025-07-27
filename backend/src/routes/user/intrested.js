import express from 'express';
import authenticateToken from '../../middleware/authentication.js';
import interested from '../../controller/userControllers/interested.js';


const intrestedRoutes = express.Router();

intrestedRoutes.post('/interested', authenticateToken, interested)

export default intrestedRoutes;