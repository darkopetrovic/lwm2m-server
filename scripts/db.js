var mongoose = require('mongoose'),
    defaultDb;

function loadModels() {
    require('./models').load(defaultDb);
}

/**
 * Creates a new connection to the Mongo DB.
 *
 */
function init(user, password, host, port, db, callback) {
    /*jshint camelcase:false */

    const uri = `mongodb://${user}:${password}@${host}:${port}/${db}`;
    defaultDb = mongoose.createConnection(uri);
    defaultDb.on('error', function mongodbErrorHandler(error) {
        throw new Error(error);
    });

    loadModels();

    callback(null);
}
exports.init = init;
exports.db = defaultDb;