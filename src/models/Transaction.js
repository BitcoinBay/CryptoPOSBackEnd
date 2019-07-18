const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
    hash: {
        type: String,
        required: true
    },
    block_number: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    crypto_currency: {
        type: String,
        required: true
    },
    fiat_currency: {
        type: String,
        required: true
    },
    market_price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("transactions", Transaction);
