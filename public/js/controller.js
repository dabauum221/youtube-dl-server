var controllerModule = angular.module('controllerModule', []);
controllerModule.controller('mainController', ['$window', '$scope', '$http', '$log', '$q', 'youtubeAPI', function($window, $scope, $http, $log, $q, youtubeAPI) {
    $scope.searches = [];
    $scope.loading = false;
    $scope.idle = true;
    
    $scope.search = function() {
        $scope.searches = {};
        $scope.loading = true;
        $scope.idle = false;
        youtubeAPI.search(encodeURIComponent($scope.searchValue))
            .then(function(result) {
                $scope.searches = angular.fromJson(result);
                $scope.loading = false;
                $scope.idle = true;
            });
    };
    
    $scope.info = function(url) {
        // $scope.loading = true;
        youtubeAPI.info(encodeURIComponent(url))
            .then(function(result) {
                // $scope.loading = false;
            });
    };
    
    $scope.download = function(url) {
        $scope.loading = true;
        $log.info('Submitting %s to the server for youtube download', encodeURIComponent(url));
        $window.location.href = '/api/download/' + encodeURIComponent(url);
        $scope.loading = false;
        // $http.get('/api/download/' + encodeURIComponent(url))
            // .then( function (response, status, headers, config) {
                // $log.info(headers);
                // var file = new Blob([response.data], { type: "video/mp4" });
                // $window.location.href = encodeURIComponent(url);
            // });
    };
}]);