/**
 * Connect to Mongo before running the app
 */
require('./lib/mongoose');

/**
 * Start the app
 */
var Authentication = require('./auth');
var auth = new Authentication();
auth.start();