(function () {
  'use strict';

  // Tickets controller
  angular
    .module('tickets')
    .controller('TicketsController', TicketsController);

  TicketsController.$inject = ['$scope', '$state', 'Authentication', 'ticketResolve', 'eventoResolve'];

  function TicketsController ($scope, $state, Authentication, ticket, evento) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ticket = ticket;
    vm.evento = evento;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    console.log('TicketsController');
    console.log(vm);

    // Remove existing Ticket
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.ticket.$remove($state.go('tickets.list'));
      }
    }

    // Save Ticket
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ticketForm');
        return false;
      }
      vm.ticket.evento = vm.evento._id;

      // TODO: move create/update logic to service
      if (vm.ticket._id) {
        vm.ticket.$update(successCallback, errorCallback);
      } else {
        vm.ticket.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
      
        if(res.already_register == 1){
          $state.go('tickets.already', {
            ticketId: res._id,
            eventoId: vm.evento._id
          });
        } else {
          $state.go('tickets.view', {
            ticketId: res._id,
            eventoId: vm.evento._id
          });
        }
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
