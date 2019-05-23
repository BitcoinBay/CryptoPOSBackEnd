const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PoSSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    xpub: {
        type: Schema.Types.ObjectId,
        ref: 'xPub',
        required: true
    }
});

module.exports = mongoose.model('pos_systems', PoSSchema);
