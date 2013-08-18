var express = require('express');
var redis = require("redis");

var app = express();
var client = redis.createClient();

app.get('/keys/:pattern?', getKeys);
app.get('/key/:key', getKeyDetails);

function getKeys(req, res, next) {
  var pattern = req.params.pattern || "*";
  console.log('getting keys matching pattern ' + pattern);
  client.keys(pattern, function(err, keys) {
    res.json(keys);
  });
}

function getKeyDetails(req, res, next) {
  var key = req.params.key;
  console.log('getting value of key ' + key);
  client.get(key, function(err, value) {
    res.json(value);
  });
}

app.listen(3000);
console.log('Express started on port 3000');