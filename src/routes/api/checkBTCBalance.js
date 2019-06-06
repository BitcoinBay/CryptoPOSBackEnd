import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';
const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
    try {
      axios
        .get(`https://api.blockcypher.com/v1/btc/main/addrs/${req.params.address}`)
        .then((result) => {
          if (result.data.txrefs) {
            res.status(200).json({
              utxo: result.data.txrefs
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
