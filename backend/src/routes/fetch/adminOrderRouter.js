import express from 'express';
import adminOrder from "../../controller/fetch/adminOrder.js";


const adminOrderRouter = express.Router();

adminOrderRouter.get('/:id', adminOrder);

export default adminOrderRouter