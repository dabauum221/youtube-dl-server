var controllerModule = angular.module('controllerModule', []);
controllerModule.controller('mainController', ['$scope', '$log', '$window', 'youtubeAPI', 'ngClipboard', function($scope, $log, $window, youtubeAPI, ngClipboard) {
    
    // Function to return true if the device is Apple Crap
    $scope.iPhone = function() {
        return navigator.userAgent.indexOf("iPhone") != -1;
    };

    $scope.toClipboard = ngClipboard.toClipboard;
    $scope.searches = [];
    $scope.getting_info = [];
    $scope.loading = false;
    
    $scope.search = function() {
        $scope.searches = {};
        $scope.loading = true;
        youtubeAPI.search(encodeURIComponent($scope.searchValue))
            .then(function(result) {
                // Process a successful call to getting YouTube video information
                if (result.status === 200) {
                    $scope.searches = angular.fromJson(result.data);
                    $scope.loading = false;
                } else {
                    // TODO: Display an error somwhere on the screen in it's own <div> tag that is never shown unless we get here
                }
            });
    };
    
    $scope.info = function(search, index) {
        search.getting_info = true;
        youtubeAPI.info(encodeURIComponent(search.link))
            .then(function(result) {
                // Process a successful call to getting YouTube video information
                if (result.status === 200) {
                    var res = angular.fromJson(result.data);
                    // console.log(res);
                    search.formats = { 'Auto': {'id': res.format_id, 'ext': res.ext} };
                    search.selectedFormat = search.formats['Auto'];
                    search.getting_info = false;
                } else {
                    search.getting_info = false;
                    search.error = true;
                    search.errorMsg = result.statusText;
                }
            });
    };
    
    $scope.download = function(search, watch) {
        $log.info('Downloading %s', encodeURIComponent(search.link));
        var a = document.createElement("a");
        document.body.appendChild(a);
        if (watch === 'false') a.download = search.title + '.' + search.selectedFormat.ext;
        a.href = $scope.getDownloadURL(search, watch, false);
        a.click();
    };
    
    $scope.getDownloadURL = function(search, watch = false, full = true) {
        return (full ? $window.location : '/') + 'api/download?url=' + search.link + '&watch=' + watch + '&title=' + encodeURIComponent(search.title) + '&ext=' + search.selectedFormat.ext + '&format=' + search.selectedFormat.id;
    };
}]);
