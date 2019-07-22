import express from 'express';

import wrap from '../middlewares/wrap';
import blockHeight from './api/blockHeight';
import updateDataFeed from './api/updateDataFeed';
import checkBCHBalance from './api/checkBCHBalance';
import checkTSNBalance from './api/checkTSNBalance';
import checkBTCBalance from './api/checkBTCBalance';
import checkETHBalance from './api/checkETHBalance';
import users from './api/users';
import addXPub from './api/addXPub';
import addPOS from './api/addPOS';
import addTransaction from './api/addTransaction';
import getAllUserPOS from './api/getAllUserPOS';
import getAllPOSXPubs from './api/getAllPOSXPubs';
import getAllPOSTransactions from './api/getAllPOSTransactions';
import getPOSByID from './api/getPOSByID';
import deletePOS from './api/deletePOS';
import updateXPubIndex from './api/updateXPubIndex';
import getUserData from "./api/getUserData";

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Bitbox Express Boilerplate"
    });
}));

export function checkJWTToken(req, res, next) {
    if (typeof req.headers['authorization'] !== 'undefined') {
        req.token = req.headers['authorization'];
        next();
    } else {
        res.status(403).end();
    }
}

router.use('/blockHeight', blockHeight);
router.use('/datafeed', updateDataFeed);
router.use('/balanceBCH', checkBCHBalance);
router.use('/balanceTSN', checkTSNBalance);
router.use('/balanceBTC', checkBTCBalance);
router.use('/balanceETH', checkETHBalance);
router.use('/users', users);
router.use('/add-xpub', addXPub);
router.use('/add-pos', addPOS);
router.use('/add-transaction', addTransaction);
router.use('/get-all-user-pos', getAllUserPOS);
router.use('/get-all-pos-xpubs', getAllPOSXPubs);
router.use('/get-all-pos-transactions', getAllPOSTransactions);
router.use('/get-pos-by-id', getPOSByID);
router.use('/get-user-data', getUserData);
router.use('/delete-pos', deletePOS);
router.use('/update-xpub-index', updateXPubIndex);

export default router;
