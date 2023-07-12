var express = require("express")();
var passport = require("passport");
var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;

var User = require("../models/user");

require('dotenv').config();
let { JWT_SECRET } = process.env;

var params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

/**
 *
 * @param {express} app
 */
module.exports = {
  order: 99,
  middleware: function (app) {
    var strategy = new JWTStrategy(params, function(payload, done) {
      User.findById(payload.id).then(user => {
        if(!user) return done(new Error("User not found!"), null);
        return done(null, user);
      }).catch(err => {
        return done(err, null);
      });
    });

    passport.use(strategy);
    app.use(passport.initialize());
  }
};
