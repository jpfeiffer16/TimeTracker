//App actions here
angular.module('app')
  .factory('AppManager', function(MessagesService) {
    const closeApp = () => {
      MessagesService.sendMessage('closeApp');
    };
    
    const openLinkInNewWindow = (link) => {
      MessagesService.sendMessage('openLinkInNewWindow', link, function () {
        console.log(`${ link } opened in a new window`);
      });
    };

    return {
      closeApp,
      openLinkInNewWindow
    };
  });
