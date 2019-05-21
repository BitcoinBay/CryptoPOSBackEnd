const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PoSSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    payment_currency: {
        type: String,
        required: true
    },
    xpub_address: {
        type: String,
        required: true
    }
});
