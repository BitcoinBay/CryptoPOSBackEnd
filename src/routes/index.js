import express from 'express';

import wrap from '../middlewares/wrap';
import sampleRoute from './api/sampleRoute';
import updateDataFeed from './api/updateDataFeed';
import checkAddressBalance from './api/checkAddressBalance';
import generateBCHAddress from './api/generateBCHAddress';
import generateBTCAddress from './api/generateBTCAddress';
import generateETHAddress from './api/generateETHAddress';
import users from './api/users';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Bitbox Express Boilerplate"
    });
}));

router.use('/generateBTC', generateBTCAddress);
router.use('/generateBCH', generateBCHAddress);
router.use('/generateETH', generateETHAddress);
router.use('/sample', sampleRoute);
router.use('/datafeed', updateDataFeed);
router.use('/balance', checkAddressBalance);
router.use('/users', users);

export default router;
