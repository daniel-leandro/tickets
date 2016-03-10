(function () {
  'use strict';

  // Eventos controller
  angular
    .module('eventos')
    .controller('ExcluirEventosController', ExcluirEventosController);

  ExcluirEventosController.$inject = ['$scope', '$state',  'eventoResolve', 'EventosService', '$timeout'];

  function ExcluirEventosController ($scope, $state,   evento, EventosService, $timeout) {
    var vm = this;

console.log('ExcluirEventosController');
 
    vm.evento = evento;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
 
  console.log("vm evento");
  console.log(vm.evento);
 

    // Remove existing Evento
    function remove() {
      console.log("remove");
       
        vm.evento.$remove($state.go('eventos.list'));
       
    }
     
     
  }
})();
