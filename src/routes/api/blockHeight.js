import express from 'express';
import axios from 'axios';

const BITBOXSDK = require("@chris.troutner/bitbox-js");
const BITBOX = new BITBOXSDK();

import wrap from '../../middlewares/wrap';

const router = express.Router();


router.get('/', wrap(async (req, res) => {
  try {
    const BCHInfo = await BITBOX.Blockchain.getBlockchainInfo().then(res => {
      return res.blocks;
    });
    const BTCInfo = await axios
      .get('https://api.blockcypher.com/v1/btc/main')
      .then(res => {
        return res.data.height;
      })
    const ETHInfo = await axios
      .get('https://api.blockcypher.com/v1/eth/main')
      .then(res => {
        return res.data.height;
      })
    res.status(200).json({
        BCH: BCHInfo,
        BTC: BTCInfo,
        ETH: ETHInfo
    });
  } catch (err) {
    res.status(404).json({
        error: err
    });
  }
}));

export default router;
