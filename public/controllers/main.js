angular.module('app')
  .controller('MainCtrl', function ($scope, $mdSidenav) {
    //TODO: Code here 
    $scope.toggle = () => {
      $mdSidenav('left').toggle();
    };
  });
