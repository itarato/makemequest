/**
 * @file
 * Database access.
 */

var config = require('./local.config.js');

var mongodb = require('mongodb');
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongodb.Connection.DEFAULT_PORT;
var db_name = config.db_name;
var db = new mongodb.Db(db_name, new mongodb.Server(host, port, {}), {native_parser: true});

console.log('-- Storage init');

/**
 * Obtain access to a collection.
 *
 * @param collection
 *  Name of the collection.
 * @param callback
 *  Callback to return the collection to. Signature: function(collection_object){};
 */
exports.openCollection = function(collection, callback) {
  db.open(function (err, db) {
    onDatabaseReady(err, db, collection, callback);
  });
}

function onDatabaseReady(err, db, collection, callback) {
  db.collection(collection, function (err, collection) {
    onCollectionReady(err, collection, callback);
  });
}

function onCollectionReady(err, collection, callback) {
  callback(collection);
}
