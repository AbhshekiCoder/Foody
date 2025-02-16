import express from 'express';
import authenticateToken from '../../middleware/authentication.js';
import Order from '../../controller/userControllers/order.js';


let order = express.Router()

order.post('/order',  Order );
export default order;