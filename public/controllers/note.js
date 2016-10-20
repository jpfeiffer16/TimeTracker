angular.module('app')
  .controller('NoteCtrl', function($scope, $rootScope, $routeParams, NoteManager, InfoManager) {
    $scope.note = {};
    if ($routeParams.id) {
      NoteManager.getNote($routeParams.id, (note) => {
        $scope.note = note;
      });
    }

    $scope.save = function () {
      NoteManager.saveNote($scope.note, (note) => {
        InfoManager.showMessage('Note has been saved');
      });
    }

    $scope.back = function () {
      $rootScope.navigate('/notes');
    };
  });