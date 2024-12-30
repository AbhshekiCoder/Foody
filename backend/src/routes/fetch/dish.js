import express from 'express';
import dish from '../../controller/fetch/dish.js';

let dishes = express.Router();

dishes.post('/dishes', dish);

export default dishes;