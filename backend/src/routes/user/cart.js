import express from 'express';

import Carts from '../../controller/userControllers/Carts.js';
import authenticateToken from '../../middleware/authentication.js';


let cart = express.Router()

cart.post('/cart', authenticateToken, Carts);
export default cart;