import express from 'express';
import search from '../../controller/fetch/search.js';


let Search = express.Router();
Search.post('/search', search);

export default Search;