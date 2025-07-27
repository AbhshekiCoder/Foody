import  express from 'express';
import admin_data from '../../controller/fetch/admin_data.js';

const adminRouter = express.Router();

adminRouter.get('/:id', admin_data);

export default adminRouter;