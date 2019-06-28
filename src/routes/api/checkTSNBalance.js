import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';

const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
    try {
      let utxo = await BITBOX.Address.utxo(req.params.address);
      res.status(200).json({
        utxo: utxo.utxos
      });
    } catch (err) {
      console.log("Try Error");
      res.status(200).json({
        utxo: []
      });
    }
}));

export default router;
