import express from 'express';
import axios from 'axios';

const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK();

import wrap from '../../middlewares/wrap';

const router = express.Router();


router.get('/:address', wrap(async (req, res) => {
    try {
      axios.get(`https://rest.bitcoin.com/v2/address/details/${req.params.address}`)
        .then((result) => {
          res.status(200).json({
            status: result.data
          });
        })
        .catch((err) => {
          res.status(404).json({
              error: err
          });
        })
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
