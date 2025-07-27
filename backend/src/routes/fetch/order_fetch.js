import express from 'express'
import authenticateToken from '../../middleware/authentication.js';
import order from '../../controller/fetch/order.js';


const order_fetch = express.Router();

order_fetch.get('/orderFetch/:token', authenticateToken, order)
export default order_fetch