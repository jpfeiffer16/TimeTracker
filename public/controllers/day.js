angular.module('app')
  .controller('DayCtrl', function ($scope, $rootScope, $routeParams, TimeManager) {
    TimeManager.getDay($routeParams.id, (day) => {
      $scope.day = day;
    });
    $scope.back = () => {
      $rootScope.navigate('/time');
    };
    // $scope.getDate = (ticks) => {
    //   return new Date(ticks);
    // };
  });
