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
        page: 'notes'
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
  .run(($rootScope, $mdSidenav, $location, $route, AppManager, WindowManager) => {
    $rootScope.toggleMenu = () => {
      $mdSidenav('left').toggle();
    };

    $rootScope.closeMenu = () => {
      $mdSidenav('left').close();
    };

    $rootScope.navigate = (url) => {
      $location.path(url);
    };

    $rootScope.closeApp = () => {
      AppManager.closeApp();
    };


    $rootScope.closeWindow = () => {
      WindowManager.closeWindow();
    };

    Object.defineProperty($rootScope, 'currentPage', {
        get: function () {
            if ($route.current != undefined)
                return $route.current.page;
            else
                return '';
        }
    });
  });

//Global Type Additions

String.prototype.capitalize = function () {
  return this.slice(0, 1).toUpperCase() + this.slice(1);
};