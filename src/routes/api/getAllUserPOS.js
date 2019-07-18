const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

import { checkJWTToken } from "../index";

const User = require("../../models/User");

router.post("/", checkJWTToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (error, user_data) => {
        if (error) {
            console.log(error);

            res.status(403).end();
        } else {
            User.findById(user_data.id).populate("pos_systems").exec((error, user) => {
                if (!error && user) {
                    res.json(user.pos_systems);
                } else {
                    res.status(400).json(error);
                }
            });
        }
    })
});



module.exports = router;
