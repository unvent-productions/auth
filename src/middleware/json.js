let bodyParser = require('body-parser');
let middleware = bodyParser.json();

module.exports = {
    order: 99,
    middleware
}