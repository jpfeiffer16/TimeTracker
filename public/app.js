//Create and configure app here
angular
  .module('app', ['ngRoute', 'ngMaterial'])
  .config(($routeProvider, $locationProvider) => {
    //$locationProvider
    //  .html5Mode({
    //    enabled: true,
    //    requireBase: false
    //  });
    $routeProvider
      .when('/', {
        templateUrl: 'public/views/home.html',
        controller: 'HomeCtrl',
        page: 'home'
      }); 
  });
