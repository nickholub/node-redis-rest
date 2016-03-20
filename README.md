node-redis-rest
===============

Simple Node.js application with Redis and REST API.

## Usage

 Clone the repo and install dependencies:

    $ git clone https://github.com/nickholub/node-redis-rest
    $ cd node-redis-rest
    $ npm install

 Run Redis server:

    $ <redis>/src/redis-server

 Start Node.js server:

    $ node app

 Args

    optional --port 3500

  Test REST API, e.g.

    GET http://localhost:3000/keys/*
    GET http://localhost:3000/key/foo
    PUT http://localhost:3000/key/foo {"value": "Some Value"}
    GET http://localhost:3000/hkey/foo
    PUT http://localhost:3000/hkey/foo {"value": ["Some key", "Some value"]}


## Dependencies

[node_redis](https://github.com/mranney/node_redis) Node.js Redis client

[Express](https://github.com/visionmedia/express) Node.js web framework

[minimist](https://github.com/substack/minimist)
Arg passing
