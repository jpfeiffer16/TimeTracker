angular.module('app')
  .controller('MainCtrl', function ($scope, $rootScope, $routeParams, hotkeys) {
    hotkeys.add({
      combo: 'ctrl+w',
      decription: 'Close window',
      callback: $rootScope.closeWindow
    });
    hotkeys.add({
      combo: 'f2',
      decription: 'Toggle Menu',
      callback: $rootScope.toggleMenu
    });
    // $mdIconProvider
    //   .iconSet('navigation', 'img/icons/sets/social-icons.svg', 24)
    //   .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  });
