angular.module('app')
  .controller('NotesCtrl', function ($scope, $mdSidenav, StorageManager, InfoManager) {
    StorageManager.query('getNotes', null, (notes) => {
      $scope.notes = notes;
    });

    $scope.removeNote = function(noteId, index) {
      console.log('Executing');
      StorageManager.query('removeNote', noteId, () => {
        $scope.notes.splice(index, 1);
        InfoManager.showMessage('Note has been removed');
      });
    }
  });
