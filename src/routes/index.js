import express from 'express';
import axios from 'axios';

import wrap from '../middlewares/wrap';
import sampleRoute from './api/sampleRoute';
import updateDataFeed from './api/updateDataFeed';
import checkAddressBalance from './api/checkAddressBalance';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Bitbox Express Boilerplate"
    });
}));

router.use('/sample', sampleRoute);
router.use('/api', updateDataFeed);
router.use('/balance', checkAddressBalance);

export default router;
