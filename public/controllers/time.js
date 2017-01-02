angular.module('app')
  .controller('TimeCtrl', function ($scope, $rootScope, TimeManager, hotkeys) {
    //Hotkey setup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+n',
        description: 'New Day',
        callback: () => {
          $rootScope.navigate('/day');
        }
      });
    let internalDays = [];
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

    $scope.filterWeek = () => {
      let currentDate = new Date();
      let firstOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
      let lastOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstOfWeek.getDate() + 6);

      $scope.days = internalDays.filter((day) => {
        let dayMSeconds = new Date(day.date).getTime();
        return dayMSeconds > firstOfWeek.getTime() && dayMSeconds < lastOfWeek.getTime();
      });
    };

    $scope.filterMonth = () => {
      let currentDate = new Date();
      let firstOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
      let lastOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstOfWeek.getDate() + 6);

      $scope.days = internalDays.filter((day) => {
        let dayMSeconds = new Date(day.date).getTime();
        return dayMSeconds > firstOfWeek.getTime() && dayMSeconds < lastOfWeek.getTime();
      });
    };


    $scope.filterAll = () => {
      $scope.days = internalDays;
    };


    TimeManager.getDays((days) => {
      internalDays = days;
      $scope.days = days;
      $scope.$apply();
    });
  });
