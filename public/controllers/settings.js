angular.module('app')
  .controller('SettingsCtrl', function ($scope, $rootScope, hotkeys, SettingsManager, InfoManager) {
    const jiraIntegration = require('./modules/jira');
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

    $scope.jira = {
      verifying: false,
      verified: false
    };

    $scope.verifyJira = function() {
      $scope.verifying = true;
      try {
        var jira = jiraIntegration(
          $scope.settings.jira.baseUrl,
          $scope.settings.jira.username,
          $scope.settings.jira.password
        );
        // console.log(jira.jira);
        if (jira.jira == null) {
          $scope.verifying = false;
        } else {
          
        }
        //$scope.jira.verified = true;
      } catch (err) {
        $scope.jira.verified = false;
      }
      $scope.verifying = false;
    };

    $scope.save = function() {
      SettingsManager.saveSettings($scope.settings, function () {
        InfoManager.showMessage('Settings Saved');
      });
    };

    $scope.selectFile = function() {
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
      $scope.verifyJira();
    });
  });
