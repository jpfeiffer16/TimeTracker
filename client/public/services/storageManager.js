angular
    .module('app')
    .factory('StorageManager', function($http, SettingsManager) {
        let query = (cmd, params, cb) => {
            SettingsManager.getSettings((settings) => {
                $http.post(`http://127.0.0.1:3369/${ cmd }`, {db: settings.dbPath, params: params})
                .then((result) => {
                    cb(result.data);
                });
            });
        };

        return {
            query
        };
    });