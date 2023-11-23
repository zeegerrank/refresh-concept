const express = require("express");const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    roles: "user",
  });
  const newUser = await user.save();
  return res.status(200).send({ message: "Registration succeeded", newUser });
});
//**login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  /**find user */
  const user = await User.find({ username });

  if (!user || user.length === 0) {
    return res.status(404).send({ message: "User not found" });
  }

  /**compare password */
  const userPassword = user[0].password;

  const isValidPassword = await bcrypt.compareSync(password, userPassword);
  if (!isValidPassword) {
    return res.status(400).send({ message: "Password incorrect" });
  }

  /**sign token */
  const { _id, roles } = user[0];

  const refreshToken = await jwt.sign({ _id }, "secretKey");
  const accessToken = await jwt.sign({ _id, roles }, "secretKey");

  res.cookie("token", refreshToken);

  return res.send({ user, accessToken });
});

//**refresh */
router.post("/refresh", async (req, res) => {
  const { token } = req.cookies;
  /**decode token */
  const decoded = await jwt.verify(token, "secretKey");
  const { _id } = decoded;
  /**find user by id contain in token */
  const user = await User.find({ _id });
  /**sign token */
  const { roles } = user[0];
  const refreshToken = jwt.sign({ _id }, "secretKey");
  const accessToken = jwt.sign({ _id, roles }, "secretKey");
  /**send cookie */
  res.cookie("token", refreshToken);
  return res.status(200).send({ accessToken });
});

module.exports = router;
