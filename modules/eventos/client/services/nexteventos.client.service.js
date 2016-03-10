//Eventos service used to communicate Eventos REST endpoints
(function () {
  'use strict';

  angular
    .module('eventos')
    .factory('NextEventosService', NextEventosService);

  NextEventosService.$inject = ['$resource'];

  function NextEventosService($resource) {
    console.log("NextEventosService");
    return $resource('api/eventos/proximos', {
      
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
