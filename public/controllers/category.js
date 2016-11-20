angular.module('app')
  .controller('CategoryCtrl', function($scope, CategoriesManager) {
    $scope.category = {
      title: ''
    };
    if ($routeParams.id) {
      CategoriesManager.getCategory($routeParams.id, (category) => {
        $scope.category = category;
        //$scope.$apply();
      });
    }
  });
