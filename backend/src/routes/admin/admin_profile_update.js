import express from 'express';

import upload from '../../middleware/upload.js';
import AdminProfileUpdate from '../../controller/admin/admin_profile_update.js';

const admin_profile_update = express.Router();




admin_profile_update.post('/admin_profile_update', upload.single('file'), AdminProfileUpdate  );
export default admin_profile_update;