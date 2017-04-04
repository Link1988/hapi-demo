'use strict';

const Controller = require('../modules/users/users.controller');
const userSchema = require('../modules/users/users.schema');

module.exports = [{
  method: 'GET',
  path: '/users',
  handler: Controller.index,
  config: {
    plugins: {
      'hapi-swagger': {
        responses: {
          '404': {
            'description': 'Not Found'
          }
        },
        payloadType: 'form'
      }
    },
    description: 'Get all users',
    notes: 'Returns all the users',
    tags: ['api']
  }
},
{
  method: 'GET',
  path: '/users/{id}',
  handler: Controller.get,
  config: {
    plugins: {
      'hapi-swagger': {
        responses: {
          '404': {
            'description': 'Not Found'
          }
        },
        payloadType: 'form'
      }
    },
    description: 'Get a single user',
    notes: 'Returns the information of a single user',
    tags: ['api'],
    validate: {
      params: {
        id: '60639370-1823-11e7-9fd5-bffd108dd422'
      },
    }
  }
},
{
  method: 'POST',
  path: '/users',
  handler: Controller.create,
  config: {
    pre: [{
      method: Controller.verifyUniqueUser
    }],
    validate: {
      payload: userSchema.createUserSchema
    },
    auth: false
  }
},
{
  method: 'PATCH',
  path: '/users/{id}',
  handler: Controller.update,
  config: {
    pre: [{
      method: Controller.verifyUniqueUser
    }],
    validate: {
      payload: userSchema.updateUserSchema
    },
    auth: false
  }
},
{
  method: 'DELETE',
  path: '/users/{id}',
  handler: Controller.remove,
}];