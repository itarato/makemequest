/**
 * @file
 * Server entry point of MAKE ME QUEST.
 */

console.log('-- Make me quest has been started');

var app_id = '';
var app_secret = '';

var http = require('http');
var director = require('director');
var facebook = require('facebook-node-sdk');

var router = new director.http.Router({
  '/ping': {
    get: GET_ping
  },
  '/info': {
    get: GET_info
  },
  '/token': {
    get: GET_token
  }
});

var server = http.createServer(function (req, res) {
  console.log('-- Incoming request');

  router.dispatch(req, res, function (err) {
    res.writeHead(404);
    res.end();
  });
});

server.listen(8081, 'localhost');

function GET_ping() {
  this.res.writeHead(200, {'Content-Type': 'text/plain'});
  this.res.end('pong');
}

function GET_info() {
  this.res.writeHead(200, {'Content-Type': 'text/plain'});
  this.res.end('Make me quest, v0.1');
}

function GET_token() {
  var fb = new facebook({appID: app_id, secret: app_secret});

  fb.api('/oauth/access_token?client_id={app-id}&client_secret={app-secret}&grant_type=client_credentials', function(err, data) {
    console.log(data);
    console.log(err);
  });
}
