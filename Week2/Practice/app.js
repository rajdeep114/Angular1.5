//import customFilterFactory from './customFilterFactory';

(function() {
    'use strict';

    let module = angular.module('MyApp', []);
    module.filter('removeSpaces', RemoveSpaces);
    module.controller('MyController', ['$scope','$filter', '$timeout', 'removeSpacesFilter', MyController]);

    function MyController($scope, $filter, $timeout, removeSpacesFilter) {
        $scope.message = function() {
            let msg = "hello";
            // let x = $filter('[filter_name]') --> defination of filter function
            let filterUppercase = $filter('uppercase');

            // output = x(values) ---> output of filter function
            msg = filterUppercase(msg);
            return msg;
        }
        
        $scope.cost = 0;
/*************************************************************************************************************************/
       

        /**
         * Types of bidings:
         *  1) 2-way binding (ng-model): there are two listner - one on property on js side other on the input
         *  2) 1-way binding({{...}}): changes made in the controller
         *  3) 
         * 
         * 
         */

        $scope.incrementCounter = function() {
            $timeout(function() {
                $scope.cost++;
                    console.log('counter incremented');
                }, 1000);
            // $scope.$apply(function() {
            //     setTimeout(function() {
            //         $scope.cost++;
            //         console.log('counter incremented');
            //     }, 1000);
            // })
        }
/*************************************************************************************************************************/       
        /**
         * WATCHER
         * There are three ways to set a watcher on a property
         *  1) Using $scope.$watch() (not recommended)
         *  2) Using {{...}}    
         *  3) ng-model (it is a two way binding)
         * 
         * When ever we make a change to any property, angular goes through the digest loop twice atleast
         * 
         */

        $scope.counter = 0;
        $scope.notCounter = 0
        $scope.increment = function() {
            $scope.counter++;
        }
        $scope.notIncrement = function() {
            $scope.notCounter = 1;
        }
        console.log($scope.$$watchersCount);
        /*
            MANUAL WATCHERS

        // This function is only execute if the  value of property is changed
        $scope.$watch([property_we_want_to_watch], function(old_value, new_value))
            

        $scope.$watch('notCounter', function(new_value, old_value) {
            console.log('Old value of notCounter', old_value);
            console.log('New value of notCounter', new_value);
        });

        $scope.$watch('counter', function(new_value, old_value) {
            console.log('Old value of Counter', old_value);
            console.log('New value of Counter', new_value);
        });

         */

/*************************************************************************************************************************/
/**
 * CUSTOM FILTER
 * 
 * In order to create custom filter: we need to use Filter Factory design pattern.
 * There are two things to do to create custom filer:
 *  1) Create a filter factory function
 *      function customFactory() {
 *          return function actualFilter(value) {
 *              //changes made
 *              return updateValue
 *          }
 *      }
 *  2) Register filter with a module
 *      module.controller('myCTRL', MyCTRL);
 *      module.filter('custom', [Filter_factory_func_name]);
 *    
 *      When you inject filter in controller, append 'Filter' in the end of factory name
 *      MyCTRL.$inject('customFilter')
 *      function MyCTRL(customFilter) {
 *          customFilter
 *      }
 *      
 *      When you register a filter with angular, it calls the filter factory function
 *      and return the actual filter function for the user to use. The actual filter 
 *      function is append by Filter in the end.
 * 
 */

        $scope.test = "hello, jjfj";
        $scope.data = "";
        $scope.result = "";
        $scope.remove = function() {
            //let array = $scope.data.split(",");
            $scope.result = removeSpacesFilter($scope.data, 'happy');
        }
    }
    function RemoveSpaces() {
        return function (values, addString) {
            // for(var i = 0; i < values.length; i++) {
            //     console.log(values.length);
            //     console.log(i);
            //     console.log(values);
            //     values[i] = values[i].replace(/\s/g, "");
            //     //values[i] = values[i] + addString;
            // }
            values = values.replace(/\s/g, "");
            return values + addString;
        }
    }
/*************************************************************************************************************************/

}());