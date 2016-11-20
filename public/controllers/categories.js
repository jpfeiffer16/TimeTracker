angular.module('app')
  .controller('CategoriesCtrl', function($scope, CategoriesManager) {
    CategoriesManager.getCategories((categories) => {
      $scope.categories = categories;
    });
  });
