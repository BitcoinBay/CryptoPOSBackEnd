const express = require("express");
const router = express.Router();

const XPub = require("../../models/XPub");

router.post("/", (req, res) => {
    const new_xpub = new XPub({
        address: req.body.address,
        type: req.body.type,
        address_index: 0
    });

    XPub.findOne({ address: new_xpub.address }).exec((error, xpub) => {
        if (!xpub) {
            new_xpub.save().then((saved_xpub) => {
                res.json(saved_xpub);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            res.json(xpub);
        }
    });
});

module.exports = router;
