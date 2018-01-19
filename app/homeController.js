angular.module('app').controller('homeController', ['dataService',
    function (dataService) {
        var vm = this;
        vm.products = {};

        dataService.getProducts().then(function(data) {
            vm.products = data;
        });
        dataService.getRandomProducts(12).then(function(items) {
            vm.featured = items;
        });
        
        vm.encode = function(item) {
            return window.encodeURIComponent(item);
        }
    }
]);