//Category actions here
angular.module('app')
  .factory('CategoriesManager', function(MessagesService) {
    function getCategories(cb) {
      MessagesService.sendMessage('getCategories', cb);
    }

    function getCategory(id, cb) {
      MessagesService.sendMessage('getCategory', id, cb);
    }

    function saveCategory(category, cb) {
      MessagesService.sendMessage('saveCategory', category, cb);
    }

    return {
      getCategories,
      getCategory,
      saveCategory
    };
  });
