import express from 'express';

import wrap from '../middlewares/wrap';
import blockHeight from './api/blockHeight';
import updateDataFeed from './api/updateDataFeed';
import checkBCHBalance from './api/checkBCHBalance';
import checkBTCBalance from './api/checkBTCBalance';
import checkETHBalance from './api/checkETHBalance';
//import generateBCHAddress from './api/generateBCHAddress';
//import generateBTCAddress from './api/generateBTCAddress';
//import generateETHAddress from './api/generateETHAddress';
import users from './api/users';
import addXPub from './api/addXPub';
import addPOS from './api/addPOS';
import getAllUserPOS from './api/getAllUserPOS';
import getPOSXPub from './api/getPOSXPub';
import getPOSByID from './api/getPOSByID';
import deletePOS from './api/deletePOS';
import updateXPubIndex from './api/updateXPubIndex';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Bitbox Express Boilerplate"
    });
}));

//router.use('/generateBTC', generateBTCAddress);
//router.use('/generateBCH', generateBCHAddress);
//router.use('/generateETH', generateETHAddress);
router.use('/blockHeight', blockHeight);
router.use('/datafeed', updateDataFeed);
router.use('/balanceBCH', checkBCHBalance);
router.use('/balanceBTC', checkBTCBalance);
router.use('/balanceETH', checkETHBalance);
router.use('/users', users);
router.use('/add-xpub', addXPub);
router.use('/add-pos', addPOS);
router.use('/get-all-user-pos', getAllUserPOS);
router.use('/get-pos-xpub', getPOSXPub);
router.use('/get-pos-by-id', getPOSByID);
router.use('/delete-pos', deletePOS);
router.use('/update-xpub-index', updateXPubIndex);

export default router;
