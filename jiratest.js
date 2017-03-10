// JiraApi = require('jira').JiraApi;

// var jira = new JiraApi('https', 'jira.bluemodus.com', 80, 'jpfeiffer', 'joseph-m26', '2');
// jira.findIssue('SCT-53', function(error, issue) {
//     // console.log('Status: ' + issue.fields.status.name);
//     console.log(error);
// });

// jira.
require('ssl-root-cas').inject();

var JiraApi = require('jira-client')

var jira = new JiraApi({
  protocol: 'http',
  host: 'jira.bluemodus.com',
  username: 'jpfeiffer',
  // password: 'joseph-m26',
  apiVersion: '2'
  // strictSSL: true
});

// jira.findAll('SCT-53')
//   .then(function(issues) {
//     console.dir(issues, { depth: 30 });
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

jira.searchJira('assignee = jpfeiffer AND status != Closed')
  .then(function(result) {
    // console.dir(issues, { depth: 30 });
    // console.log(result.issues.map((issue) => {
    //   return issue.fields;
    // }));
    console.log(result.issues.map((issue) => {
      return {
        ticket: issue.key,
        summary: issue.fields.summary
      }
    }));
  })
  .catch(function(err) {
    console.error(err);
  });