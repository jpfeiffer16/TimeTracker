angular.module('app')
  .controller('CategoryCtrl', function($scope, $routeParams, CategoriesManager) {
    $scope.category = {
      title: ''
    };
    if ($routeParams.id) {
      CategoriesManager.getCategory($routeParams.id, (category) => {
        $scope.category = category;
        //$scope.$apply();
      });
    }
    $scope.save = function() {
      CategoriesManager.saveCategory($scope.category);
    };
  });
