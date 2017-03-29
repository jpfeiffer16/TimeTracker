var SettingManager = require('./settingsManager');

//TODO: Need hot-reload for this
var JiraClient = require('jira-connector');

var Jira = function(jiraDomain, username, password) {
  var jira = null;
  var username = '';
  console.log('Constructing jira');
  if (!jiraDomain || !username || !password) {
    SettingManager.getSettings((settings) => {
      console.log('Got settings');
      username = settings.jira.username;
      jira = new JiraClient({
          host: settings.jira.baseUrl,
          protocol: 'http',
          basic_auth: {
              username: settings.jira.username,
              password: settings.jira.password
          }
      });
    });
  } else {
    jira = new JiraClient({
        host: jiraDomain,
        protocol: 'http',
        basic_auth: {
            username: username,
            password: password
        }
    });
  }

  return {
    get jira() {
      return jira;
    },
    username: username
  }
}

module.exports = Jira;