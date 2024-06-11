const mongoose = require("mongose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: false,
});

module.exports = mongoose.model("User", UserSchema);
