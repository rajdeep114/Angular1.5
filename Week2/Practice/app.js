//import customFilterFactory from './customFilterFactory';

(function() {
    'use strict';

    let module = angular.module('MyApp', []);
    module.filter('removeSpaces', RemoveSpaces);
    //module.controller('Controller1', ['$scope','$filter', '$timeout', 'removeSpacesFilter', Controller1]);
    module.controller('Controller1', ['ShoppingListService', Controller1]);
    module.controller('Controller2', ['ShoppingListService', Controller2]);
    module.provider('ShoppingListService', ShoppingListServiceProvider);
    module.config(Config);

    Config.$inject('ShoppingListServiceProvider');
    function Config(ShoppingListServiceProvider) {
       // ShoppingListServiceProvider.
    }
    //module.service('ShoppingListService', ShoppingListService);
/*************************************************************************************************************************/
    function Controller1(ShoppingListService) {
        let itemAdder = this;
        itemAdder.name = "";
        itemAdder.quantity = "";
        
        itemAdder.addItem = function() {
            ShoppingListService.addItem(itemAdder.name, itemAdder.quantity);
            itemAdder.name = "";
            itemAdder.quantity = "";
        }
       
    }

    function Controller2(ShoppingListService) {
        let shoppingList = this;
        shoppingList.list = ShoppingListService.getItems();
        shoppingList.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        }
    }

    function ShoppingListService() {
       let service = this;
        let items = [];

        service.addItem = function(itemName, itemQuantity) {
            let item = {
                name: itemName,
                quantity: itemQuantity
            }
            items.push(item);
        }

        service.getItems = function() {
            return items;
        }   

        service.removeItem = function(itemIndex) {
            items.splice(itemIndex, itemIndex + 1);
        }

    }

    function ShoppingListServiceProvider() {
        let provider = this;
        provider.$get = function() {
            return new ShoppingListService();
        };
    }


/*************************************************************************************************************************/
    // CONTROLLER AS SYNTAX

    function ControllerParent1() {
    //     $scope.parentValue = 1;
    //     /**
    //      * "this" points to the controller function itself because when we call
    //      * module.controller, some where in the process controller function is 
    //      * initialized with the new keyword, thus point "this" to the ctrl itself
    //      */
    //    // $scope.pc = this;   
    //    // $scope.pc.value = 1;
    //     this.testvaule = 3;
    //     console.log($scope);
    //     console.log(window);
        let parent = this;
        parent.value = "parent";
        
    }
    function ControllerChild1() {
        // console.log($scope.parentValue);
        // console.log($scope);
        let child = this;
        child.value = "child";
    }

    function Controllessr1($scope, $filter, $timeout, removeSpacesFilter) {
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
 * Prototypal Inherientance: based on object instance. The original object instance became 
 * a prototype (template) for all subsequently create objects
 * 
 * For example:
 *  let child object, child = {}, which is based on parent object, parent = {type: "parent", method}
 * 
 *  If we do child.type, we see child object does not have that property. Therefore, the js engine
 *  would follow the prototype chain to find any parent object that has .type prorerty. 
 * 
 *  If the js engine finds such property in the hierarchical chain, that value is result else an 
 *  error occur. In our case we will ge the value "parent"
 */

    let parent = {
        value: 'parent',
        obj: {
            value: 'parentObj'
        },
        walk: function() {
            console.log('walking');
        }
    };

    // parent object is a prototype for child object
    let child = Object.create(parent);
   // console.log(child.value);
   // console.log(child.obj);

/*************************************************************************************************************************/
/**
 * ng-repeat - extends its functionality to the HTML element it is applied to
 */

        $scope.list = ['apple', 'car', 'mango', 'banana'];
        $scope.newItem = "";
        $scope.addItem = function() {
            if($scope.newItem.length > 0) {
                $scope.list.push($scope.newItem);
                $scope.newItem = "";
            }
        }
/*************************************************************************************************************************/       
        
        /**
         * Types of bidings:
         *  1) 2-way binding (ng-model): there are two listner - one on property on js side other on the input
         *  2) 1-way binding({{...}}): changes made in the controller
         *  3) 1-time binding({{ :: ...}}) changes made only one time and the watcher is removed
         * 
         * 
         */

        $scope.incrementCounter = function() {
            $timeout(function() {
                $scope.cost++;
                //    console.log('counter incremented');
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
        //console.log($scope.$$watchersCount);
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