

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

    $scope.day = {
      date: new Date(),
      tasks: []
    };
    if ($routeParams.id) {
      getDay($routeParams.id);
    }

    $scope.back = function() {
      $rootScope.navigate('/time');
    };

    $scope.save = function() {
      //TODO: Change this as it's probably not very performant:
      $scope.day.date = new Date($scope.day.date.toDateString());

      TimeManager.saveDay($scope.day, (day) => {
        console.log('Save Day:');        
        console.log(day);
        getDay(day.id);
        InfoManager.showMessage('Day Saved');
      });
    };

    $scope.removeTask = function(id, index) {
      if (index == undefined) return;
      $scope.day.tasks.splice(index, 1);
      if (!id) return;
      TimeManager.removeTask(id, () => {
        InfoManager.showMessage('Task Removed from DB');
      });
      $scope.hours = getHours();
    }

    $scope.applyTask = function(taskRef, prop, value) {
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

    function getDay(id) {
      TimeManager.getDay(id, (day) => {
        $scope.day = day;
        $scope.$apply();
        $scope.hours = getHours();
        $scope.$apply();
      });
    }

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
