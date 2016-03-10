(function () {
  'use strict';

  angular
    .module('tickets')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tickets', {
        abstract: true,
        url: '/tickets',
        template: '<ui-view/>'
      })
      .state('tickets.list', {
        url: '',
        templateUrl: 'modules/tickets/views/list-tickets.client.view.html',
        controller: 'TicketsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tickets List'
        }
      })
      .state('tickets.create', {
        url: '/:eventoId/solicitacao',
        templateUrl: 'modules/tickets/views/form-ticket.client.view.html',
        controller: 'TicketsController',
        controllerAs: 'vm',
        resolve: {
          ticketResolve: newTicket,
              eventoResolve: getEvento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Tickets Create'
        }
      })
      .state('tickets.edit', {
        url: '/:ticketId/edit',
        templateUrl: 'modules/tickets/views/form-ticket.client.view.html',
        controller: 'TicketsController',
        controllerAs: 'vm',
        resolve: {
          ticketResolve: getTicket
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ticket {{ ticketResolve.name }}'
        }
      })
      .state('tickets.view', {
        url: '/:ticketId/:eventoId',
        templateUrl: 'modules/tickets/views/view-ticket.client.view.html',
        controller: 'TicketsController',
        controllerAs: 'vm',
        resolve: {
          ticketResolve: getTicket,
        eventoResolve: getEvento
        },
        data:{
          pageTitle: 'Ticket {{ articleResolve.name }}'
        }
      })
       .state('tickets.already', {
        url: '/:ticketId/:eventoId/inscrito',
        templateUrl: 'modules/tickets/views/already-ticket.client.view.html',
        controller: 'TicketsController',
        controllerAs: 'vm',
        resolve: {
          ticketResolve: getTicket,
        eventoResolve: getEvento
        },
        data:{
          pageTitle: 'Ticket {{ articleResolve.name }}'
        }
      });
  }

  getTicket.$inject = ['$stateParams', 'TicketsService'];

  function getTicket($stateParams, TicketsService) {
    return TicketsService.get({
      ticketId: $stateParams.ticketId
    }).$promise;
  }

  newTicket.$inject = ['TicketsService'];

  function newTicket(TicketsService) {
    return new TicketsService();
  }

  
  getEvento.$inject = ['$stateParams', 'EventosService'];

  function getEvento($stateParams, EventosService) {
    return EventosService.get({
      eventoId: $stateParams.eventoId
    }).$promise;
  }


  function newEvento(EventosService) {
    return new EventosService();
  }

})();
