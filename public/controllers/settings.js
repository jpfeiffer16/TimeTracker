angular.module('app')
  .controller('SettingsCtrl', function ($scope, $mdSidenav, SettingsManager) {
    $scope.settings = {
      mongoURL: ''
    };

    $scope.save = () => {
      SettingsManager.saveSettings($scope.settings);
    };

    SettingsManager.getSettings((settings) => {
      $scope.settings = settings;
    });
    


  });
