/**
 * @file
 * Server entry point of MAKE ME QUEST.
 */

console.log('-- Make me quest has been started');

var config = require('./local.config.js');
var http = require('http');
var director = require('director');
var facebook = require('facebook-node-sdk');

var router = new director.http.Router({
  '/ping': {
    get: GET_ping
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
