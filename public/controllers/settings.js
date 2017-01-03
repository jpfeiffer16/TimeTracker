

angular.module('app')
  .controller('SettingsCtrl', function ($scope, $rootScope, hotkeys, SettingsManager, InfoManager) {
    const { dialog } = require('electron').remote;
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

    $scope.selectFile = () => {
      let selectedPath = dialog.showOpenDialog({properties: ['openFile']});
      if (selectedPath.length != 0) {
        $scope.settings.dbPath = selectedPath[0];
      }
    };

    SettingsManager.getSettings((settings) => {
      $scope.settings = settings;
    });
  });
