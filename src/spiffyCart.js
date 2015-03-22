/* global angular: false */

angular.module('spiffyCart',['spiffyCart.directives', 'spiffyCart.services', 'LocalStorageModule'])


.config(['localStorageServiceProvider', function (localStorageServiceProvider){
    localStorageServiceProvider
    .setPrefix('spiffyCart')
    .setStorageCookie(45, '/');
}])

.run(['$rootScope', function ($rootScope) {
   console.log('running spiffyCart!');
}])

.provider('$spiffyCart', function () {

     var shipping = false;
     var tax = false;
     this.$get = function () {

     };

 })

.controller('CartController',['$scope', 'spiffyCartService', function($scope, spiffyCartService) {
     //$scope.cart = spiffyCartService.cart;
     $scope.addToCart = function(item){
        spiffyCartService.addToCart(item);
     }
 }])
