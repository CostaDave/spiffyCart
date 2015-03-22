/* global angular: false */

angular.module('spiffyCart.services', [])
.service('spiffyCartService', ['$rootScope', 'localStorageService', function($rootScope, localStorageService){
	'use strict';

	var cartItem = function (attrs) {

		_.extend(this, attrs);

		var basePrice = this.price;



		this.itemTotal = basePrice;

		this.updateQuantity = function (newQuantity) {
			this.quantity += newQuantity;
		}

		return this;
	}

	var cart = function () {
		this.shipping = 0;
		this.tax = 0;
		this.total = 0;
		this.subtotal = 0;
		this.items = [];

		return this;
	}

	this.cart =  new cart();

	this.getCart = function () {
		return this.cart;
	};

	this.addToCart = function (item) {

		if(!item || !item.sku) {
			return false;
		}

		var newItem = true;
		var currentQuantity = 0;

		var existingItems = this._getItemsBySku(item.sku);

		if (existingItems.length > 0) {
			for (var i = 0; i < existingItems.length; i++) {
				if (angular.equals(item.options, existingItems[i].options)) {
					newItem = false;
					currentQuantity = existingItems[i].quantity;
					break;
				}
			}
		}

		if (newItem) {
			this._addItemToCart(item);
		} else {
			this._updateItemQuantity(existingItems[i].id, parseInt(item.quantity));
		}
	};

	this._createId = function () {
		function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  	}
	  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	};

	this._addItemToCart = function (item, quantity) {
		var newItem = new cartItem({
			id: this._createId(),
			sku: item.sku,
			name: item.name,
			price: item.price,
			options: item.options,
			quantity: item.quantity,
      taxRate: item.taxRate,
      shipping: item.shipping,
      itemTax: 0,
			itemTotal: 0
		});

		this.cart.items.push(newItem);
		this._saveCart();
	};

  this._updateTotals = function () {

  };

	this._updateItemQuantity = function (item_id, newQuantity) {

		var item = this._getItem(item_id);
		item.updateQuantity(newQuantity)
		this._saveCart();
	};

	this._getItem = function (id) {
		return _.findWhere(this.cart.items, {'id':id});
	};

	this._getItemsBySku = function (sku) {
		return _.filter(this.cart.items, {'sku':sku});
	};

	this._retrieveCart = function () {

	};

	this._saveCart = function () {

    var itemTotal = 0;
		var newSubTotal = 0;
    var newTotal = 0;
    var totalTax = 0;
    var itemTax = 0;

		_.each(this.cart.items, function(item){
      itemTotal = item.price;

      if (_.isArray(item.options)) {
        _.each(item.options, function(option) {
          if (option.priceDiff !== 0) {
            itemTotal += option.priceDiff;
          }
        });
      };


      if (item.taxRate > 0) {
        console.log('this item has tax', item)
        //itemTax += itemTotal * item.taxRate;
        //itemTotal = Math.round((tax * item.quantity) * 100) / 100;
        //newTotal += Math.round(tax * 100) / 100;
        //item.itemTotal = newTotal;
        //totalTax += tax;
      }

      itemTotal = itemTotal * item.quantity;

      item.itemTax = Math.round(itemTotal * item.taxRate * 100) / 100;
      item.itemTotal = itemTotal + item.itemTax;
      newTotal += item.itemTotal;
      newSubTotal += item.itemTotal;
		}.bind(this));


    this.cart.tax = Math.round(totalTax * 100) / 100;
		this.cart.subtotal = newSubTotal;
    this.cart.total = newSubTotal + totalTax + this.cart.shipping;

		localStorageService.set('cart', this.cart);

		$rootScope.$broadcast('spiffyCart:cartUpdate', this.cart);
	};


}]);
