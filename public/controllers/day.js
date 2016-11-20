angular.module('app')
  .controller('DayCtrl', function ($scope, $rootScope, $routeParams, hotkeys, TimeManager, InfoManager) {
    // hotkeys
    //   .bindTo($scope)
    //   .add({
    //     combo: 'ctrl+s',
    //     decription: 'Save the current day',
    //     callback: $scope.save
    //   });
    $scope.day = {
      date: new Date(),
      tasks: []
    };
    if ($routeParams.id) {
      TimeManager.getDay($routeParams.id, (day) => {
        $scope.day = day;
        $scope.$apply();
      });
    }

    $scope.back = function () {
      $rootScope.navigate('/time');
    };

    $scope.save = function () {
      TimeManager.saveDay($scope.day, (day) => {
        // $scope.day = day;
        InfoManager.showMessage('Day Saved');
      });
    };

    $scope.newTimeEntry = function () {
      $scope.day.tasks.push({ description: '', time: 0 });
    };

    $scope.$watch('day', (newValue) => {
      console.log(newValue);
      //$scope.$apply();
    });
    // $scope.getDate = (ticks) => {
    //   return new Date(ticks);
    // };
  });
