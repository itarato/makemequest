/**
 * @file
 * User model.
 */

var MMQ = MMQ || {};

MMQ.User = Backbone.Model.extend({
  defaults: {
    health: 100,
    pos: [0, 0]
  },

  initialize: function(params) {
    this.set(params);
    console.log('-- Backbone user init', this);
  },

  save: function() {
    jQuery.ajax({
      type: 'POST',
      url: MMQ.config.serverPath + '/user/' + this.get('fbid'),
      data: this.attributes,
      success: function() {
        console.log('-- User has been saved');
      },
      error: MMQ.generalAjaxErrorHandler()
    });
  }
});
