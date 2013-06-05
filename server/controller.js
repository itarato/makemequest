/**
 * @file
 * Main controller file.
 */

var url = require('url');
var querystring = require('querystring');
var user = require('./model/user.js');

exports.attachServer = function(server) {
  server.on('request', function (req, res) {
    console.log('-- Incoming request');

    var parsed_url = url.parse(req.url, true);
    console.log(req.method);

    if (req.method == 'GET') {
      switch (parsed_url.pathname) {
        case '/ping':
          GET_ping(req, res, parsed_url);
          break;
      }
    }
    else if (req.method == 'POST') {
      switch (parsed_url.pathname) {
        case '/user/identify':
          POST_user_identify(req, res, parsed_url);
          break;
      }

      var args = parsed_url.pathname.split('/').filter(function(item){return item;});
      if (args[0] == 'user' && args[1] > 0) {
        OPTIONS_user_save(req, res, parsed_url);
      }
    }
  });
};

function get_post_params(req, res, callback) {
  var post_raw_data = '';
  req.on('data', function (data) {
    post_raw_data += data;

    if (post_raw_data.length > 1e6) {
      post_raw_data = '';
      res.writeHead(413, {'Content-Type': 'text/plain'}).end();
      req.connection.destroy();
    }
  });

  req.on('end', function () {
    var post_data = querystring.parse(post_raw_data);
    callback(post_data);
  });
}

function GET_ping(req, res, parsed_url) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('pong');
}

function POST_user_identify(req, res, parsed_url) {
  console.log('-- POST_user_identify');

  get_post_params(req, res, function (post_data) {
    console.log('-- Post data ready');

    user.initWithFacebookData(post_data, function (user_data) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
      });
      res.write(JSON.stringify(user_data));
      res.end();
    });
  });
}

function OPTIONS_user_save(req, res, parsed_url) {
  get_post_params(req, res, function(post_data) {
    console.log(post_data);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    });
    res.write(JSON.stringify({success: true}));
    res.end();
  });
}
