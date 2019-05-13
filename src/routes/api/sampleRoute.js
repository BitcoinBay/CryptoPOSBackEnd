import express from 'express';
import axios from 'axios';

const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK();

import wrap from '../../middlewares/wrap';

const router = express.Router();


router.get('/', wrap(async (req, res) => {
    try {
        const info = await BITBOX.Blockchain.getBlockchainInfo();
        res.status(200).json({
            status: info
        });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
