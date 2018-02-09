//Info actions here
angular.module('app')
  .factory('InfoManager', function($mdToast) {
    const showMessage = (message) => {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          // .position(pinTo)
          .hideDelay(2000)
      );
    };

    return {
      showMessage
    };
  });
