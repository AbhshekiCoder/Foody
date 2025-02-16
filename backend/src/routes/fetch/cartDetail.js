import express from 'express';
import cart_detail from '../../controller/fetch/cartDetail.js';


let cartDetail = express.Router();

cartDetail.get('/cartDetail/:token',  cart_detail);

export default cartDetail;