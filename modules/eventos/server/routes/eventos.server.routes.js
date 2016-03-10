'use strict';

/**
 * Module dependencies
 */
var eventosPolicy = require('../policies/eventos.server.policy'),
  eventos = require('../controllers/eventos.server.controller');

module.exports = function(app) {
  // Eventos Routes
  app.route('/api/eventos').all(eventosPolicy.isAllowed)
    .get(eventos.list)
 
    .post(eventos.create);
 app.route('/api/eventos/proximos').all(eventosPolicy.isAllowed)
    
    .get(eventos.next)
    .post(eventos.create);
     app.route('/api/eventos/ticket').all(eventosPolicy.isAllowed)
    
    .get(eventos.next)
    .post(eventos.create);

  app.route('/api/eventos/:eventoId').all(eventosPolicy.isAllowed)
    .get(eventos.read)
    .put(eventos.update)
    .delete(eventos.delete);

  // Finish by binding the Evento middleware
  app.param('eventoId', eventos.eventoByID);
};
