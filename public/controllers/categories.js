angular.module('app')
  .controller('CategoriesCtrl', function($scope, $rootScope, CategoriesManager, InfoManager, hotkeys) {
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

    $scope.removeCategory = function(categoryId, index) {
      CategoriesManager.removeCategory(categoryId, (err) => {
        if (err) {
          InfoManager.showMessage(err.message);
        } else {
          $scope.categories.splice(index, 1);
          InfoManager.showMessage('Removed Category');
        }
      });
    };
  });
