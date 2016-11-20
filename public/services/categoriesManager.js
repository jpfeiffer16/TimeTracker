//Category actions here
angular.module('app')
  .factory('CategoriesManager', function(MessagesService) {
    function getCategories(cb) {
      MessagesService.sendMessage('getCategories', cb);
    }

    function getCategory(id, cb) {
      MessagesService.sendMessage('getCategories', id, cb);
    }

    return {
      getCategories,
      getCategory
    };
  });
