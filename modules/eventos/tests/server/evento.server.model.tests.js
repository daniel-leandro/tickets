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
        nome: 'Nome do Evento',
        organizador: 'Nome do Organizador',
        data: "2016-03-14 00:00:00",
        lotacao: 100,
        tipo: 1,
        situacao: 1,
       
      });
      done();

      
  });

  describe('Método Salvar', function() {
    it('salvar o evento sem problemas', function(done) {
      this.timeout(0);
      return evento.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('exibir um erro ao tentar salvar um evento sem informar o nome', function(done) { 
      evento.nome = '';

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
