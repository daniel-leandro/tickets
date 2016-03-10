'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Evento = mongoose.model('Evento');

/**
 * Globals
 */
var user, evento;

/**
 * Unit tests
 */
describe('Modelo "Evento" - Testes Unitários:', function() {
   
   beforeEach(function(done) {
    
      evento = new Evento({
        name: 'Ticket Name',
       
      });

      
  });

  describe('Método Salvar', function() {
    it('Salvar o evento sem problemas', function(done) {
      this.timeout(0);
      return evento.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('Exibir um erro ao tentar salvar um evento sem informar o nome', function(done) { 
      evento.name = '';

      return evento.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Evento.remove().exec(function(){
      
        done();  
      
    });
  });
});
