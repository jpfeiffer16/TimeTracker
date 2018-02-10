angular
    .module('app')
    .factory('StorageManager', function($http) {
        let query = (cmd, params, cb) => {
            $http.post(`http://127.0.0.1:3369/${ cmd }`, {params: params})
                .then((result) => {
                    cb(result.data);
                });
        };

        return {
            query
        };
    });