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

    PoS.findByIdAndUpdate(req.body.pos_id).populate('xpubs').exec((error, pos) => {
        if (!error) {
            let added = false;

            if (pos != null) {
                if (pos.xpubs.length > 0) {
                    pos.xpubs.forEach(xpub => {
                        if (xpub.type === new_xpub.type) {
                            // Find and update existing xpub document
                            XPub.findByIdAndUpdate(xpub._id, { address: new_xpub.address, address_index: 0 })
                                    .exec((error, saved_xpub) => {
                                        if (!error) {
                                                res.json(pos.xpubs);
                                        } else {
                                            console.log(error);

                                            res.status(400).end();
                                        }
                                    });

                            added = true;
                        } 
                    });
                }

            }

            if (added === false) {
                // Create new xpub document and add it to the list of xpubs
                new_xpub.save((error, saved_xpub) => {
                    if (!error) {
                        pos.xpubs.push(saved_xpub._id);

                        pos.save();
                    }
                });
            }

        } else {
            console.log(error);

            res.status(400).end();
        }
    })

    // if (new_xpub.address.length === 111) {
    //     new_xpub.findOneAndUpdate({ type: new_xpub.type }, { address: new_xpub.address, address_index: 0 }, { upsert: true }).then((saved_xpub) => {
    //         console.log("hello?")

    //         PoS.findByIdAndUpdate(req.body.pos_id, { $push: { xpubs: saved_xpub } })
    //             .exec((error, pos) => {
    //                 if (!error) {
    //                     res.json(saved_xpub);
    //                 } else {
    //                     console.log(error);
    //                 }
    //         });
    //     }).catch((error) => {
    //         console.log(error);

    //         res.status(400).end();
    //     });
    // } else {
    //     console.log(new_xpub.address.length);

    //     res.status(400).end();
    // }
});

module.exports = router;
