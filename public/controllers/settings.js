angular.module('app')
  .controller('SettingsCtrl', function ($scope, $mdSidenav, hotkeys, SettingsManager, InfoManager) {
    $scope.settings = {
      mongoURL: ''
    };

    $scope.save = () => {
      SettingsManager.saveSettings($scope.settings, function () {
        InfoManager.showMessage('Settings Saved');
      });
    };

    //Temporary
    $scope.doImport = () => {
      SettingsManager.doImport($scope.settings.filepath, function () {
        InfoManager.showMessage('Import Completed');
      });
    };

    SettingsManager.getSettings((settings) => {
      $scope.settings = settings;
    });
  });
