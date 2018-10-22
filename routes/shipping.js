// Address From Blake Johnston Lewis
/*let addressFrom = {
    "name":"Blake Johnston Lewis",
    "company":"Tidepool Aquatics",
    "street1":"1210 Piedra Morada Drive",
    "city":"Pacific Palisades",
    "state":"CA",
    "zip":"90272",
    "country":"US",
    "phone":"+1 310 600 4816",
    "email":"BlakeLewis1998@Gmail.com",
}

var addressTo = {
    "name": req.body.nameFirst,
    "street1": req.body.addressStreet,
    "street2": req.body.addressSuite,
    "city": req.body.addressCity,
    "state": req.body.addressState,
    "zip": req.body.postalCode,
    "country":"US",
    "phone": req.body.phone,
    "email": req.body.email
}

// Shippo Parcel and ONE parcel only!
let parcel = {
    "length": req.body.length,
    "width": req.body.width,
    "height": req.body.height,
    "distance_unit":"in",
    "weight": req.body.weight,
    "mass_unit":"lb",
}

shippo.shipment.create({
  "address_from": addressFrom,
  "address_to": addressTo,
  "parcels": [parcel],
  "async": false
})

.then(function(shipment) {
	shippo.shipment.rates(shipment.object_id)
	.then(function(rates) {
        console.log(parcel);
        let rate = rates.results[0].amount;
        let ship = new Ship(rate);
        let finalRate = ship.combine(rate, cart.totalPrice);
        res.render('clients/new-payment', {total: cart.totalPrice, rate: rate, finalRate: finalRate})
		// Get the first rate in the rates results for demo purposes.
	}).catch(function(err) {
		// Deal with an error
		console.log("There was an error retrieving rates : %s", err);
	})
}).catch(function(err) {
  console.log("This is an error!: " + err);
})
*/