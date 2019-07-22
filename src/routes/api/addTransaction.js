const express = require("express");
const router = express.Router();

const Transaction = require("../../models/Transaction");
const PoS = require("../../models/PoS");

router.post("/", (req, res) => {
    const new_transaction = new Transaction({
        hash: req.body.hash,
        block_number: req.body.block_number,
        amount: req.body.amount,
        crypto_currency: req.body.crypto_currency,
        fiat_currency: req.body.fiat_currency,
        market_price: req.body.market_price
    });

    console.log(new_transaction);

    new_transaction.save().then((saved_transaction) => {
        PoS.findByIdAndUpdate(req.body.pos_id, { $push: { transactions: saved_transaction }})
            .exec((error, pos) => {
                if (!error) {
                    res.json(saved_transaction);
                }
            });
    }).catch((error) => {
        console.log(error);

        res.status(400).end();
    });
});

module.exports = router;
