const express = require("express");
const router = express.Router();

const XPub = require("../../models/XPub");
const PoS = require("../../models/PoS");
const User = require("../../models/User");

router.post("/", (req, res) => {
    const new_xpub = new XPub({
        address: req.body.xpub_data.address,
        type: req.body.xpub_data.type,
        address_index: 0
    });

    new_xpub.save().then((saved_xpub) => {
        const new_pos = new PoS({
            name: req.body.name,
            transactions: [],
            xpubs: [ saved_xpub._id ]
        });

        new_pos.save().then((saved_pos) => {
            User.findByIdAndUpdate(req.body.user_id, {
                $push: { pos_systems: saved_pos._id }
            }).exec((error, user) => {
                if (error) {
                    // TODO: Send error to front-end
                    PoS.findByIdAndDelete(saved_pos._id).exec((error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                } else {
                    res.json(user);
                }
            });
        }).catch((error) => console.log(error));
    });

});

module.exports = router;
