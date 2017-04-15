angular.module('app')
  .controller('NotesCtrl', function ($scope, $mdSidenav, NoteManager, InfoManager) {
    NoteManager.getNotes((notes) => {
      $scope.notes = notes;
    });

    $scope.removeNote = function(noteId, index) {
      console.log('Executing');
      NoteManager.removeNote(noteId, () => {
        $scope.notes.splice(index, 1);
        InfoManager.showMessage('Note has been removed');
      });
    }
  });
