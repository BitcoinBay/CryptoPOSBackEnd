const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const XPubSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address_index: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("xpub_addresses", XPubSchema);
