let bodyParser = require('body-parser');
let middleware = bodyParser.urlencoded({ extended: false });

module.exports = {
    order: 99,
    middleware
}