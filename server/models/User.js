const mongoose = require("mongoose");const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  refreshToken: { type: String, default: null },
  roles: [{ type: String }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
