const express = require("express");
const router = express.Router();

const PoS = require("../../models/PoS");
const User = require("../../models/User");

router.post("/", (req, res) => {
    const new_pos = new PoS({
        name: req.body.name,
        xpub: req.body.xpub
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

module.exports = router;
