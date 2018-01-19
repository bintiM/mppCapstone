angular.module('app').controller('cartController', ['cartData',
    function (cartData) {
        var vm = this;
        
        vm.cartItems = cartData.items;

        vm.removeItem = function (item) {
            cartData.remove(item);
            vm.cartItems = cartData.items;
        }

        vm.total = function() {
            var total = 0;
            for (i in vm.cartItems) {
                total = total + vm.cartItems[i].price * vm.cartItems[i].qty;
            }
            return total;
        }
    }
]);