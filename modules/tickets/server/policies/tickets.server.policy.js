'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Tickets Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/tickets',
      permissions: '*'
    }, {
      resources: '/api/tickets/:ticketId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/tickets',
      permissions: ['get', 'post']
    }, {
      resources: '/api/tickets/:ticketId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/tickets',
      permissions: ['get']
    }, {
      resources: '/api/tickets/:ticketId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Tickets Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    return next();
  
};
