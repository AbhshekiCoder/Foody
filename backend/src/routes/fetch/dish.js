import express from 'express';
import dish from '../../controller/fetch/dish.js';
import authenticateToken from '../../middleware/authentication.js';

let dishes = express.Router();

dishes.post('/dishes',  dish);

export default dishes;