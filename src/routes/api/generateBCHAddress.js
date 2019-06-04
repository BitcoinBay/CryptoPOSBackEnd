import express from 'express';
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
import wrap from '../../middlewares/wrap';
const router = express.Router();
const XPubKey = "xpub6CiUMev4tH1dncKmjvP9ppmvaeqdzWZKjiL757FzLVNQreYjPs9SKWJA5ajh6ybaTMEFi7HGU7VCyTxYsbrEhMFUhNzN7dPgjQnfhuj7xx7";

let address_index = 0;

router.get('/', wrap(async (req, res) => {
    try {
      let address = BITBOX.Address.fromXPub(XPubKey, `0/${address_index}`);
      res.status(200).json({
          address: address
      });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
