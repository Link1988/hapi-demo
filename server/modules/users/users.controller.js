'use strict';

const Boom = require('boom');
const User = require('./users.model');
const Service = require('./users.service');

function index(req, reply) {
  Service.getUsers().then((users, err) => {
    if(err) {
      return reply(Boom.wrap(err, 'Internal error'));
    }
    reply(users).code(200);
  });
}

function get(req, reply) {
  Service.getUser(req).then((user, err) => {
    if(err) {
      return reply(Boom.wrap(err, 'Internal error'));
    }
    if(!user) {
      return reply(Boom.notFound());
    }
    reply(user).code(200);
  });
}

function create(req, reply) {
  Service.createUser(req).then(function (user) {
    reply({
      user: {
        username: user.username,
        email: user.email
      }
    }).code(201);
  }).catch((err) => {
    throw Boom.badRequest(err);
  });
}

function update(req, reply) {
  Service.updateUser(req).then((result, err) => {
    if(err) {
      return reply(Boom.wrap(err, 'Internal error'));
    }
    if (result.n === 0) {
      return reply(Boom.notFound());
    }
    reply().code(204);
  });
}

function remove(req, reply) {
  Service.deleteUser(req).then((result, err) => {
    if(err) {
      return reply(Boom.wrap(err, 'Internal error'));
    }
    if (result.n === 0) {
      return reply(Boom.notFound());
    }
    reply().code(204);
  });
}

function verifyUniqueUser(req, reply) {
  Service.verifyUser(req).then((user, err) => {
    // Check if the user exists
    if(user) {
      if(user.username === req.payload.username) {
        return reply(Boom.badRequest('Username already taken'));
      }
      if(user.email === req.payload.email) {
        return reply(Boom.badRequest('Email already taken'));
      }
    }
    reply(req.payload).code(200);
  });
}

module.exports = {
  index: index,
  get: get,
  create: create,
  update: update,
  remove: remove,
  verifyUniqueUser: verifyUniqueUser,
};