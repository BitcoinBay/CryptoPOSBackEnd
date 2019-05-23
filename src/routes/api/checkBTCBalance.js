import express from 'express';
import axios from 'axios';
import wrap from '../../middlewares/wrap';
const router = express.Router();

router.get('/:address', wrap(async (req, res) => {
    try {
      axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${req.params.address}`)
        .then((result) => {
          if (result.data.txrefs) {
            console.log(result.data.txrefs);
          }
          console.log(result.data.total_received);

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
