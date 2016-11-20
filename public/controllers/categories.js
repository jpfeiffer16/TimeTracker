angular.module('app')
  .controller('CategoriesCtrl', function($scope, CategoriesManager) {
    CategoriesManager.getCategories((categories) => {
      console.log('done getting categories', categories);
      $scope.categories = categories;
      //$scope.$apply();
    });
  });
