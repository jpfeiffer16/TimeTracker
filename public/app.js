//Create and configure app here
angular
  .module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'cfp.hotkeys'])
  .config(($routeProvider, $locationProvider) => {
    //$locationProvider
    //  .html5Mode({
    //    enabled: true,
    //    requireBase: false
    //  });
    $routeProvider
      .when('/', {
        redirectTo: '/time'
      })
      .when('/time', {
        templateUrl: 'public/views/time.html',
        controller: 'TimeCtrl',
        page: 'time',
        hotkeys: [
          ['ctrl+n', 'New Day', 'newDay()']
        ]
      })
      .when('/day/:id', {
        templateUrl: 'public/views/day.html',
        controller: 'DayCtrl',
        page: 'day'
      })
      .when('/notes', {
        templateUrl: 'public/views/notes.html',
        controller: 'NotesCtrl',
        page: 'home'
      })
      .when('/settings', {
        templateUrl: 'public/views/settings.html',
        controller: 'SettingsCtrl',
        page: 'settings',
        hotkeys: [
          ['ctrl+s', 'Save Settings', 'save()']
        ]
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
