// require('ssl-root-cas').inject();


var SettingManager = require('./settingsManager');

//TODO: Need hot-reload for this
var JiraApi = require('jira-client')
var jira = null;


SettingManager.getSettings((settings) => {
  jira = new JiraApi({
    protocol: 'http',
    host: settings.jiraBaseUrl,
    username: settings.jiraUsername,
    password: settings.jiraPassword,
    apiVersion: '2'
    // strictSSL: true
  });
});

module.exports = jira;

// jira.searchJira('assignee = jpfeiffer AND status != Closed')
//   .then(function(result) {
//     console.log(result.issues.map((issue) => {
//       return {
//         ticket: issue.key,
//         summary: issue.fields.summary
//       }
//     }));
//   })
//   .catch(function(err) {
//     console.error(err);
//   });