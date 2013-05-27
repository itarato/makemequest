/**
 * @file
 * User backend model.
 */

var db = require('../db.js');

function getByFBID(FBID, callback) {
  db.openCollection('user', function (collection) {
    collection.findOne({'fbid': FBID}, function (err, item) {
      callback(item);
    });
  });
}
