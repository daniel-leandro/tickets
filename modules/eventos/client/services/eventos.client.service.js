//Eventos service used to communicate Eventos REST endpoints
(function () {
  'use strict';

  angular
    .module('eventos')
    .factory('EventosService', EventosService);

  EventosService.$inject = ['$resource'];

  function EventosService($resource) {
    console.log("EventosService");
    return $resource('api/eventos/:eventoId', {
      eventoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
