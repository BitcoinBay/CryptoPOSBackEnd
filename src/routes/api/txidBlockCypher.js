import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';
const router = express.Router();

router.get('/:txid', wrap(async (req, res) => {
    try {
      axios
        .get(`https://api.blockcypher.com/v1/btc/main/txs/${req.params.txid}`)
        .then((result) => {
          res.json({
            txid: result
          })
        })
        .catch((err) => {
          res.status(404).json({
            error: err
          })
        })
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
}));

export default router;
