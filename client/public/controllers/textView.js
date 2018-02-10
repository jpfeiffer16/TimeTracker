angular.module('app')
  .controller('TextViewCtrl', function ($scope, $rootScope, $routeParams, StorageManager) {
    StorageManager.query('getDay', $routeParams.id, (day) => {
      $scope.day = day;
      $scope.dayText = day.tasks.map((task) => {
        return `${ task.description } - ${ task.time.toString().replace(/^[0]+/g,'') } ${ task.time == 1 ? 'hour' : 'hours' }`
      }).join('\n');
    });
  });