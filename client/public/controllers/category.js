angular.module('app')
  .controller('CategoryCtrl',
    function($scope, $rootScope, $routeParams, StorageManager, InfoManager, hotkeys) {
    //Hotkey setup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+s',
        description: 'Save Category',
        callback: () => {
          $scope.save();
        }
      })
      .add({
        combo: 'ctrl+b',
        description: 'Back',
        callback: () => {
          $scope.back();
        }
      });

    $scope.category = {
      name: ''
    };
    if ($routeParams.id) {
      StorageManager.query('getCategory', parseInt($routeParams.id), (category) => {
        $scope.category = category;
        $scope.$apply();
      });
    }
    $scope.save = function() {
      StorageManager.query('saveCategory', $scope.category, () => {
        InfoManager.showMessage('Category Saved');
      });
    };

    $scope.back = function () {
      $rootScope.navigate('/categories');
    };
  });
