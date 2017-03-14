var SettingManager = require('./settingsManager');

//TODO: Need hot-reload for this
var JiraClient = require('jira-connector');
var jira = null;
var username = '';
console.log('Constructing jira');

SettingManager.getSettings((settings) => {
  console.log('Got settings');
  username = settings.jira.username;
  jira = new JiraClient( {
      host: 'jira.bluemodus.com',
      protocol: 'http',
      basic_auth: {
          username: settings.jira.username,
          password: settings.jira.password
      }
  });
});

module.exports = {
  get jira() {
    return jira;
  },
  username: username
};