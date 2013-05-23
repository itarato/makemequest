/**
 * @file
 * Main JS file.
 */

var MMQ = MMQ || {};

MMQ.init = function() {
  FB.api('/me', function(response) {
    console.log('-- MMQ.init', response);
  });
}
