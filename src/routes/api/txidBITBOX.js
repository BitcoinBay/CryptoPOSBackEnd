import express from 'express';
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
import wrap from '../../middlewares/wrap';
const router = express.Router();

router.get('/:txid', wrap(async (req, res) => {
    try {
      let txid = await BITBOX.Transactions.details(rep.params.txid);
      res.status(200).json({
          txid: txid
      });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
