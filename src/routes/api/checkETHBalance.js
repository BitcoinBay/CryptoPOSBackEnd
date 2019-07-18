import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';
const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
    try {
      axios
        .get(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${req.params.address}&sort=desc&apikey=F3KDPDV1JFGNBE3ZX96A8M8886R17ZNCPR`)
        .then((result) => {
          if (result.data.result) {
            res.status(200).json({
              utxo: result.data.result
            });
          } else {
            res.status(200).json({
              utxo: []
            })
          }
        })
        .catch((err) => {
          console.log("Axios Error");
          res.status(200).json({
              utxo: []
          });
        })
    } catch (err) {
      console.log("Try Error");
      res.status(200).json({
          utxo: []
      });
    }
  }));

  export default router;
