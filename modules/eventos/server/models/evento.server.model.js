'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Evento Schema
 */
var EventoSchema = new Schema({
  nome: {
    type: String,
    default: '',
    required: 'Nome do Evento',
    trim: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  organizador: {
    type: String,
    default: '',
    required: 'Nome do Organizador',
    trim: true
  },
  descricao: {
    type: String,
    default: '',
     
  },
  lotacao: {
    type: Number,
    
     
  },
  tipo: {
    type: Number,
   min: 1, max: 4 
     
  },
    situacao: {
    type: Number,
    default: 1
     
  },
  
});

mongoose.model('Evento', EventoSchema);
