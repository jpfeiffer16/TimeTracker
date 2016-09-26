angular.module('app')
  .controller('MainCtrl', function ($scope, $mdSidenav) {
    //TODO: Code here 
    $scope.test = 'Test';
    $scope.toggle = () => {
      $mdSidenav('left').toggle();
    };
  });
