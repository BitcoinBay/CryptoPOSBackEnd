import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';

const BITBOXSDK = require("@chris.troutner/bitbox-js");
// initialize BITBOX
//const BITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
const TESTBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
  try {
    let utxo = await TESTBOX.Address.utxo(req.params.address);
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

/*
Unconfirmed TX
{
    "utxo": [
        {
            "txid": "43ab5b0e4feb04dbd776451c5d6dc02b07131f60f20a35ae30f6ff35894fccb1",
            "vout": 0,
            "amount": 0.35588871,
            "satoshis": 35588871,
            "confirmations": 0,
            "ts": 1562089938
        }
    ]
}
*/
