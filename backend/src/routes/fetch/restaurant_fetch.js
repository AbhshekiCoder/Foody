import express from 'express';
import restaurant from '../../controller/fetch/restaurant.js';




let restaurant_fetch = express.Router();

restaurant_fetch.get('/restaurant/:id',  restaurant);

export default restaurant_fetch;