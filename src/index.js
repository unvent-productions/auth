/**
 * Connect to Mongo before running the app
 */
let { host, port, database, auth } = require('../configs/mongo.json');
require('@unvent/mongeese')(host, port, database, auth);

/**
 * Start the app
 */
var Authentication = require('./auth');
var server = new Authentication();
server.start();