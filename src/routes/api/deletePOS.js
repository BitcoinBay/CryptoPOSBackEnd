const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const PoS = require("../../models/PoS");
const XPub = require("../../models/XPub");

router.post("/", (req, res) => {
    User.findByIdAndUpdate(req.body.user_id,
            { $pull: { pos_systems: req.body.pos_id}})
    .exec((error, user) => {
        if (error) {
            res.status(400).json(error);
        } else {
            PoS.findById(req.body.pos_id).exec((error, pos) => {
                if (!error) {
                    XPub.findOneAndDelete(pos.xpub).exec((error, xpub) => {
                        if (!error) {
                            pos.remove();
                        }
                    });
                }
            });

            res.status(200).end();
        }
    });
});

module.exports = router;
