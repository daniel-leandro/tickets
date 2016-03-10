'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({
  nome: {
    type: String,
    default: '',
    required: 'Nome',
    trim: true
  },
   
  cpf: {
    type: String,
    default: '',
    required: 'CPF',
    trim: true
  },
  evento: {
    type: String,
  },
  already_register : {
    type: Number
  }
  
});

mongoose.model('Ticket', TicketSchema);
