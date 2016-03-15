'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ticket = mongoose.model('Ticket'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ticket
 */
exports.save = function(req, res) {
  var ticket = new Ticket(req.body);
  ticket.user = req.user;

  ticket.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ticket);
    }
  });
};
 