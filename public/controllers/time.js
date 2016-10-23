angular.module('app')
  .controller('TimeCtrl', function ($scope, TimeManager) {
    $scope.days = [];
    $scope.formatDate = (date) => {
      let obj = new Date(date);
      return obj.getMonth() + 1 + "/" + obj.getUTCDate() + "/" + obj.getFullYear();
    };
    $scope.getHours = (day) => {
      let total = 0;
      day.tasks.forEach(function(task) {
        total += task.time;
      });
      return total;
    };
    TimeManager.getDays((days) => {
      $scope.days = days;
      $scope.$apply();
    });
  });
