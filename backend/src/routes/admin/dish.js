import express from 'express';
import upload from '../../middleware/upload.js';
import dish from '../../controller/admin/dish.js';



let dish_fetch = express.Router();

dish_fetch.post('/dish_fetch', upload.single('file'), dish );

export default dish_fetch;