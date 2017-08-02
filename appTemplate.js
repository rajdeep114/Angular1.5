(function() {
    'use strict';

    let module = angular.module('MyApp', []);

    module.controller('MyController', ['$scope', MyController]);

    function MyController($scope) {
        $scope.message = "jasdf";
    }
}());