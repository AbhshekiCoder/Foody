import express from 'express'
import dish_fetch from '../../controller/fetch/dish_fetch.js';


let restaurant_data = express.Router();

restaurant_data.get('/dish/:id',  dish_fetch)

export default restaurant_data;