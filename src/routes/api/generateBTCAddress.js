import express from 'express';
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
import wrap from '../../middlewares/wrap';
const router = express.Router();
const XPubKey = "xpub6BveHefBYPeyXn5QU8wahmWJ5obvfvxzA7CQeqE2hzCguMWKbZdaLB2WG87z3pJcBFs5QNMmkDTcq3CayF1U9sSiowukmuTrsBzGA82W2As";

let address_index = 0;

router.get('/', wrap(async (req, res) => {
    try {
      let address = BITBOX.Address.fromXPub(XPubKey, `0/${address_index}`);
      let legacyFormatAddress = BITBOX.Address.toLegacyAddress(address);
      res.status(200).json({
          address: legacyFormatAddress
      });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
