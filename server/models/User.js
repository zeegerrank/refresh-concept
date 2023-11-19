const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  refreshToken: String,
  roles: [{ type: String }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
