import express from 'express';
import dishSearch from '../../controller/fetch/dishSearch.js';


let dish_search = express.Router();

dish_search.get('/dish_search/:id', dishSearch);

export default dish_search;