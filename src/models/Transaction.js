const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
    amount: {
        type: Number,
        required: true
    },
    blockHeight: {
        type: Number,
        required: true
    },
    crypto: {
        type: String,
        required: true
    },
    fiat: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    txHash: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("transaction", Transaction);
