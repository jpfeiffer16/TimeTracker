

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
        $scope.hours = getHours();
        $scope.$apply();
      });
    }

    $scope.back = function() {
      $rootScope.navigate('/time');
    };

    $scope.save = function() {
      // console.log(localCopy);
      // console.log('------------------------');
      // console.log($scope);
      //TODO: Change this as it's probably not very performant:
      $scope.day.date = new Date($scope.day.date.toDateString());

      TimeManager.saveDay($scope.day, (day) => {
        // $scope.day = day;
        InfoManager.showMessage('Day Saved');
      });
    };

    $scope.removeTask = function(id, index) {
      if (index == undefined) return;
      $scope.day.tasks.splice(index, 1);
      if (!id) return;
      TimeManager.removeTask(id, () => {
        InfoManager.showMessage('Task Removed');
      });
    }

    $scope.applyTask = function(taskRef, prop, value) {
      // $scope.$apply();
      // console.log(`TestValue: ${ value }`);
      // // $scope.task[prop] = value;
      // $scope.day.tasks.forEach((task) => {
      //   if (task === taskRef) {
      //     console.log(`Value was ${ task[prop] }`);
      //     task[prop] = value;
      //     console.log(`Updating Value to ${ value }`);
      //   }
      // });
      // localCopy.day = JSON.parse(JSON.stringify($scope.day));
      // console.log('LocalCopy:', localCopy.day);

      $scope.hours = getHours();
    };

    $scope.newTimeEntry = function () {
      $scope.day.tasks.push({ description: '', time: 0 });
    };

    $scope.checkShift = function(event) {
      if (event.key === 'Shift') {
        event.srcElement.step = .25;
      }
    }

    $scope.checkClearShift = function(event) {
      if (event.key === 'Shift') {
        event.srcElement.step = 1;
      }
    }

    // $scope.$watch('day', (newValue) => {
    //   console.log(newValue);
    //   //$scope.$apply();
    //   $scope.hours = getHours();
    // });
    // $scope.getDate = (ticks) => {
    //   return new Date(ticks);
    // };


    function getHours() {
      if (!$scope.day.tasks || $scope.day.tasks.length == 0) return 0;

      let totalHours = 0;

      $scope.day.tasks.forEach((task) => {
        if (task.time) {
          totalHours += task.time;
        }
      });
      return totalHours;
    }
  });
