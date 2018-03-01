angular.module('app')
  .controller('NoteCtrl', function(
    $scope,
    $rootScope,
    $routeParams,
    InfoManager,
    StorageManager,
    hotkeys
  ) {
    //HotkeySetup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+s',
        decription: 'Save the current note',
        callback: () => {
          $scope.save();
        }
      })
      .add({
        combo: 'ctrl+b',
        description: 'Back to note list',
        callback: () => {
          $scope.back();
        }
      });

    $scope.note = {};
    if ($routeParams.id) {
      StorageManager.query('getNote', parseInt($routeParams.id), (note) => {
        $scope.note = note;
      });
    }

    StorageManager.query('getCategories', null, (categories) => {
      $scope.categories = categories;
      // $scope.$apply();
    });

    $scope.save = function () {
      StorageManager.query('saveNote', $scope.note, (note) => {
        InfoManager.showMessage('Note has been saved');
      });
    }

    $scope.back = function () {
      $rootScope.navigate('/notes');
    };
  });
