/**
 * @file
 * Main JS file.
 */

var MMQ = MMQ || {};

_.extend(MMQ, Backbone.Events);
MMQ.on('playerIsReady', onPlayerReady);

MMQ.states = {
  INITIALIZED: false,
  INIT_IN_PROGRESS: false
};

MMQ.init = function() {
  MMQ.states.INIT_IN_PROGRESS = true;

  FB.api('/me', function(response) {
    console.log('-- MMQ.init', response);
    jQuery.ajax({
      type: 'POST',
      url: MMQ.config.serverPath + '/user/identify',
      data: response,
      success: function (response) {
        console.log('-- Success', response);
        MMQ.player = new MMQ.User(response);
        MMQ.trigger('playerIsReady', MMQ.player);

        MMQ.states.INIT_IN_PROGRESS = false;
        MMQ.states.INITIALIZED = true;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('-- Error 1');
        MMQ.states.INIT_IN_PROGRESS = false;
      }
    });
  });
};

MMQ.generalAjaxErrorHandler = function(callback) {
  return function (jqXHR, textStatus, errorThrown) {
    console.log('-- Ajax error');
    if (callback) {
      callback();
    }
  };
};

function onPlayerReady(player) {
  var pos = player.get('pos');
  jQuery.ajax({
    type: 'GET',
    url: MMQ.config.serverPath + '/map/' + pos[0] + '/' + pos[1] + '/5'
  });
}
