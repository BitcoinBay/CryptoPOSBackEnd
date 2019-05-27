import express from 'express';
const HDKey = require('ethereumjs-wallet/hdkey');
import wrap from '../../middlewares/wrap';
const router = express.Router();
const XPubKey = "xpub6EEfFvbq3w6iSka2qyTrv8brCMswFRKhY8Dq1j8cHXfyzEijbYrcv936YrY9KftXwj9fdSuBJTSsxqJyz33evMb2WmKoMaEe4a1GasLyJMV";

let address_index = 0;

router.get('/', wrap(async (req, res) => {
    try {
      let fromXPub = HDKey.fromExtendedKey(XPubKey);
      console.log(fromXPub);
      let ethAddress = fromXPub.deriveChild(`0/${address_index}`).getWallet().getAddressString();
      res.status(200).json({
          address: ethAddress
      });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
