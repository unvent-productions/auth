var { Router } = require("express");
const jwt = require("jwt-simple");
var bcrypt = require("bcryptjs");
var User = require("../models/user");

var router = Router();

router.post("/", (req, res) => {
  let { username, password } = req.body;
  User.findOne({ username })
    .exec()
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "An account with that username could not be found.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid password.",
        });
      }

      var oneWeek = 604800000;
      var payload = {
        id: user._id,
        expire: Date.now() + oneWeek,
      };

      var token = jwt.encode(payload, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        token,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Server error.",
      });
    });
});

module.exports = {
  path: "/login",
  router,
};
