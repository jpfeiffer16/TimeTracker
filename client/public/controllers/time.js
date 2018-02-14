angular.module('app')
  .controller('TimeCtrl', function (
      $scope,
      $rootScope,
      $window,
      $mdDialog,
      hotkeys,
      SettingsManager,
      InfoManager,
      StorageManager
    ) {
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
      return obj.getMonth() + 1 + 
        "/" + obj.getUTCDate() + 
        "/" + obj.getFullYear();
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
      StorageManager.query('removeDay', id, () => {
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
          // $scope.days = internalDays;
          return {};
        }
      },
      {
        name: 'This Week',
        codeName: 'filterWeek',
        fn: function() {
          let currentDate = new Date();
          let firstOfWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
          );
          let lastOfWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            firstOfWeek.getDate() + 7
          );

          return {
            dateFrom: firstOfWeek,
            dateTo: lastOfWeek
          };
        }
      },
      {
        name: 'Last Week',
        codeName: 'filterLastWeek',
        fn: function() {
          let beginDate = new Date();
          beginDate.setDate(beginDate.getDate() - 7);
          let firstOfWeek = new Date(
            beginDate.getFullYear(),
            beginDate.getMonth(),
            beginDate.getDate() - beginDate.getDay()
          );
          let lastOfWeek = new Date(firstOfWeek.getTime() + 7*24*60*60*1000);

          return {
            dateFrom: firstOfWeek,
            dateTo: lastOfWeek
          };
        }
      },
      {
        name: 'This Month',
        codeName: 'filterMonth',
        fn: function() {
          let currentDate = new Date();
          let firstOfMonth = new Date(
            currentDate.getTime() - currentDate.getDate()*24*60*60*1000
          );

         return {
           dateFrom: firstOfMonth,
           dateTo: currentDate
         };
        }
      },
      {
        name: 'Last Month',
        codeName: 'filterLastMonth',
        fn: function() {
          let beginDate = new Date();
          beginDate.setMonth(beginDate.getMonth() - 1);
          let firstOfMonth = new Date(
            beginDate.getFullYear(),
            beginDate.getMonth(),
            1
          );
          let lastOfMonth = new Date(
            new Date(beginDate.getFullYear(),
            beginDate.getMonth() + 1, 1).getTime() - 1*24*60*60*1000
          );

          return {
            dateFrom: firstOfMonth,
            dateTo: lastOfMonth
          };
        }
      }
    ];

    $scope.filter = function(codeName, cb) {
      if (codeName) {
        runFilter(codeName, cb);
        $scope.$apply();
      } else {
        runFilter($scope.selectedFilter, cb);
        $scope.$apply();
      }
      // if (cb) {
      //   cb();
      // }
    };

    function runFilter(codeName, cb) {
      console.log(codeName);
      $scope.filters.forEach((filter) => {
        if (filter.codeName === codeName) {
          console.log('Filtering');
          let { dateFrom, dateTo } = filter.fn();
          getDays(dateFrom, dateTo, () => {
            $scope.totalHours = getTotalHours();
            SettingsManager.getSettings((settings) => {
              settings.selectedFilter = codeName;
              console.log(settings);
              SettingsManager.saveSettings(settings, () => {
                console.log('Filter Saved.');
                if (cb) cb();
              });
            });
          });
        }
      });
    };

    $scope.selectedFilter = 'all';

    $scope.sortType = 'date';
    $scope.searchDay = '';

    function getDays(dateFrom, dateTo, cb) {
      StorageManager.query('getDays', {dateFrom, dateTo}, (days) => {
        internalDays = days;
        $scope.days = days;
        cb();
        $scope.$apply();
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

    SettingsManager.getSettings((settings) => {
      if (settings && settings.selectedFilter && settings.selectedFilter != '') {
        $scope.selectedFilter = settings.selectedFilter;
        $scope.filter(null, () => {
          let scrollY = $rootScope.viewDataScroll[$rootScope.currentPage];
          if (scrollY) {
            // angular.element..animate({ scrollTop: scrollY });
            $window.scrollTo(scrollY, scrollY);
          }
        });
        // setTimeout(() => {

        // }, 500);
      }
    });

    $scope.$watch('selectedFilter', (newVal, oldVal) => {
      console.log('Changed');
    });
  });
