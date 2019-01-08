var controllerModule = angular.module('controllerModule', []);
controllerModule.controller('mainController', ['$window', '$scope', '$http', '$log', 'youtubeAPI', function($window, $scope, $http, $log, youtubeAPI) {
    $scope.getInfo = function() {
        $log.info('Submitting %s to the server for youtube info', encodeURIComponent($scope.url));
        // youtubeAPI.getInfo(encodeURIComponent($scope.url));
        // $log.info('Retrieved %s from the server', angular.fromJson(info).fulltitle);
        // $scope.info = angular.fromJson(info).fulltitle;
    };
    
    $scope.search = function() {
        $http.get('/api/search/' + encodeURIComponent($scope.searchValue))
            .then( function (response, status, headers, config) {
                $log.info(response.data);
                $scope.searches = angular.fromJson(response.data);
            });
    };
    
    $scope.getInfo = function(url) {
        $log.info('Submitting %s to the server for youtube info', encodeURIComponent(url));
        $http.get('/api/info/' + encodeURIComponent(url))
            .then( function (response, status, headers, config) {
                $log.info(response.data.fulltitle);
                // $scope.info = angular.fromJson(response.data).fulltitle;
            });
    };
    
    $scope.download = function(url) {
        $log.info('Submitting %s to the server for youtube download', encodeURIComponent(url));
        $window.location.href = '/api/download/' + encodeURIComponent(url);
        //$http.get('/api/download/' + encodeURIComponent(url))
            //.then( function (response, status, headers, config) {
                //$log.info(headers);
                // var file = new Blob([response.data], { type: "video/mp4" });
                //$window.location.href = encodeURIComponent(url);
            //});
    };
}]);