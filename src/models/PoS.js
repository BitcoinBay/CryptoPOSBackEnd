const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PoSSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transaction',
        required: true
    }],
    xpubs: [{
        type: Schema.Types.ObjectId,
        ref: 'xpub_addresses',
        required: true
    }]
});

module.exports = mongoose.model('pos_systems', PoSSchema);
