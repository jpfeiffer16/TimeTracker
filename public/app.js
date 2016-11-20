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
        page: 'day',
        hotkeys: [
          ['ctrl+s', 'Save Day', 'save()'],
          ['ctrl+b', 'Back', 'back()']
        ]
      })
      .when('/day', {
        templateUrl: 'public/views/day.html',
        controller: 'DayCtrl',
        page: 'day',
        hotkeys: [
          ['ctrl+s', 'Save Day', 'save()'],
          ['ctrl+b', 'Back', 'back()']
        ]
      })
      .when('/notes', {
        templateUrl: 'public/views/notes.html',
        controller: 'NotesCtrl',
        page: 'notes'
      })
      .when('/note', {
        templateUrl: 'public/views/note.html',
        controller: 'NoteCtrl',
        page: 'note',
        hotkeys: [
          ['ctrl+s', 'Save Note', 'save()'],
          ['ctrl+b', 'Back', 'back()']
        ]
      })
      .when('/note/:id', {
        templateUrl: 'public/views/note.html',
        controller: 'NoteCtrl',
        page: 'note',
        hotkeys: [
          ['ctrl+s', 'Save Note', 'save()'],
          ['ctrl+b', 'Back', 'back()']
        ]
      })
      .when('/categories/', {
        templateUrl: 'public/views/categories.html',
        controller: 'CategoriesCtrl',
        page: 'categories',
        hotkeys: [
          ['ctrl+n', 'New Category', 'new()'],
          ['ctrl+b', 'Back', 'back()']
        ]
      })
      .when('/category', {
        templateUrl: 'public/views/category.html',
        controller: 'CategoryCtrl',
        page: 'category',
        hotkeys: [
          ['ctrl+s', 'Save Category', 'save()'],
          ['ctrl+b', 'Back', 'back()']
        ]
      })
      .when('/category/:id', {
        templateUrl: 'public/views/category.html',
        controller: 'CategoryCtrl',
        page: 'category',
        hotkeys: [
          ['ctrl+s', 'Save Category', 'save()'],
          ['ctrl+b', 'Back', 'back()']
        ]
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
