angular.module('app')
  .controller('TimeCtrl', function ($scope, MessagesService) {
    //TODO: Logic here 
    $scope.days = [];
    MessagesService.getDays((event, days) => {
      $scope.days = days;
    });
  });
