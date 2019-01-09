var controllerModule = angular.module('controllerModule', []);
controllerModule.controller('mainController', ['$window', '$scope', '$http', '$log', '$q', 'youtubeAPI', function($window, $scope, $http, $log, $q, youtubeAPI) {
    $scope.searches = [];
    $scope.loading = false;
    $scope.downloading = [];
    
    $scope.search = function() {
        $scope.searches = {};
        $scope.loading = true;
        youtubeAPI.search(encodeURIComponent($scope.searchValue))
            .then(function(result) {
                $scope.searches = angular.fromJson(result);
                $scope.loading = false;
            });
    };
    
    $scope.info = function(url) {
        // $scope.loading = true;
        youtubeAPI.info(encodeURIComponent(url))
            .then(function(result) {
                // $scope.loading = false;
            });
    };
    
    $scope.download = function(url, title, index, watch) {
        $scope.downloading[index] = true;
        $log.info('Downloading %s', encodeURIComponent(url));
        // $window.location.href = '/api/download/' + encodeURIComponent(url);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.download = title + '.mp4';
        a.href = '/api/download/' + encodeURIComponent(url) + '/' + watch;        
        a.click();
        $scope.downloading[index] = false;
    };
}]);