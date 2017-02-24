angular.module('app')
  .controller('TextViewCtrl', function ($scope, $rootScope, $routeParams, TimeManager) {
    TimeManager.getDay($routeParams.id, (day) => {
      $scope.day = day;
      $scope.dayText = day.tasks.map((task) => {
        return `${ task.description } - ${ task.time } ${ task.time == 1 ? 'hour' : 'hours' }`
      }).join('\n');
    });
  });