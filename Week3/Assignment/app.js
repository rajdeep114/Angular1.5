(function() {
    'use strict';

    let module = angular.module('MyApp', []);

    module.controller('UserController', UserController);
   // module.controller('UserOutputController', UserOutputController);
    module.directive('userInput', UserInputDirective);
   // module.directive('userOutput', UserOutputDirective);
    module.service('MenuDataService', MenuDataService);

    function UserInputDirective() {
        let ddo = {
            templateUrl: 'user-input.html',
            controller: 'UserController as input'
        }
        return ddo;
    }

    UserController.$inject = ['MenuDataService'];
    function UserController(MenuDataService){
        let input = this;
        input.text = "";
        input.items = [];

        let response = MenuDataService.getMenuData();
        response.then(function(result) {
            input.items = result;
           // console.log(input.items);
        });
        
        input.narrowSearch = function() {
            MenuDataService.setInputText(input.text);
            //console.log('clicked')
            let response = MenuDataService.getMenuData();
            response.then(function(result) {
                input.items = result;
               // console.log(input.items);
            });

           // console.log( MenuDataService.getInputText());
        }
        
    }

    // UserOutputController.$inject = ['MenuDataService'];
    // function UserOutputController(MenuDataService) {
    //     let output = this;
    //     output.items = [];
    //     let response = MenuDataService.getMenuData();
    //     response.then(function(result) {
    //         output.items = result;
    //    //     console.log(output.items);
    //     });

    //     response.then(function(result) {
    //         console.log(result.data);
    //         output.items = result.data;
    //     }, function(result) {
    //         console.log(result);
    //     })
   // }

    // function UserOutputDirective() {
    //     let ddo = {
    //         templateUrl: 'user-output.html',
    //         controller: 'UserOutputController as output'
    //     }
    //     return ddo;
    // }

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        let service = this;
        let items = [];
        let searchedItems = [];
        service.inputText = ""

        //console.log(service.inputText);
        service.getMenuData = function() {
            return $http({
                method: 'GET',
                url:'http://davids-restaurant.herokuapp.com/categories.json'
            }).then(function(result) {
                items = result.data;
                let i = 0;
                searchedItems = [];
                //  {{item.name}}, {{item.short_name}}, {{item.special_instructions}}
                for( i = 0; i < items.length; i++) {
                    if(items[i].name.indexOf(service.inputText) !== -1) {
                    //  items[i].short_name.indexOf(service.inputText) !== -1 ||
                    // items[i].special_instructions.indexOf(service.inputText) !== -1) {
                        searchedItems.push(items[i]);
                      //  console.log(items[i]);
                    }
                }
                 console.log(searchedItems);
            //    console.log(items);
                return searchedItems;
            });
        } 

        service.setInputText = function(text) {
            service.inputText = text;
        }
        service.getInputText = function() {
            return service.inputText;
        }
    }

}());