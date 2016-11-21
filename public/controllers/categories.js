angular.module('app')
  .controller('CategoriesCtrl', function($scope, $rootScope, CategoriesManager, hotkeys) {
    //Hotkey setup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+n',
        description: 'New Category',
        callback: () => {
          $rootScope.navigate('/category');
        }
      });

    CategoriesManager.getCategories((categories) => {
      console.log('done getting categories', categories);
      $scope.categories = categories;
      $scope.$apply();
    });
  });
