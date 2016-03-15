'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Evento = mongoose.model('Evento'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, evento;

/**
 * Evento routes tests
 */
describe('Rotas "Evento" - Testes Unitários', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });
 
  beforeEach(function(done) {
    
       evento = new Evento({
        nome: 'Nome do Evento',
        organizador: 'Nome do Organizador',
        data: "2016-03-14 00:00:00",
        lotacao: 100,
        tipo: 1,
        situacao: 1,
       
      });
      done();

      
  });


  it('Não permitir salvar um evento sem informar o nome', function (done) {
    // Invalidate name field
    evento.nome = '';

  

        // Save a new Evento
        agent.post('/api/eventos')
          .send(evento)
          .expect(400)
          .end(function (eventoSaveErr, eventoSaveRes) {
            // Set message assertion
            (eventoSaveRes.body.message).should.match('Nome do Evento');

            // Handle Evento save error
            done(eventoSaveErr);
          });
      
  });

  it('Atualizar um evento', function (done) {
    

        // Save a new Evento
        agent.post('/api/eventos')
          .send(evento)
          .expect(200)
          .end(function (eventoSaveErr, eventoSaveRes) {
            // Handle Evento save error
            if (eventoSaveErr) {
              return done(eventoSaveErr);
            }

            // Update Evento name
            evento.nome = 'Novo nome do evento';

            // Update an existing Evento
            agent.put('/api/eventos/' + eventoSaveRes.body._id)
              .send(evento)
              .expect(200)
              .end(function (eventoUpdateErr, eventoUpdateRes) {
                // Handle Evento update error
                if (eventoUpdateErr) {
                  return done(eventoUpdateErr);
                }

                // Set assertions
                (eventoUpdateRes.body._id).should.equal(eventoSaveRes.body._id);
                (eventoUpdateRes.body.nome).should.match('Novo nome do evento');

                // Call the assertion callback
                done();
              });
          });
      
  });

  it('listar os eventos', function (done) {
    // Create new Evento model instance
    var eventoObj = new Evento(evento);

    // Save the evento
    eventoObj.save(function () {
      // Request Eventos
      request(app).get('/api/eventos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('detalhes de um evento', function (done) {
    // Create new Evento model instance
    var eventoObj = new Evento(evento);

    // Save the Evento
    eventoObj.save(function () {
      request(app).get('/api/eventos/' + eventoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('nome', evento.nome);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Evento with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/eventos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Evento is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Evento which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Evento
    request(app).get('/api/eventos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Evento with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('excluir um evento', function (done) {
  

        // Save a new Evento
        agent.post('/api/eventos')
          .send(evento)
          .expect(200)
          .end(function (eventoSaveErr, eventoSaveRes) {
            // Handle Evento save error
            if (eventoSaveErr) {
              return done(eventoSaveErr);
            }

            // Delete an existing Evento
            agent.delete('/api/eventos/' + eventoSaveRes.body._id)
              .send(evento)
              .expect(200)
              .end(function (eventoDeleteErr, eventoDeleteRes) {
                // Handle evento error error
                if (eventoDeleteErr) {
                  return done(eventoDeleteErr);
                }

                // Set assertions
                (eventoDeleteRes.body._id).should.equal(eventoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
    
  });
 
  afterEach(function (done) {
    User.remove().exec(function () {
      Evento.remove().exec(done);
    });
  });
});
