angular.module('app')
  .controller('NoteCtrl', function($scope, $rootScope, $routeParams, NoteManager, InfoManager, CategoriesManager, hotkeys) {
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
      NoteManager.getNote($routeParams.id, (note) => {
        $scope.note = note;
      });
    }

    CategoriesManager.getCategories((categories) => {
      $scope.categories = categories;
      $scope.$apply();
    });

    $scope.save = function () {
      NoteManager.saveNote($scope.note, (note) => {
        InfoManager.showMessage('Note has been saved');
      });
    }

    $scope.back = function () {
      $rootScope.navigate('/notes');
    };
  });
