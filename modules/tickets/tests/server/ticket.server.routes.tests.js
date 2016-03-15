'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ticket = mongoose.model('Ticket'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, ticket;

/**
 * Ticket routes tests
 */
describe('Rotas "Ticket" - Testes Unitários', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
     
      ticket = new Ticket({
        nome: 'Daniel Anselmo Leandro',
        cpf: '123.456.790-00',
        evento: '12345',
        already_register: 0
      });

      done();
  });
 
 

  it('Não permitir salvar um ticket sem informar o nome', function (done) {
    // Invalidate name field
    ticket.nome = '';
 
        // Save a new Ticket
        agent.post('/api/tickets')
          .send(ticket)
          .expect(400)
          .end(function (ticketSaveErr, ticketSaveRes) {
            // Set message assertion
            (ticketSaveRes.body.message).should.match('Nome');

            // Handle Ticket save error
            done(ticketSaveErr);
          });
  });


  it('Listar os tickets', function (done) {
    // Create new Ticket model instance
    var ticketObj = new Ticket(ticket);

    // Save the ticket
    ticketObj.save(function () {
      // Request Tickets
      request(app).get('/api/tickets')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });
  
   it('excluir um ticket', function (done) {
     
        // Save a new Ticket
        agent.post('/api/tickets')
          .send(ticket)
          .expect(200)
          .end(function (ticketSaveErr, ticketSaveRes) {
            // Handle Ticket save error
            if (ticketSaveErr) {
              return done(ticketSaveErr);
            }

            // Delete an existing Ticket
            agent.delete('/api/tickets/' + ticketSaveRes.body._id)
              .send(ticket)
              .expect(200)
              .end(function (ticketDeleteErr, ticketDeleteRes) {
                // Handle ticket error error
                if (ticketDeleteErr) {
                  return done(ticketDeleteErr);
                }

                // Set assertions
                (ticketDeleteRes.body._id).should.equal(ticketSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
  });

   
  afterEach(function (done) {
      Ticket.remove().exec(done);
  });
});
