'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Eventos Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/eventos',
      permissions: '*'
    }, {
      resources: '/api/eventos/:eventoId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/eventos',
      permissions: ['get', 'post']
    }, {
      resources: '/api/eventos/:eventoId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/eventos',
      permissions: ['get']
    }, {
      resources: '/api/eventos/:eventoId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Eventos Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  return next();
};
