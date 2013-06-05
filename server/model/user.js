/**
 * @file
 * User backend model.
 */

var db = require('../db.js');

exports.initWithFacebookData = function (data, callback) {
  this.loadByFBID(data['id'], function (item) {
    if (!item) {
      var user_data = {
        'fbid': data['id'],
        'name': data['name'],
        'created_at': (new Date()).getTime()
      };
      db.openCollection('user', function (collection) {
        collection.insert(user_data, function (err, docs) {
          callback(user_data);
        });
      });
    }
    // Existing user.
    else {
      callback(item);
    }
  });
};

exports.loadByFBID = function (fbid, callback) {
  db.openCollection('user', function (collection) {
    collection.findOne({'fbid': data['id']}, function (err, item) {
      callback(item);
    });
  });
};

exports.save = function (fbid, data, callback) {
  db.openCollection('user', function (collection) {
    collection.update({'fbid': fbid}, data, {}, function () {
      callback();
    });
  });
};
