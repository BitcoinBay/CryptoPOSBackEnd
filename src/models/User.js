const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  pos_systems: [{
    type: Schema.Types.ObjectId,
    ref: 'pos_systems'
  }]
});

module.exports = mongoose.model("users", UserSchema);
