const express = require("express");const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
  let user = await User.find({ username });
  console.log("🚀 -> file: auth.routes.js:31 -> user:", user);

  if (!user || user.length === 0) {
    return res.status(404).send({ message: "User not found" });
  }

  /**compare password */
  const userPassword = user[0].password;

  const isValidPassword = await bcrypt.compareSync(password, userPassword);
  if (!isValidPassword) {
    return res.status(400).send({ message: "Password incorrect" });
  }

  /**detect concurrent use */
  if (user[0].refreshToken !== null) {
    await user[0].updateOne({ refreshToken: null });
    res.cookie("token", null);
    return res
      .status(400)
      .send({ message: "Your account is on use, we log out" });
  }

  /**sign token */
  const { _id, roles } = user[0];
  const genRandom = await crypto.randomBytes(20).toString("hex");

  const refreshToken = await jwt.sign({ _id, genRandom }, "secretKey");
  const accessToken = await jwt.sign({ _id, roles }, "secretKey");

  /**update refresh token in db*/
  await user[0].updateOne({ refreshToken });
  /**send cookie */
  res.cookie("token", refreshToken);
  user[0].password = null;
  user[0].refreshToken = null;
  return res.send({ user, accessToken });
});

//**refresh */
router.post("/refresh", async (req, res) => {
  const token = req.headers.authorization.split(" ", 2)[1];

  console.log("🚀 -> file: auth.routes.js:74 -> token:", token);

  /**check if there's token */
  if (!token || token === "j:null" || token === null) {
    return res.status(400).send({ message: "Please log in again" });
  }
  try {
    /**decode token */
    const decoded = jwt.verify(token, "secretKey");

    /**find user by id contain in token */

    const { _id } = decoded;
    const user = await User.find({ _id }).select("-password");

    /**detect re-used token */
    if (user[0].refreshToken !== token) {
      res.cookie("token", null);
      await user[0].updateOne({ refreshToken: null });
      return res.status(400).send({ message: "Please log in again" });
    }

    /**sign token */
    const { roles } = user[0];
    const genRandom = await crypto.randomBytes(20).toString("hex");

    const refreshToken = jwt.sign({ _id, genRandom }, "secretKey");
    const accessToken = jwt.sign({ _id, roles }, "secretKey");

    /**send cookie */
    res.cookie("token", refreshToken);
    await user[0].updateOne({ refreshToken });
    return res
      .status(200)
      .send({ user, accessToken, message: "refresh token update and sent" });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
