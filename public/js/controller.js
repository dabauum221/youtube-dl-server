var controllerModule = angular.module('controllerModule', []);
controllerModule.controller('mainController', ['$scope', '$log', 'youtubeAPI', function($scope, $log, youtubeAPI) {
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
            .then(function() {
                // $scope.loading = false;
            });
    };
    
    $scope.download = function(url, title, index, watch) {
        $scope.downloading[index] = true;
        $log.info('Downloading %s', encodeURIComponent(url));
        var a = document.createElement("a");
        document.body.appendChild(a);
        if (watch === 'false') a.download = title + '.mp4';
        a.href = '/api/download?url=' + url + '&watch=' + watch;
        a.click();
        $scope.downloading[index] = false;
    };
}]);