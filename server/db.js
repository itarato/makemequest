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

// Collection cache.
var collections = {};

// DB is ready flag.
var db_is_ready = false;

/**
 * Obtain access to a collection.
 *
 * @param collection
 *  Name of the collection.
 * @param callback [collection:object]
 *  Callback to return the collection to. Signature: function(collection_object){};
 */
exports.openCollection = function(collection_name, callback) {
  if (db_is_ready) {
    onDatabaseReady(null, db, collection_name, callback);
  }
  else {
    db.open(function (err, db) {
      if (err) {
        console.log('-- ERROR in db open', err);
      }

      db_is_ready = true;
      onDatabaseReady(err, db, collection_name, callback);
    });
  }
}

function onDatabaseReady(err, db, collection_name, callback) {
  if (err) {
    console.log('-- ERROR in db ready', err);
  }

  if (collections.hasOwnProperty(collection_name)) {
    callback(collections[collection_name]);
  }
  else {
    db.collection(collection_name, function (err, collection) {
      if (err) {
        console.log('-- ERROR in collection ready', err);
      }

      collections[collection_name] = collection;
      callback(collection);
    });
  }
}
