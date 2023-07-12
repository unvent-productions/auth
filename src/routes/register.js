var { Router } = require("express");
var router = Router();

var User = require("../models/user");
var bcrypt = require('bcryptjs');

router.post("/", async function (req, res) {
  if (req.user) {
    return res.status(400).json({
      success: false,
      message: "You are already logged in.",
    });
  }

  let { email, username, password } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required.",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required.",
    });
  }

  try {
    const existingUser =
      (await User.findOne({ username })) || (await User.findOne({ email }));
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with that username or email already exists.",
      });
    }

    var hashedPassword = await bcrypt.hash(password, 10);
    var newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully. Please log in.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});

module.exports = {
  path: "/register",
  router,
};
