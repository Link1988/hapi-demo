const Boom = require('boom');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const User = require('./users.model');
const Promise = require('bluebird');

function hashPassword(password) {
  // Generate a salt at level 10 strength
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
}

function getUsers() {
  return User.find().exec();
}

function getUser(req) {
  return User.findOne({
    _id: req.params.id
  }).exec();
}

function createUser(req) {
  return new Promise((resolve, reject) => {
    let user = new User();
    user._id = uuid.v1();
    user.email = req.payload.email;
    user.username = req.payload.username;
    hashPassword(req.payload.password).then(function (hash) {
      user.password = hash;
      resolve(user.save());
    }).catch((err) => {
      reject(err);
    });
  });
}

function updateUser(req) {
  return User.update({
    _id: req.params.id
  }, {
    $set: req.payload
  }).exec();
}

function deleteUser(req) {
  return User.remove({
    _id: req.params.id
  });
}

function verifyUser(req) {
  return User.findOne({
    $or:[
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }).exec();
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  verifyUser: verifyUser
}