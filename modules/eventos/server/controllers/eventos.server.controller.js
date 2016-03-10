'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Evento = mongoose.model('Evento'),
  Ticket = mongoose.model('Ticket'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Evento
 */
exports.create = function(req, res) {
  var evento = new Evento(req.body);
  evento.user = req.user;

  evento.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(evento);
    }
  });
};

/**
 * Show the current Evento
 */
exports.read = function(req, res) {
  
  // convert mongoose document to JSON
  var evento = req.evento ? req.evento.toJSON() : {};
  var tickets = req.tickets ? req.tickets  : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  evento.isCurrentUserOwner = req.user && evento.user && evento.user._id.toString() === req.user._id.toString() ? true : false;
  evento.tickets = tickets

  res.jsonp(  evento );
 
};

/**
 * Update a Evento
 */
exports.update = function(req, res) {
  var evento = req.evento ;

  evento = _.extend(evento , req.body);

  evento.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(evento);
    }
  });
};

/**
 * Delete an Evento
 */
exports.delete = function(req, res) {
  var evento = req.evento ;

  evento.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(evento);
    }
  });
};

/**
 * List of Eventos
 */
exports.list = function(req, res) { 
    

  Evento.find().sort('data').populate('user', 'displayName').exec(function(err, eventos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      
      res.jsonp(eventos);
    }
  });
};
 
 

/**
 * List of Next Eventos
 */
exports.next = function(req, res) { 
  
  var startDate = new Date();
  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);
  

  Evento.find({'data' :  {"$gte": startDate } , 'situacao' : 1}).sort('data').populate('user', 'displayName').exec(function(err, eventos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.jsonp(eventos);
    }
  });
};
/**
 * Evento middleware
 */
exports.eventoByID = function(req, res, next, id) {
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Evento is invalid'
    });
  }
  var eventTickets;
   Ticket.find({evento :  id }, function (err, docs) {
       // if (docs.length){
          eventTickets = docs;
            
        //}
    });

  Evento.findById(id).populate('user', 'displayName').exec(function (err, evento) {
    if (err) {
      return next(err);
    } else if (!evento) {
      return res.status(404).send({
        message: 'No Evento with that identifier has been found'
      });
    }
    req.evento = evento;
    req.tickets = eventTickets;
    next();
  });
};
