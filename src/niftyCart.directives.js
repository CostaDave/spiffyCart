/* global angular: false */

angular.module('niftyCart.directives', [])

.directive('niftycartCartContents', ['niftyCartService', function(niftyCartService){
	'use strict';

	return {
		restrict: 'EAC',
		templateUrl: function (element, attrs) {
			return attrs.templateurl;
		},
		link: function (scope, element, attrs) {
			scope.localcart = {};
			scope.$on('niftyCart:cartUpdate', function (newVal, cart) {
				scope.$apply(function (){
					scope.localcart = cart
				})

			})
		}
	}
}])

.directive('niftycartAddtocart', [function(){
	'use strict';

	return {
		restrict: 'EAC',
		controller: 'CartController',
		scope: {
          sku:'@',
          name:'@',
          quantity:'@',
          price:'@',
          options:'@',
          taxrate: '@',
          shipping: '@',
          data:'='
      },
		link: function(scope, element, attrs) {

			element.bind('click', function(){
				var item = {
					sku: scope.sku,
					name: scope.name,
					quantity: parseInt(scope.quantity),
					price: parseInt(scope.price),
          taxRate: parseFloat(scope.taxrate),
          shipping: parseInt(scope.shipping),
					options: createOptionsArray()
				}
				scope.addToCart(item);
			})

			var createOptionsArray = function () {

				if (scope.options == '') {
					return [];
				}

				var opts = JSON.parse(scope.options);
        var options = [];

				_.forEach(opts, function (priceDiff, option) {
					if(priceDiff !== false) {
						options.push({
							name: option,
							priceDiff: priceDiff
						});
					}
				})

				options = _.sortBy(options, function(option) {return option.name});
				return options;
			}
		}
	};
}]);
