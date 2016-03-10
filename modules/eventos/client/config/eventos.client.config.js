(function () {
  'use strict';

  angular
    .module('eventos')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Eventos',
      state: 'eventos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'eventos', {
      title: 'List Eventos',
      state: 'eventos.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'eventos', {
      title: 'Create Evento',
      state: 'eventos.create',
      roles: ['user']
    });
  }
})();
