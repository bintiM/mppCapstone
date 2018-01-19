angular.module('app').controller('productIndexController', ['dataService', '$routeParams', 'cartData',
    function (dataService, $routeParams, cartData) {
        var vm = this;
        
        vm.options = ['None', 'name', 'price', 'rating'];

        vm.inStockOnly = false;
        vm.filteredItemCount = 0;

        vm.products = {};
        if($routeParams.catName) {
            vm.category = $routeParams.catName;
        } else {
            vm.category = 0;
        }
        if($routeParams.subCatName) {
            vm.subCategory = $routeParams.subCatName;
        } else {
            vm.subCategory = 0;
        }
        
        // vm.addToCart = cartData.add;
        // vm.filter = {category: vm.category, subcategories: vm.subCategory};
        // vm.filter = {category: 'Household and Beauty'};
        vm.encode = function(item) {
            return window.encodeURIComponent(item);
        }

        dataService.getProducts().then(function(data) {
            vm.products = data;
            vm.categoryname = vm.products[vm.category].category;
            vm.subcategorylength = vm.products[vm.category].subcategories[vm.subCategory].items.length;
            vm.subcategoryname = vm.products[vm.category].subcategories[vm.subCategory].name;
        });

        vm.addToCart = function (item) {
            cartData.add(item);
        }

        vm.isInStock = function (item) {
            if(item.stock == 0 && vm.inStockOnly) {
                return false;
            }
            else {
                return true;
            }
        }

        vm.setFilteredItems = function(number) {
            vm.filteredItemCount = number;
        }
    }
]);