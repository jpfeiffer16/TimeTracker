angular.module('app')
  .directive('rightClickNavigate', function (AppManager) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('contextmenu', function (e) {
          e.preventDefault();
          AppManager.openLinkInNewWindow(scope.$eval(attrs['rightClickNavigate']));
        });
      }
    };
  });