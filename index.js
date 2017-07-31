(function() {
    'use strict';
    // (module name, list of dependencies)
    var moduleInstance = angular.module('NameCalculatorModule', []);

    // controller is the viewmodel: state of the view - modifiy the state of our div

    // view - div
    // viewmodel - controller - function
    // $scope is a special object that allows us to share data between view and viewmodel
    moduleInstance.controller('NameCalculatorController', function($scope) {
        /**
         * attaching a name property to $scope object, which can
         * be accessed on the view using data binding express - {{}}
         */
        $scope.name=""; 
        $scope.value = 0;
        $scope.codeFunc =  function(){
            let total = 0;
            for(let i = 0; i < $scope.name.length; i++) {
                total += $scope.name.charCodeAt(i);
            }
            $scope.value = total;
        } 
        
         // We can also attach functions to the scope object
        // $scope.happyDay = function() {
        //     return 'hello';
        // }
        
    });
  
}());