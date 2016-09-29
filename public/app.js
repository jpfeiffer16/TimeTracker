//Create and configure app here
angular
  .module('app', ['ngRoute', 'ngMaterial', 'ngAnimate'])
  .config(($routeProvider, $locationProvider) => {
    //$locationProvider
    //  .html5Mode({
    //    enabled: true,
    //    requireBase: false
    //  });
    $routeProvider
      .when('/', {
        templateUrl: 'public/views/time.html',
        controller: 'TimeCtrl',
        page: 'time'
      })
      .when('/time', {
        templateUrl: 'public/views/time.html',
        controller: 'TimeCtrl',
        page: 'time'
      })
      .when('/notes', {
        templateUrl: 'public/views/notes.html',
        controller: 'NotesCtrl',
        page: 'home'
      })
      .when('/settings', {
        templateUrl: 'public/views/settings.html',
        controller: 'SettingsCtrl',
        page: 'settings'
      });
  })
  .run(($rootScope, $mdSidenav, $location) => {
    // const menu = null;
    // $rootScope.$on('$viewContentLoaded', function(){
    //   $mdSidenav('left');
    // });

    $rootScope.toggleMenu = () => {
      // menu.toggle();
      $mdSidenav('left').toggle();
    };

    $rootScope.closeMenu = () => {
      // menu.close();
      $mdSidenav('left').close();
    };

    $rootScope.navigate = (url) => {
      $location.path(url);
    };
  });
