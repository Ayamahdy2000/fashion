const express = require("express");
const router = express.Router();
const {
  User,
  validate
} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({
      _id: user._id,
      email: user.email
    },
    process.env.jwtprivateKey
  );
  res.status(200).json({
    user: user,
    token: token,
  });
});


module.exports = router;