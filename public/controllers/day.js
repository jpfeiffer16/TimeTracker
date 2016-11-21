

angular.module('app')
  .controller('DayCtrl', function ($scope, $rootScope, $routeParams, TimeManager, InfoManager, hotkeys) {
    //HotkeySetup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+s',
        decription: 'Save the current day',
        callback: () => {
          $scope.save();
        }
      })
      .add({
        combo: 'ctrl+b',
        description: 'Back to day list',
        callback: () => {
          $scope.back();
        }
      });

    var localCopy = {};

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
      console.log(localCopy);
      console.log('------------------------');
      console.log($scope);
      TimeManager.saveDay($scope.day, (day) => {
        // $scope.day = day;
        InfoManager.showMessage('Day Saved');
      });
    };

    $scope.applyTask = function (taskRef, prop, value) {
      // $scope.$apply();
      console.log(`TestValue: ${ value }`);
      // $scope.task[prop] = value;
      $scope.day.tasks.forEach((task) => {
        if (task === taskRef) {
          console.log(`Value was ${ task[prop] }`);
          task[prop] = value;
          console.log(`Updating Value to ${ value }`);
        }
      });
      localCopy.day = JSON.parse(JSON.stringify($scope.day));
      console.log('LocalCopy:', localCopy.day);
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
