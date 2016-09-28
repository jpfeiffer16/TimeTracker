angular.module('app')
  .controller('SidebarCtrl', function ($scope, $rootScope) {
    $scope.menuItemClick = (url) => {
      $rootScope.navigate(url);
      $rootScope.closeMenu();
    };
  });
