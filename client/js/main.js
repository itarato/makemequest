/**
 * @file
 * Main JS file.
 */

var MMQ = MMQ || {};

MMQ.init = function() {
  FB.api('/me', function(response) {
    console.log('-- MMQ.init', response);
    jQuery.ajax({
      type: 'POST',
      url: MMQ.config.serverPath + '/user/identify',
      data: response,
      success: function (response) {
        console.log('-- Success', response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('-- Error 1');
      }
    });
  });
}
