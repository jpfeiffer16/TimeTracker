//Create and configure app here
angular
  .module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'cfp.hotkeys'])
  .config(($routeProvider, $locationProvider) => {
    $routeProvider
      .when('/', {
        redirectTo: '/time'
      })
      .when('/time', {
        templateUrl: 'public/views/time.html',
        controller: 'TimeCtrl',
        page: 'time'
      })
      .when('/day/:id', {
        templateUrl: 'public/views/day.html',
        controller: 'DayCtrl',
        page: 'day'
      })
      .when('/day', {
        templateUrl: 'public/views/day.html',
        controller: 'DayCtrl',
        page: 'day'
      })
      .when('/notes', {
        templateUrl: 'public/views/notes.html',
        controller: 'NotesCtrl',
        page: 'notes'
      })
      .when('/note', {
        templateUrl: 'public/views/note.html',
        controller: 'NoteCtrl',
        page: 'note'
      })
      .when('/note/:id', {
        templateUrl: 'public/views/note.html',
        controller: 'NoteCtrl',
        page: 'note'
      })
      .when('/categories/', {
        templateUrl: 'public/views/categories.html',
        controller: 'CategoriesCtrl',
        page: 'categories'
      })
      .when('/category', {
        templateUrl: 'public/views/category.html',
        controller: 'CategoryCtrl',
        page: 'category'
      })
      .when('/category/:id', {
        templateUrl: 'public/views/category.html',
        controller: 'CategoryCtrl',
        page: 'category'
      })
      .when('/settings', {
        templateUrl: 'public/views/settings.html',
        controller: 'SettingsCtrl',
        page: 'settings'
      }).when('/textView/:id', {
        templateUrl: 'public/views/textView.html',
        controller: 'TextViewCtrl',
        page: 'textview'
      });
  })
  .run(($rootScope, $mdSidenav, $location, $route, $window, AppManager, WindowManager) => {
    $rootScope.viewDataScroll = {};
    $rootScope.toggleMenu = () => {
      $mdSidenav('left').toggle();
    };

    $rootScope.closeMenu = () => {
      $mdSidenav('left').close();
    };

    $rootScope.navigate = (url) => {
      $rootScope.viewDataScroll[$rootScope.currentPage] = $window.scrollY;
      console.log($window.scrollY);
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
