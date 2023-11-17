const express = require("express");const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//**register */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  /**hash password */
  const SALT = 10;
  const hashedPassword = await bcrypt.hashSync(password, SALT);

  const user = new User({
    username,
    password: hashedPassword,
  });
  const newUser = await user.save();
  return res.status(200).send({ message: "Registration succeeded", newUser });
});
//**login */
router.post("/login", (req, res) => {
  const { username, password } = req;
});

module.exports = router;
