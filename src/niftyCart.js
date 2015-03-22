/* global angular: false */

angular.module('niftyCart',['niftyCart.directives', 'niftyCart.services', 'LocalStorageModule'])


.config(['localStorageServiceProvider', function (localStorageServiceProvider){
    localStorageServiceProvider
    .setPrefix('niftyCart')
    .setStorageCookie(45, '/');
}])

.run(['$rootScope', function ($rootScope) {
   console.log('running niftyCart!');
}])

.provider('$niftyCart', function () {

     var shipping = false;
     var tax = false;
     this.$get = function () {

     };

 })

.controller('CartController',['$scope', 'niftyCartService', function($scope, niftyCartService) {
     //$scope.cart = niftyCartService.cart;
     $scope.addToCart = function(item){
        niftyCartService.addToCart(item);
     }
 }])