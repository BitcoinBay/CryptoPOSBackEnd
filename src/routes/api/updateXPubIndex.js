const express = require("express");
const router = express.Router();

const XPub = require("../../models/XPub");

router.post("/", (req, res) => {
    XPub.findByIdAndUpdate(req.body.id, { address_index: req.body.address_index })
    .exec((error, xpub) => {
        if (!error) {
            res.status(400).end();
        }
    });
});

module.exports = router;
