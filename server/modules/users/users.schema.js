'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional()
}).required().min(1);

module.exports = {
  createUserSchema: createUserSchema,
  updateUserSchema: updateUserSchema
}