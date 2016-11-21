angular.module('app')
  .controller('SettingsCtrl', function ($scope, $rootScope, $mdSidenav, hotkeys, SettingsManager, InfoManager, hotkeys) {
    //Hotkey setup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+s',
        description: 'Save Settings',
        callback: () => {
          $scope.save();
        }
      });


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
