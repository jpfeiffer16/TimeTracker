angular.module('app')
  .controller('TimeCtrl', function ($scope, $rootScope, TimeManager, hotkeys, SettingsManager) {
    //Hotkey setup
    hotkeys
      .bindTo($scope)
      .add({
        combo: 'ctrl+n',
        description: 'New Day',
        callback: () => {
          $rootScope.navigate('/day');
        }
      });
    let internalDays = [];
    $scope.days = [];
    $scope.formatDate = (date) => {
      let obj = new Date(date);
      return obj.getMonth() + 1 + "/" + obj.getUTCDate() + "/" + obj.getFullYear();
    };
    $scope.getHours = (day) => {
      let total = 0;
      day.tasks.forEach(function(task) {
        total += task.time;
      });
      return total;
    };

    $scope.filters = [
      {
        name: 'All',
        codeName: 'all',
        fn: function() {
          $scope.days = internalDays;
        }
      },
      {
        name: 'This Week',
        codeName: 'filterWeek',
        fn: function() {
          let currentDate = new Date();
          let firstOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
          let lastOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstOfWeek.getDate() + 6);

          $scope.days = internalDays.filter((day) => {
            let dayMSeconds = new Date(day.date).getTime();
            return dayMSeconds > firstOfWeek.getTime() && dayMSeconds < lastOfWeek.getTime();
          });
        }
      },
      {
        name: 'Last Week',
        codeName: 'filterLastWeek',
        fn: function() {
          let beginDate = new Date();
          beginDate.setDate(beginDate.getDate() - 7);
          // dat.setDate(dat.getDate() + days);
          let firstOfWeek = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate() - beginDate.getDay());
          let lastOfWeek = new Date(beginDate.getFullYear(), beginDate.getMonth(), firstOfWeek.getDate() + 6);

          $scope.days = internalDays.filter((day) => {
            let dayMSeconds = new Date(day.date).getTime();
            return dayMSeconds > firstOfWeek.getTime() && dayMSeconds < lastOfWeek.getTime();
          });
        }
      },
      {
        name: 'This Month',
        codeName: 'filterMonth',
        fn: function() {
          let currentDate = new Date();
          let firstOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
          let lastOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstOfWeek.getDate() + 6);

          $scope.days = internalDays.filter((day) => {
            let dayMSeconds = new Date(day.date).getTime();
            return dayMSeconds > firstOfWeek.getTime() && dayMSeconds < lastOfWeek.getTime();
          });
        }
      },
      {
        name: 'Last Month',
        codeName: 'filterLastMonth',
        fn: function() {
          let beginDate = new Date();
          beginDate.setMonth(beginDate.getMonth() - 1);
          let firstOfWeek = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate() - beginDate.getDay());
          let lastOfWeek = new Date(beginDate.getFullYear(), beginDate.getMonth(), firstOfWeek.getDate() + 6);

          $scope.days = internalDays.filter((day) => {
            let dayMSeconds = new Date(day.date).getTime();
            return dayMSeconds > firstOfWeek.getTime() && dayMSeconds < lastOfWeek.getTime();
          });
        }
      }
    ];

    $scope.filter = function(codeName) {
      if (codeName) {
        runFilter(codeName);
      } else {
        runFilter($scope.selectedFilter);
      }
    };

    function runFilter(codeName) {
      console.log(codeName);
      $scope.filters.forEach((filter) => {
        if (filter.codeName === codeName) {
          console.log('Filtering');
          filter.fn();
          console.log($scope.days);
          SettingsManager.getSettings((settings) => {
            settings.selectedFilter = codeName;
            console.log(settings);
            SettingsManager.saveSettings(settings, () => {
              console.log('Filter Saved.');
            });
          });
        }
      });
    };

    $scope.selectedFilter = 'all';

    //Get settings for last used filter
    SettingsManager.getSettings((settings) => {
      if (settings && settings.selectedFilter && settings.selectedFilter != '') {
        $scope.selectedFilter = settings.selectedFilter;
        //TODO: This is bad. Make it immediate
        setTimeout(() => {
          $scope.filter(settings.selectedFilter);
          $scope.$apply();
        }, 300);
      }
    });

    $scope.sortType = 'date';
    $scope.searchDay = '';

    TimeManager.getDays((days) => {
      internalDays = days;
      $scope.days = days;
      $scope.$apply();
    });
  });
