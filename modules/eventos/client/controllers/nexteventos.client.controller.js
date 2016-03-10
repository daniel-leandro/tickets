(function () {
  'use strict';

  angular
    .module('eventos')
    .controller('NextEventosController', NextEventosController);

  NextEventosController.$inject = ['$scope','NextEventosService'];

  function NextEventosController($scope, NextEventosService) {
    var vm = this; 
 
    vm.eventos = NextEventosService.query();


var indexedEvents = [];
    
    $scope.datesToFilter = function() {
        indexedEvents = [];
        return vm.eventos;
    }
    
    $scope.filterDates = function(evento) {
        var dateIsNew = indexedEvents.indexOf(evento.data) == -1;
        if (dateIsNew) {
            indexedEvents.push(evento.data);
        }
        return dateIsNew;
    }

  }
})();
