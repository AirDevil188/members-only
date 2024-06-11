const mongoose = require("mongose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: true,
});

module.exports = mongoose.model("User", UserSchema);
