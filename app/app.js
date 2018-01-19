angular.module('app', ['ngRoute', 'angular.filter'])

.service('dataService', function($http, $q) {
    var deferred = $q.defer();
    $http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json')
          .then(function (response) {
            deferred.resolve(response.data);  
            // return response.data;
          }, function (response) {
              return 'Error: ' + response.data.message;
          });
    
    this.getProducts = function() {
      return deferred.promise;
    }
    this.decode = function(item) {
      return window.decodeURIComponent(item);
    }
    this.encode = function(item) {
      return window.encodeURIComponent(item);
    }
    this.getRandomProducts = function(count) {
      return this.getProducts().then(function(data) {
        var featured = [];
        for (var key in data) {
          var category = data[key];
          for(var subcategory in category.subcategories) {
             var subcat = category.subcategories[subcategory];
             var randomIndex = Math.random() * subcat.items.length;
             var randomProduct = subcat.items[Math.round(randomIndex)];
             if(randomProduct != undefined && featured.length <= count++) featured.push(randomProduct);
          }
        }
        return featured;
    })
      

    }
  return this;
})



.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/ProductIndex/:catName/:subCatName', {
          templateUrl: 'productIndex.html',
          controller: 'productIndexController'
        })
        .when('/ProductIndex/:catName', {
          templateUrl: 'productIndex.html',
          controller: 'productIndexController'
        })
        .when('/ProductIndex', {
          templateUrl: 'productIndex.html',
          controller: 'productIndexController'
        })
        .when('/Cart', {
          templateUrl: 'cart.html',
          controller: 'cartController'
        })
        .when('/Contact', {
          templateUrl: 'contact.html',
          controller: 'contactController'
        })
        .when('/About', {
          templateUrl: 'about.html',
          controller: 'aboutController'
        })
       .when('/Product/:prodName', {
        templateUrl: 'product.html',
        controller: 'productController',
        })
        .when('/Product', {
          templateUrl: 'product.html',
          controller: 'productController',
          })
      .when('/Products/:catId/sub/:subId', {
        templateUrl: 'subCat.html',
        controller: 'subCatController'
      })
      .otherwise({
        templateUrl: 'home.html',
        controller: 'homeController'   
      });
})

.value('cartStorage', {
  items: [],
  name: 'teststorage'
})

.service('cartData', function() {
  
  this.items = [];
  this.name = "CartName";
  this.add = function(item, number) {
    var exists = false;
    for (i in this.items) {
      if(this.items[i].name == item.name) {
        exists = true;
        if(number) {
          this.items[i].qty = this.items[i].qty + number;  
        }
        else {
          this.items[i].qty = this.items[i].qty + 1;
        }
      }
    }
    if(!exists) {
      
      if(number) {
        item.qty = number;  
      }
      else {
        item.qty = 1;  
      }
      this.items.push(item);
    }
  }

  this.total = function() {
    var total = 0;
    for (i in this.items) {
      total = total + this.items[i].qty;
    }
    return total;
  }

  this.remove = function(item) {
    console.log("enter remove service");
    console.log(this.items);
    this.items = this.items.filter(function(i) { 
      return i !== item;
    });
    console.log("exit remove service");
    console.log(this.items);
  }
    /*
    for (i in this.items) {
      if(this.items[i].name == item.name) {
        this.items[i] = undefinded;
      }
    }
    */
  
return this;
})