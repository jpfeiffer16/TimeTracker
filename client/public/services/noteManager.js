angular.module('app')
  .factory('NoteManager', function(MessagesService) {
    const getNotes = (cb) => {
      MessagesService.sendMessage('getNotes', cb);
    };
    const getNote = (id, cb) => {
      MessagesService.sendMessage('getNote', id, function(day) {
        day.date = new Date(day.date);
        cb(day);
      });
    };
    const saveNote = (day, cb) => {
      MessagesService.sendMessage('saveNote', day, function(day) {
        cb(day);
      });
    };
    const removeNote = (noteId, cb) => {
      MessagesService.sendMessage('removeNote', noteId, cb);
    }
    return {
      getNotes,
      getNote,
      saveNote,
      removeNote
    }
  });
