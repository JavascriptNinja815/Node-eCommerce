module.exports = function Cart(oldCart, height, length, width, weight, rate, tracking, label) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalCostOfCart = oldCart.totalCostOfCart || 0;
    this.TotalshippingRate = oldCart.shippingRate || 0;
    this.height = height;
    this.length = length;
    this.width = width;
    this.weight = weight;
    this.rate = rate;
    this.tracking = tracking;
    this.label = label;


    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0, rate: 0, length: 0, weight: 0, height:0 , width: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        this.totalPrice = parseFloat(this.totalPrice);
        this.height = storedItem.height;
        this.length = storedItem.length;
        this.width = storedItem.width;
        this.weight = storedItem.weight;
        this.rate = storedItem.rate;
        this.TotalshippingRate +=  storedItem.rate; // This line of code is the missing link
        this.totalCostOfCart = parseFloat(this.totalPrice) + parseFloat(storedItem.rate);

        if(storedItem.qty > 1) {
            console.log("Greater than one product in cart James");
        }
    };

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};