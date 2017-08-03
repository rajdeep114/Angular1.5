(function() {
    'use strict';

    let module = angular.module('ShoppingList', []);

    module.controller('ToBuyController', ToBuyController);
    module.controller('AlreadyBoughtController', AlreadyBoughtController);
    module.service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController(ShoppingListService) {
        let buy = this;
        buy.list = ShoppingListService.getBuyList();
        buy.message = "Everything is bought!";
        buy.checkOff = function(index) {
            ShoppingListService.buy(index); 
        }
        
    }

    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController(ShoppingListService) {
        let bought = this;
        bought.list = ShoppingListService.getBoughtList();
        bought.message = "Nothing bought yet!";
    }

    function ShoppingListService() {
        let service = this;

        let buyList = [
                        {name: 'cookie',quantity:10}, 
                        {name: 'car',quantity:12},
                        {name: 'boat',quantity:104}, 
                        {name: 'tractor',quantity:150},
                        {name: 'cookie',quantity:10}, 
                        {name: 'car',quantity:12},
                        {name: 'boat',quantity:104}, 
                        {name: 'tractor',quantity:150}
                        ];
        let boughtList = []

        service.buy = function(index) {
            let value = buyList.splice(index, 1)[0];
            boughtList.push(value);
        }

        service.getBuyList = function() {
            return buyList;
        }
         service.getBoughtList = function() {
            return boughtList;
        }
    }
}());