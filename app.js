var express = require('express');
var redis = require("redis");

var argv = require('minimist')(process.argv.slice(2));


var app = express();
var client = redis.createClient();

app.use(require('connect').bodyParser());

var resources = [
  {
    'url': '/key/:key', 
    'operations': [
      {'get': function(params, callback) {client.get(params.key, callback);}},
      {'put': function(params, value, callback) {
        if (!value.value) {
          next(new Error("Expecting json: {\"value\": \"...\"} and content type application/json"));
          return;
        }
        client.set(params.key, value.value, callback);
      }}
    ]
  },
  {
    'url': '/keys/:pattern?', 
    'operations': [
      {'get': function(params, callback) {client.get(params.pattern || "*", callback);}}
    ]
  },
  {
    'url': '/hkey/:key', 
    'operations': [
      {'get': function(params, callback) {client.hgetall(params.key, callback);}},
      {'put': function(params, value, callback) {
          if (!value.value.length) {
            throw new Error("Expecting json {\"value\": [\"key\": \"value\"]}")
            return;
          }

          var fullData = [params.key].concat(value.value);
          client.hset(fullData, callback);
        }
      }
    ]
  }
];

resources.forEach(function(resource) {
  resource.operations.forEach(function(operation) {    
    if (operation.put) {      
      app.put(resource.url, putOperation(operation.put));      
    }
    if (operation.get) {
      app.get(resource.url, getOperation(operation.get));
    }
  });
});

function simpleResponder(res) {
  return function(err, redisResponse) {
    if (err) console.log (err);
    res.send(redisResponse);
  }
};

function getOperation(fnBody) {
  return function (req, res, next) {
    fnBody(req.params, simpleResponder(res));
  }
}

function putOperation(fnBody) {
  return function(req, res, next) {
    var value = req.body;

    fnBody(req.params, value, simpleResponder(res));
  };
}

var port = 3000;
if (argv.port) {
  port = argv.port;
}

app.listen(port);
console.log('Express started on port ' + port);