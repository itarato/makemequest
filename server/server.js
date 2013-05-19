/**
 * @file
 * Server entry point of MAKE ME QUEST.
 */

console.log('-- Make me quest has been started');

var http = require('http');
var director = require('director');

var router = new director.http.Router({
  '/ping': {
    get: GET_ping
  },
  '/info': {
    get: GET_info
  }
});

var server = http.createServer(function (req, res) {
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

