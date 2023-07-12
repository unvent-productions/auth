let mongoose = require('mongoose');
let { host, port, database, auth } = require('../../configs/mongo.json');

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
    auth
}).catch(console.error);

module.exports = mongoose;