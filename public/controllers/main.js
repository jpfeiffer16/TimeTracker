angular.module('app')
  .controller('MainCtrl', function ($scope, $rootScope, $routeParams, hotkeys) {
    //TODO: Code here 
    hotkeys.add({
      combo: 'ctrl+w',
      decription: 'Close window',
      callback: $rootScope.closeWindow
    });
  });
