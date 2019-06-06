const express = require("express");
const router = express.Router();
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const BITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });

const XPub = require("../../models/XPub");
const PoS = require("../../models/PoS");

router.post("/", (req, res) => {
    const new_xpub = new XPub({
      address: req.body.address,
      type: req.body.type,
      address_index: 0
    });

    if (new_xpub.address.length === 111) {
      new_xpub.save().then((saved_xpub) => {
          PoS.findByIdAndUpdate(req.body.pos_id, { $push: { xpubs: saved_xpub } })
              .exec((error, pos) => {
                  if (!error) {
                      res.json(saved_xpub);
                  }
              }).catch((error) => {
                  console.log(error);
              });
      }).catch((error) => {
          console.log(error);
      });
    } else {
        res.status(400).end();
    }
});

module.exports = router;
