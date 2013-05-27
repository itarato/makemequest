/**
 * @file
 * User backend model.
 */

var db = require('../db.js');

exports.user = function(data) {
  console.log('-- User init - fbid:' + data['id']);

  return {

    getByFBID: function (callback) {
      db.openCollection('user', function (collection) {
        collection.findOne({'fbid': data['id']}, function (err, item) {
          callback(item, collection);
        });
      });
    },

    /**
     * Save user object.
     *
     * @param data
     * @param callback [data:object, is_new:bool]
     */
    saveAndLoad: function (callback) {
      // Lookup user by the FBID.
      this.getByFBID(function (item, collection) {
        // New user.
        if (!item) {
          var user_data = {
            'fbid': data['id'],
            'name': data['name'],
            'created_at': (new Date()).getTime()
          };
          collection.insert(user_data, function (err, docs) {
            callback(user_data, true);
          });
        }
        // Existing user.
        else {
            callback(item, false);
        }
      });
    },

    load: function (callback) {
      this.saveAndLoad(function (user_data, is_new) {
        console.log('-- User load', user_data);
        callback(user_data);
      });
    }

  };
}
