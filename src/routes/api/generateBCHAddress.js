import express from 'express';
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
import wrap from '../../middlewares/wrap';
const router = express.Router();
const XPubKey = "xpub6CG9MvrYvjdPzHMz1Fosyv6xe388XvbdnD6RUU4wABYBxc25CXnYYtTvN2HLhcYSRnunF5sPBtec2CLZepLMmDTa9XNajPtCZzEE5a46htr";

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
