(function () {
  'use strict';

  angular
    .module('eventos')
    .controller('NextEventosController', NextEventosController);

  NextEventosController.$inject = ['NextEventosService'];

  function NextEventosController(NextEventosService) {
    var vm = this; 
 
    vm.eventos = NextEventosService.query();
  }
})();
