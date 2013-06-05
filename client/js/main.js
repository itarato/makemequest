/**
 * @file
 * Main JS file.
 */

var MMQ = MMQ || {};

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
