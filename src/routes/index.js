import express from 'express';

import wrap from '../middlewares/wrap';
import sampleRoute from './api/sampleRoute';
import updateDataFeed from './api/updateDataFeed';
import checkAddressBalance from './api/checkAddressBalance';
import users from './api/users';
import getUser from './api/getUser';
import addXPub from './api/addXPub';
import addPOS from './api/addPOS';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Bitbox Express Boilerplate"
    });
}));

router.use('/sample', sampleRoute);
router.use('/datafeed', updateDataFeed);
router.use('/balance', checkAddressBalance);
router.use('/users', users);
router.use('/add-xpub', addXPub);
router.use('/add-pos', addPOS);

export default router;
