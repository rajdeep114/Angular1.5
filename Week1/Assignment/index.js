(function() {
    'use strict';

    let lunch = angular.module('LunchApp', []);

    lunch.controller('LunchController', ['$scope', LunchController]);

    function LunchController($scope) {
        $scope.message = "";
        $scope.data = "";
        $scope.clickMe = function() {
            let food = [];
            if($scope.data.length == 0) {
                $scope.message = "Please enter text";
            } else {
                food = $scope.data.split(',');
                if(food.length > 3) {
                    $scope.message = "More than three";
                } else {
                    $scope.message = "three or less";
                }
            }
        }
    }


}());