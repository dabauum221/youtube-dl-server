var controllerModule = angular.module('controllerModule', []);
controllerModule.controller('mainController', ['$scope', '$http', '$log', 'youtubeAPI', function($scope, $http, $log, youtubeAPI) {
    $scope.getInfo = function() {
        $log.info('Submitting %s to the server for youtube info', encodeURIComponent($scope.url));
        youtubeAPI.getInfo(encodeURIComponent($scope.url));
        // $log.info('Retrieved %s from the server', angular.fromJson(info).fulltitle);
        // $scope.info = angular.fromJson(info).fulltitle;
    };
}]);