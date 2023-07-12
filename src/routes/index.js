let { Router } = require('express');
let router = Router();

router.get('/', function(req, res) {
    return res.status(200).send({
        success: true,
        message: "Authentication servers are running."
    });
});

module.exports = {
    path: '/',
    router
}