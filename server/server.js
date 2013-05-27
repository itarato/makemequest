/**
 * @file
 * Server entry point of MAKE ME QUEST.
 */

console.log('-- Make me quest has been started');

var db = require('./db.js');
var controller = require('./controller.js');
var http = require('http');
var server = http.createServer();

server.listen(8081, 'localhost');

controller.attachServer(server);
