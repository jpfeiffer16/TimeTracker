angular.module('app')
  .controller('CategoryCtrl', function($scope, $rootScope, $routeParams, CategoriesManager, InfoManager, hotkeys) {
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
      title: ''
    };
    if ($routeParams.id) {
      CategoriesManager.getCategory($routeParams.id, (category) => {
        $scope.category = category;
        $scope.$apply();
      });
    }
    $scope.save = function() {
      CategoriesManager.saveCategory($scope.category, () => {
        InfoManager.showMessage('Category Saved');
      });
    };

    $scope.back = function () {
      $rootScope.navigate('/categories');
    };
  });
