require('dotenv').config();
import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';
const router = express.Router();

router.get('/', wrap(async (req, res) => {
    try {
      axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH,BTC,ETH&tsyms=USD,EUR,CAD&api_key={${process.env.API_KEY}}`)
        .then((result) => {
          res.status(200).json({
            status: result.data
          });
        });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
