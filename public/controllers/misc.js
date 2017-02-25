angular.module('app')
  .controller('MiscCtrl', function ($scope, SettingsManager) {
    //Temporary
    $scope.doImport = () => {
      SettingsManager.getSettings((settings) => {
        SettingsManager.doImport(settings.filepath, function () {
          InfoManager.showMessage('Import Completed');
        });
      });
    };
  });