var serviceModule = angular.module('serviceModule', []);
serviceModule.factory('youtubeAPI', ['$http', '$log', function($http, $log) {
    return {
        search : function(value) {
            return $http.get('/api/search/' + value)
                .then( function(result) {
                    return result.data;
                });
        },
        
        info : function(url) {
            return $http.get('/api/info/' + url)
                .then( function(result) {
                    return result.data;
                });
        }
    };
}]);