(function() {
    let injection = angular.module('DependencyInjection', []);
    // module.controller('DIcontroller', function() {...});

    /**
     * Ways to specify dependencies:
     * 1) injection.controller('DIcontroller', ['$scope', '$filter', DIcontroller])
     * 2) DIcontroller.$inject = ['$scope', '$filter'] ---- DIcontroller is a function object
     */
    injection.controller('DIcontroller', ['$scope', '$filter','$injector', DIcontroller]);
    /**
     * anything that starts with a dollar sign is a service in ng
     * $filter - it is kind of service that allow us to format the
     * way data is displayed to the user
     */

    function DIcontroller($scope, $filter, $injector) {
        $scope.name = 'raj';
        $scope.myFunc = function() {
            return 'name';
        };
        $scope.upper = function() {
            $scope.name = $filter('uppercase')($scope.name);
        };
        console.log($injector.annotate(DIcontroller));
    }
    
}());