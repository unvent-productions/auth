var { Router } = require('express');
var router = Router();

var passport = require("passport");

router.get('/', passport.authenticate("jwt", { session: false }), function(req, res) {
    return res.status(200).send({
        success: true,
        message: "Authentication servers are running."
    });
});

module.exports = {
    path: '/profile',
    router
}