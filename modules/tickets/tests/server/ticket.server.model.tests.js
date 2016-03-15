'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ticket = mongoose.model('Ticket');

/**
 * Globals
 */
var user, ticket;

/**
 * Unit tests
 */
describe('Modelo "Ticket" - Testes Unitários:', function() {
  beforeEach(function(done) {
     
      ticket = new Ticket({
        nome: 'Daniel Anselmo Leandro',
        cpf: '123.456.790-00',
        evento: '12345',
        already_register: 0
      });

      done();
  });

  describe('Método Salvar', function() {
    it('salvar o ticket sem problemas', function(done) {
      this.timeout(0);
      return ticket.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('exibir um erro ao tentar salvar um evento sem informar o nome', function(done) { 
      ticket.nome = '';

      return ticket.save(function(err) {
        should.exist(err);
        done();
      });
    });
    it('exibir um erro ao tentar salvar um evento sem informar o CPF', function(done) { 
      ticket.cpf = '';

      return ticket.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Ticket.remove().exec(function(){
      User.remove().exec(function(){
        done();  
      });
    });
  });
});
