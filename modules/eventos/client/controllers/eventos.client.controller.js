(function () {
  'use strict';

  // Eventos controller
  angular
    .module('eventos')
    .controller('EventosController', EventosController);

  EventosController.$inject = ['$scope', '$state',  'eventoResolve', 'EventosService', '$timeout'];

  function EventosController ($scope, $state,   evento, EventosService, $timeout) {
    var vm = this;

    /*$scope.reload = function () {
       $state.go('.', {}, { reload: true });
      $timeout(function(){
            $scope.reload();
        },10000)
       };
    $scope.reload(); */
 
 
    vm.evento = evento;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.dateNow = new Date();
 
    var dataEvento = new Date(vm.evento.data);
    vm.futureEvent = dataEvento.getTime() > vm.dateNow.getTime() ? '1' : '0';
 

    // Remove existing Evento
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.evento.$remove($state.go('eventos.list'));
      }
    }
     
    // Save Evento
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.eventoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.evento._id) {
        vm.evento.$update(successCallback, errorCallback);
      } else {
        vm.evento.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('eventos.list', {
           
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
