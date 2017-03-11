// require('ssl-root-cas').inject();


var SettingManager = require('./settingsManager');

//TODO: Need hot-reload for this
var JiraApi = require('jira-client')
var jira = null;
console.log('Constructing jira');

SettingManager.getSettings((settings) => {
  console.log('Got settings');
  jira = new JiraApi({
    protocol: 'http',
    host: settings.jira.baseUrl,
    username: settings.jira.username,
    password: settings.jira.password,
    apiVersion: '2'
    // strictSSL: true
  });
  console.log(jira);
});

module.exports = {
  get jira() {
    return jira;
  }
};

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