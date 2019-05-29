const express = require("express");
const router = express.Router();

const PoS = require("../../models/PoS");

router.post("/", (req, res) => {
    console.log(req.body.pos_id);

    PoS.findById(req.body.pos_id).populate("xpub").exec((error, pos) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json({
              address: pos.xpub.address,
              index: pos.xpub.address_index
            });
        }
    });
});

module.exports = router;
