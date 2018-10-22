let Product = require('../models/product');
let mongoose = require('mongoose');

/*
mongoose.connect(
    "mongodb+srv://jclewis1989:Yhxdcm71@tidepool-aquatics-oe4gx.mongodb.net/test?retryWrites=true"
)
*/

let products = [

    new Product({
    imagePath: 'https://cdn8.bigcommerce.com/s-62awz0hsj1/images/stencil/1280x1280/products/120/384/Red_Sea_Regal_Angel__67458.1497903289.jpg?c=2&imbypass=on',
    title: 'Red Regal Fish',
    description: 'Colorful Fish',
    price: 12.99,
    category: 'Fish',
    weight: 2,
    height: 3,
    width: 5,
    length: 12,
}),

new Product({
    imagePath: 'https://www.leisurepro.com/blog/wp-content/uploads/2009/09/fire-coral.jpg',
    title: 'Fire Coral',
    description: 'Colorful Dangerous Coral!',
    price: 43.78,
    category: 'Supplies',
    weight: '5',
    height: '4',
    width: '7',
    length: '9',
})

]

let done = 0;

for(let i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if(done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}