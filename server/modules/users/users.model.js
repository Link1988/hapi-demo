'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  _id: {
    type: String
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userModel);