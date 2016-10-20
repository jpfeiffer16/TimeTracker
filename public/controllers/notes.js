angular.module('app')
  .controller('NotesCtrl', function ($scope, $mdSidenav, NoteManager) {
    NoteManager.getNotes((notes) => {
      $scope.notes = notes;
    });
  });
