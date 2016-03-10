(function () {
  'use strict';

  // Eventos controller
  angular
    .module('eventos')
    .controller('nextViewEventosController', nextViewEventosController);

  nextViewEventosController.$inject = ['$scope', '$state',  'eventoResolve'];

  function nextViewEventosController ($scope, $state,   evento) {
    var vm = this;

 
    vm.evento = evento;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
