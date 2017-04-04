'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const glob = require('glob');
const path = require('path');
const Mongoose = require('mongoose');
const config = require('./config');

const server = new Hapi.Server();

server.connection({
  port: 3000
});

// Set up route prefix
server.realm.modifiers.route.prefix = '/api';

server.ext('onRequest', function (req, reply) {
  console.log('Request received', req.path);
  reply.continue();
});

const options = {
  info: {
    'title': 'Test API Documentation',
    'version': '1.0.0',
  }
};

server.register([Inert, Vision, {
  'register': HapiSwagger,
  'options': options
}], (err) => {
});


glob.sync('routes/*.js', {
  cwd: __dirname
}).forEach(file => {
  const route = require(path.join(__dirname, file));
  server.route(route);
});

if (server.info.started === 0) {
  console.log('Listening on ', server.info.uri);
  Mongoose.Promise = global.Promise;
  Mongoose.connect(config.mongo.uri, {}, (err) => {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
  });
}

module.exports = server;