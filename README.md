node-redis-rest
===============

Simple Node.js application with Redis and REST API.

## Usage

 Clone the repo and install dependencies:

    $ git clone https://github.com/nickholub/node-redis-rest
    $ cd node-redis-rest
    $ npm install

 Run Redis:

    $ <redis>/src/redis-server

 Start the server:

    $ node app

  Test REST API, e.g.

    http://localhost:3000/keys/*
    http://localhost:3000/key/foo

## Dependencies

[node_redis](https://github.com/mranney/node_redis) Node.js Redis client

[Express](https://github.com/visionmedia/express) Node.js web framework