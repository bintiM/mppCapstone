angular.module('app').controller('navbarController', ['cartData',
    function (cartData) {
        var vm = this;
        
        vm.cartTotal = function () {
            return cartData.total();
        }
        // console.log(vm.cartTotal);
        
    }
]);