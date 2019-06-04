import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';

const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
    try {
      let utxo = await BITBOX.Address.utxo(req.params.address);
      console.log(utxo);
      res.status(200).json({
        utxo: utxo.utxos
      })
    } catch (err) {
      res.status(404).json({
        error: err
      });
    }
}));

export default router;
