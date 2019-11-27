const express = require("express");
const router = express.Router();

const ObjectId = require("mongoose").Types.ObjectId;

const mongoose = require("mongoose");

const User = require("../../models/User");
const PoS = require("../../models/PoS");
const XPub = require("../../models/XPub");
const Transaction = require("../../models/Transaction");

router.post("/", (req, res) => {
    User.findByIdAndUpdate(new ObjectId(req.body.user_id),
            { $pull: { pos_systems: new ObjectId(req.body.pos_id) }})
    .exec((error, user) => {
        if (error) {
            res.status(400).json(error);
        } else {
            PoS.findById(req.body.pos_id).exec((error, pos) => {
                if (!error) {
                    for (let i = 0; i < pos.xpubs.length; i++) {
                        XPub.findByIdAndDelete(pos.xpubs[i]._id).exec((error, xpub) => {});
                    }

                    for (let i = 0; i < pos.transactions.length; i++) {
                        Transaction.findByIdAndDelete(pos.transactions[i]._id).exec((error, xpub) => {});
                    }

                    pos.remove();
                }
            });

            res.status(200).end();
        }
    });
});

module.exports = router;
