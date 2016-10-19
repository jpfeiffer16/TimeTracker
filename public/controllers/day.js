angular.module('app')
  .controller('DayCtrl', function ($scope, $rootScope, $routeParams, hotkeys, TimeManager) {
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
      });
    }

    $scope.back = () => {
      $rootScope.navigate('/time');
    };

    $scope.save = () => {
      TimeManager.saveDay($scope.day, (day) => {
        InfoManager.showMessage('Day Saved');
      });
    }
    // $scope.getDate = (ticks) => {
    //   return new Date(ticks);
    // };
  });
