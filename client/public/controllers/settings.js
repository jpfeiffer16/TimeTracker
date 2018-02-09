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
      
    };

    $scope.save = () => {
      SettingsManager.saveSettings($scope.settings, function () {
        InfoManager.showMessage('Settings Saved');
      });
    };

    $scope.selectFile = () => {
      let selectedPath = dialog.showOpenDialog({
        filters: [
          {name: 'SQLite Databases', extensions: ['sqlite']},
        ],
        title: 'Select DB',
        properties: ['openFile']
      });
      
      if (selectedPath && selectedPath.length != 0) {
        $scope.settings.dbPath = selectedPath[0];
      }
    };

    SettingsManager.getSettings((settings) => {
      $scope.settings = settings;
    });
  });
