angular.module('app')
  .controller('TimeCtrl', function ($scope, $rootScope, $mdDialog,TimeManager, hotkeys, SettingsManager, InfoManager) {
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
    $scope.totalHours = 0;
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
    $scope.removeDay = function(id, index, ev) {
      console.log(id, index);
      // if (index == undefined) return;
      // $scope.days.splice(index, 1);
      if (!id) return;
      //TODO: Remove day here
      // console.log('Removing day!');
      // var confirm = $mdDialog.confirm()
      //   .title('Would you like to delete your debt?')
      //   .textContent('All of the banks have agreed to forgive you your debts.')
      //   .ariaLabel('Lucky day')
      //   .targetEvent(ev)
      //   .ok('Please do it!')
      //   .cancel('Sounds like a scam');
      TimeManager.removeDay(id, () => {
        InfoManager.showMessage('Day has been removed from the db');
        getDays(() => {
          $scope.filter();
        });
      });
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
          let lastOfWeek = new Date(firstOfWeek.getTime() + 6*24*60*60*1000);

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
          let firstOfMonth = new Date(currentDate.getTime() - currentDate.getDate()*24*60*60*1000);
          // let lastOfMonth = new Date(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).getTime() - 1*24*60*60*1000);

          $scope.days = internalDays.filter((day) => {
            let dayMSeconds = new Date(day.date).getTime();
            return dayMSeconds < currentDate.getTime() && dayMSeconds > firstOfMonth.getTime();
          });
        }
      },
      {
        name: 'Last Month',
        codeName: 'filterLastMonth',
        fn: function() {
          let beginDate = new Date();
          beginDate.setMonth(beginDate.getMonth() - 1);
          // let firstOfWeek = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate() - beginDate.getDay());
          // let lastOfWeek = new Date(beginDate.getFullYear(), beginDate.getMonth(), firstOfWeek.getDate() + 6);
          let firstOfMonth = new Date(beginDate.getFullYear(), beginDate.getMonth(), 1);
          let lastOfMonth = new Date(new Date(beginDate.getFullYear(), beginDate.getMonth() + 1, 1).getTime() - 1*24*60*60*1000);

          $scope.days = internalDays.filter((day) => {
            let dayMSeconds = new Date(day.date).getTime();
            return dayMSeconds > firstOfMonth.getTime() && dayMSeconds < lastOfMonth.getTime();
          });
        }
      }
    ];

    $scope.filter = function(codeName) {
      if (codeName) {
        runFilter(codeName);
        $scope.$apply();
      } else {
        runFilter($scope.selectedFilter);
        $scope.$apply();
      }
    };

    function runFilter(codeName) {
      console.log(codeName);
      $scope.filters.forEach((filter) => {
        if (filter.codeName === codeName) {
          console.log('Filtering');
          filter.fn();
          $scope.totalHours = getTotalHours();          
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


    $scope.sortType = 'date';
    $scope.searchDay = '';

    function getDays(cb) {
      TimeManager.getDays((days) => {
        internalDays = days;
        $scope.days = days;
        $scope.$apply();
        cb();
      });
    }

    function getTotalHours() {
      let total = 0;
      $scope.days.forEach((day) => { 
        // let total = 0;
        day.tasks.forEach(function(task) {
          total += task.time;
        });
      });
      return total;
    }

    // TimeManager.getDays((days) => {
    //   internalDays = days;
    //   $scope.days = days;
    //   $scope.$apply();
    // });

    getDays(() => {
      SettingsManager.getSettings((settings) => {
        if (settings && settings.selectedFilter && settings.selectedFilter != '') {
          $scope.selectedFilter = settings.selectedFilter;
          $scope.filter(settings.selectedFilter);
        }
      });
    });
  });
