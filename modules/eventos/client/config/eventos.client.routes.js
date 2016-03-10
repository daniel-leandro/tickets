(function () {
  'use strict';

  angular
    .module('eventos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('eventos', {
        abstract: true,
        url: '/eventos',
        template: '<ui-view/>'
      })
      .state('eventos.list', {
        url: '',
        templateUrl: 'modules/eventos/views/list-eventos.client.view.html',
        controller: 'EventosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Eventos List'
        }
      })
      .state('eventos.next', {
        url: '/proximos',
        templateUrl: 'modules/eventos/views/nexteventos.client.view.html',
        controller: 'NextEventosController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Próximos Eventos'
        }
      })
      .state('eventos.create', {
        url: '/cadastro',
        templateUrl: 'modules/eventos/views/form-evento.client.view.html',
        controller: 'EventosController',
        controllerAs: 'vm',
        resolve: {
          eventoResolve: newEvento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Eventos Create'
        }
      })
      .state('eventos.edit', {
        url: '/:eventoId/editar',
        templateUrl: 'modules/eventos/views/form-evento.client.view.html',
        controller: 'EventosController',
        controllerAs: 'vm',
        resolve: {
          eventoResolve: getEvento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Evento {{ eventoResolve.name }}'
        }
      })
      .state('eventos.remove', {
        url: '/:eventoId/excluir',
        templateUrl: 'modules/eventos/views/excluir-evento.client.view.html',
        controller: 'ExcluirEventosController',
        controllerAs: 'vm',
        resolve: {
          eventoResolve: getEvento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Excluir Evento {{ eventoResolve.name }}'
        }
      })
       
      .state('eventos.nextview', {
        url: '/proximos/:eventoId',
        templateUrl: 'modules/eventos/views/nextview-evento.client.view.html',
        controller: 'nextViewEventosController',
        controllerAs: 'vm',
        resolve: {
          eventoResolve: getEvento
        },
        data:{
          pageTitle: 'Evento {{ articleResolve.name }}'
        }
      })
      .state('eventos.view', {
        url: '/:eventoId',
        templateUrl: 'modules/eventos/views/view-evento.client.view.html',
        controller: 'EventosController',
        controllerAs: 'vm',
        resolve: {
          eventoResolve: getEvento
        },
        data:{
          pageTitle: 'Evento {{ articleResolve.name }}'
        }
      })
    

      ;
  }

  getEvento.$inject = ['$stateParams', 'EventosService'];

  function getEvento($stateParams, EventosService) {
    return EventosService.get({
      eventoId: $stateParams.eventoId
    }).$promise;
  }

  newEvento.$inject = ['EventosService'];

  function newEvento(EventosService) {
    return new EventosService();
  }
   newTicket.$inject = ['TicketsService'];

  function newTicket(TicketsService) {
    return new TicketsService();
  }
})();
