let jiraIntegration = require('./modules/jira');
// setInterval(() => {
  
// }, 1000);


angular.module('app')
  .controller('DayCtrl',
    function (
      $scope,
      $rootScope,
      $routeParams,
      $q,
      $timeout,
      InfoManager,
      SettingsManager,
      StorageManager,
      hotkeys
    ) {
    //HotkeySetup
    hotkeys
      .bindTo($scope)
      .add({
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        combo: 'ctrl+s',
        decription: 'Save the current day',
        callback: () => {
          $scope.save();
        }
      })
      .add({
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        combo: 'ctrl+b',
        description: 'Back to day list',
        callback: () => {
          $scope.back();
        }
      });

    $scope.day = {
      date: new Date(),
      tasks: []
    };
    if ($routeParams.id) {
      getDay($routeParams.id);
    }

    $scope.back = function() {
      $rootScope.navigate('/time');
    };

    $scope.save = function() {
      //TODO: Change this as it's probably not very performant:
      $scope.day.date = new Date($scope.day.date);

      StorageManager.query('saveDay', $scope.day, (day) => {
        console.log('Save Day:');        
        console.log(day);
        getDay(day.id);
        InfoManager.showMessage('Day Saved');
      });
    };

    $scope.removeTask = function(id, index) {
      if (index == undefined) return;
      $scope.day.tasks.splice(index, 1);
      if (!id) return;
      StorageManager.query('removeTask', (id, () => {
        InfoManager.showMessage('Task Removed from DB');
      }));
      $scope.hours = getHours();
    }

    $scope.applyTask = function(taskRef, prop, value) {
      $scope.hours = getHours();
    };

    $scope.newTimeEntry = function () {
      $scope.day.tasks.push({ description: '', time: 0 });
    };

    $scope.checkShift = function(event) {
      if (event.key === 'Shift') {
        event.srcElement.step = .25;
      }
    }

    $scope.checkClearShift = function(event) {
      if (event.key === 'Shift') {
        event.srcElement.step = 1;
      }
    }

    $scope.syncTask = function(task, day) {
      let descriptionData = task.description.split(':');
      let issueKey = descriptionData[0].trim();
      let logDescription = '';
      if (descriptionData.length > 1) {
        logDescription = descriptionData[1].trim();
      }
      let workLog = {
          issueKey: issueKey,
          worklog: { 
              comment: logDescription,
              started: day.date.toISOString().slice(0, -1) + '+0000',
              // started: day.date.toISOString(),
              timeSpentSeconds: task.time * 60 * 60,
          }
      };
      task.syncing = true;
      jiraIntegration.jira.issue.addWorkLog(
        workLog, 
        function(err, result) {
          if (err) {
            console.error(err);
            task.synced = false;
            task.syncing = false;
            $scope.$apply();
            InfoManager.showMessage(`Error: ${ err.errorMessages[0] }`);
            return;
          }
          task.synced = true;
          task.syncing = false;
          $scope.$apply();
          StorageManager.query('saveDay', $scope.day, (day) => {
            InfoManager.showMessage('Task Synced');
          });
          console.log(result);
      });


    }

    //TODO: Need to fix this. Not very performant, or user-friendly.
    setTimeout(() => {
      SettingsManager.getSettings((settings) => {
        jiraIntegration.jira.search.search({
          jql: settings.jira.autoCompleteJql,
          maxResults: 1000
        }, function(err, result) {
          if (err) {
            console.error(err);
            return;
          }
          $scope.jiraTickets = result.issues.map((issue) => {
            return {
              ticket: issue.key,
              summary: issue.fields.summary,
              searchText: `${ issue.key }: ${ issue.fields.summary }`,
            }
          });
          $scope.jiraTicketLabels = $scope.jiraTickets.map((issue) => {
            return {
              value: issue.ticket,
              display: issue.searchText
            };
          });
        });
      });
    }, 1000);

    $scope.ticketQuerySearch = function (query) {
      var results = $scope.jiraTicketLabels.filter((ticket) => {
        return ~(ticket.display.toLowerCase().indexOf(query.toLowerCase()));
      });
      return results;
      // var deferred = $q.defer();
      // $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      // return deferred.promise;
    }

    function getDay(id) {
      StorageManager.query('getDay', id, (day) => {
        $scope.day = day;
        $scope.$apply();
        $scope.hours = getHours();
        $scope.$apply();
      });
    }

    function getHours() {
      if (!$scope.day.tasks || $scope.day.tasks.length == 0) return 0;

      let totalHours = 0;

      $scope.day.tasks.forEach((task) => {
        if (task.time) {
          totalHours += task.time;
        }
      });
      return totalHours;
    }
  });
