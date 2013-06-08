/**
 * @file
 */

var MMQ = MMQ || {};

var TYPES = [
  'empty',
  'wall',
  'land'
];

MMQ.tile = Backbone.Model.extend({
  defaults: {
    type: 'empty',
    pos: [0, 0]
  },

  initialize: function () {

  }
});
