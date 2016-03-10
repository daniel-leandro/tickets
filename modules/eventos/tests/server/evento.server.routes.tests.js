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
describe('CRUD "Evento" - Testes Unitários', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });
 
  beforeEach(function(done) {
    
      evento = {
        name: 'Nome do Evento'
      };

      
  });


  it('Não permitir salvar um evento sem informar o nome', function (done) {
    // Invalidate name field
    evento.name = '';

  

        // Save a new Evento
        agent.post('/api/eventos')
          .send(evento)
          .expect(400)
          .end(function (eventoSaveErr, eventoSaveRes) {
            // Set message assertion
            (eventoSaveRes.body.message).should.match('Please fill Evento name');

            // Handle Evento save error
            done(eventoSaveErr);
          });
      
  });

  it('should be able to update an Evento if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

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
            evento.name = 'WHY YOU GOTTA BE SO MEAN?';

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
                (eventoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Eventos if not signed in', function (done) {
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

  it('should be able to get a single Evento if not signed in', function (done) {
    // Create new Evento model instance
    var eventoObj = new Evento(evento);

    // Save the Evento
    eventoObj.save(function () {
      request(app).get('/api/eventos/' + eventoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', evento.name);

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

  it('should be able to delete an Evento if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

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
  });

  it('should not be able to delete an Evento if not signed in', function (done) {
    // Set Evento user
    evento.user = user;

    // Create new Evento model instance
    var eventoObj = new Evento(evento);

    // Save the Evento
    eventoObj.save(function () {
      // Try deleting Evento
      request(app).delete('/api/eventos/' + eventoObj._id)
        .expect(403)
        .end(function (eventoDeleteErr, eventoDeleteRes) {
          // Set message assertion
          (eventoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Evento error error
          done(eventoDeleteErr);
        });

    });
  });

  it('should be able to get a single Evento that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Evento
          agent.post('/api/eventos')
            .send(evento)
            .expect(200)
            .end(function (eventoSaveErr, eventoSaveRes) {
              // Handle Evento save error
              if (eventoSaveErr) {
                return done(eventoSaveErr);
              }

              // Set assertions on new Evento
              (eventoSaveRes.body.name).should.equal(evento.name);
              should.exist(eventoSaveRes.body.user);
              should.equal(eventoSaveRes.body.user._id, orphanId);

              // force the Evento to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Evento
                    agent.get('/api/eventos/' + eventoSaveRes.body._id)
                      .expect(200)
                      .end(function (eventoInfoErr, eventoInfoRes) {
                        // Handle Evento error
                        if (eventoInfoErr) {
                          return done(eventoInfoErr);
                        }

                        // Set assertions
                        (eventoInfoRes.body._id).should.equal(eventoSaveRes.body._id);
                        (eventoInfoRes.body.name).should.equal(evento.name);
                        should.equal(eventoInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Evento.remove().exec(done);
    });
  });
});
