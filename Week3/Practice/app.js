(function() {
    'use strict';

    let module = angular.module('ShoppingList', []);

    module.controller('AddItemController', AddItemController);
    module.controller('DisplayItemController', DisplayItemController);
    module.service('ShoppingListService', ShoppingListService);
    module.service('CheckItemService', CheckItemService);
    module.directive('itemDetail', ItemDetail);
    module.directive('listItem', ListItem); 
    module.directive('inputButton', InputButton);
    module.directive('shoppingList', ShoppingList);

    function ShoppingList() {
        let ddo = { 
            scope: {
                itemList: '<', // one way binding 
                            //itemsList: '=myList' // binds my-list with shoppingList
                badRemove: '=',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'listCtrl',
            templateUrl: './shopping-list.html',
            bindToController: true
        };
        return ddo;
    }

    function ShoppingListDirectiveController() {
        let listCtrl = this;
        //console.log(listCtrl);

        listCtrl.sayHello = function() {
            console.log('hello');
            console.log(listCtrl.itemList)
        }
    }


    function InputButton() {
        let ddo = {
            templateUrl: './input-button.html'
        };
        return ddo;
    }
    
    function ListItem() {
        let ddo = {
            templateUrl: './list-item.html'
        }
        return ddo;
    }

    function ItemDetail(){
        let ddo = {
            templateUrl: './item.html'
        };
        return ddo;
    }

    function AddItemController(ShoppingListService) {
        let itemAdder = this;
        itemAdder.name = "";
        itemAdder.quantity = "";
        
        itemAdder.addItem = function() {
            ShoppingListService.addItem(itemAdder.name, itemAdder.quantity);
            itemAdder.name = "";
            itemAdder.quantity = "";
        }
        
    }

    function DisplayItemController(ShoppingListService) {
        let shoppingList = this;
        shoppingList.list = ShoppingListService.getItems();
        shoppingList.removeItem = function(index) {
            ShoppingListService.remove(index);
        }
       
    }

    ShoppingListService.$inject = ['$q', 'CheckItemService'];
    function ShoppingListService($q, CheckItemService) {
       let service = this;
       let items = [];

        service.remove = function(index) {
            console.log('here');
            items.splice(index, 1);
        }

        service.addItem = function(itemName, itemQuantity) {
            // ***** EVEN BETTER APPROACH
            let promiseName = CheckItemService.checkName(itemName);
            let promiseQuantity = CheckItemService.checkQuantity(itemQuantity);
            
            // If any promise in this array fails, error is thrown
            // then is only executed once all the promises are resolved
            $q.all([promiseName, promiseQuantity])
            .then(function(result) {
                let item = {
                    name: itemName,
                    quantity: itemQuantity
                };
                items.push(item);
                console.log(result[0].message);
            })
             .catch(function(errorResponse) {
                console.log(errorResponse.message);
            });

            
           // let promise = CheckItemService.checkName(itemName);
        
            // **** ONE WAY TO HANDLE PROMISES *****
            // promise.then(function(result) {
            //     let newPromise = CheckItemService.checkQuantity(itemQuantity);
            //     newPromise.then(function(result) {
            //         let item = {
            //             name: itemName,
            //             quantity: itemQuantity
            //         }
            //         items.push(item);
            //         console.log(result);                    
            //     }, function(result) {
            //         console.log(result);
            //     });
            // }, function(result) {
            //     console.log(result);
            // });

            // ***** BETTER WAY TO HANDLE PROMISES
            // promise
            // .then(function(result) {
            //     return CheckItemService.checkQuantity(itemQuantity); // this return a promise as well
            // })
            // .then(function(result) {
            //     let item = {
            //         name: itemName,
            //         quantity: itemQuantity
            //     };
            //     items.push(item);
            //     console.log(result.message)
            // })
            // .catch(function(errorResponse) {
            //     console.log(errorResponse.message);
            // });



        }

        service.getItems = function() {
            return items;
        }   
    }

    CheckItemService.$inject = ['$q', '$timeout'];
    function CheckItemService($q, $timeout) {
        let service = this;
       
        service.checkQuantity = function(quantity) {
            let deferred = $q.defer();
            let result = {
                message: ""
            }
            $timeout(function() {
                if(quantity > 5) {
                    result.message = "Don't eat that much!!"
                    deferred.reject(result)
                } else {
                    result.message = "Ok!"
                    deferred.resolve(result);
                }
            }, 500);
            return deferred.promise;
        }

        service.checkName = function(name) {
            let deferred = $q.defer();
            let result = {
                message: ""
            }
            //console.log(name);
            $timeout(function() {
                if(name.indexOf('cookie') !== -1) {
                    result.message = "Don't eat that much!!"
                    deferred.reject(result)
                } else {
                    result.message = "Ok!"
                    deferred.resolve(result);
                }
            }, 500);
            return deferred.promise;
        }
    }

}());

/**
 * Understanding Creating of promise
 *  In order to create promises manually, we need to use $q service.
 * Then, use $q.defer to create an async enviroment that includes the promise object
 * Promise is nothing but a hook to this async enviroment. Like a point it can passed
 * around in the program.
 * 
 * In order for a method to return promise, do following:
 * let promiseFunction = function($q, $timeout) {
 *   let deferred = $q.defer;
 *   
 *   $timeout(function() {
 *      if(...) {   
 *          deffered.resolve(result) // Marks successfull completetion of the task
 *      } else {
 *          deferred.reject(result) // Marks unsuccessfull completetion of the task
 *      }
 *      return deferred.promise;    // hook to async environment - will hold result once
 *                                      process completes
 *   }, 1000)
 * }
 */