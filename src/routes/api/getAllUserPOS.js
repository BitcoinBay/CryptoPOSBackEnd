const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.post("/", (req, res) => {
    User.findById(req.body.user_id).populate("pos_systems").exec((error, user) => {
        if (!error) {
            res.json(user.pos_systems);
        } else {
            res.status(400).json(error);
        }
    });
});

module.exports = router;
