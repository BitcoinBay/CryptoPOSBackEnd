import { checkJWTToken } from "../index";

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", checkJWTToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (error, user_data) => {
        if (error) {
            console.log(error);

            res.status(400).end();
        } else {
            res.json({"id": user_data.id, "name": user_data.name});
        }
    })
});

module.exports = router;
