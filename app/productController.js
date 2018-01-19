angular.module('app').controller('productController', ['dataService', '$routeParams', '$window', 'cartData',
    function (dataService, $routeParams, $window, cartData) {
        var vm = this;
        vm.test = "HomeController Data und so";
        vm.products = {};
        var tempJSON = {};
        vm.qty = 1;

        vm.back = function() {
            $window.history.back();
        }



        var promise = dataService.getProducts();
        promise.then(function(data) {
            tempJSON = data;
            //vm.products = data;
            // console.log("log: " + vm.products);
            return tempJSON;
        })
        .then(function(tempJSON){
            for (var key in tempJSON) {
                var category = tempJSON[key];
                for(var subcategory in category.subcategories) {
                   var subcat = category.subcategories[subcategory];
                   for (var item in subcat.items) {
                       var product = subcat.items[item];
                       if(product.name == $routeParams.prodName) {
                        vm.product = product;
                       }
                   }
                }
            }
        });

        vm.addToCart = function () {
            //console.log(vm.product);
            //console.log(vm.qty);
            cartData.add(vm.product, vm.qty);
        }

    }
]);