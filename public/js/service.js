var serviceModule = angular.module('serviceModule', []);
serviceModule.factory('youtubeAPI', ['$http', '$log', function($http, $log) {
    return {
        getInfo : function(url) {
            $http.get('/api/info/' + url)
                .then( function(data, status, headers, config) {
                    $log.info(data.data.fulltitle);
                });
        }
    };
}]);