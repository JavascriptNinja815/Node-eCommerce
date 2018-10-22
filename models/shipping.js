'use strict';

module.exports = function Ship(rate, height, length, width, weight) {
    this.rate = rate;
    this.height = height,
    this.length = length,
    this.width = width,
    this.weight = weight

    this.calc = function(rate, id) {
        let calculatedRate = this.rate[id];
        if(!calculatedRate) {
            calculatedRate = {
                rate: 10
            }
        }
        this.rate = rate;
    },

    this.combine = function(rate, x) {
        let finalRate;
        finalRate = parseFloat(this.rate) + x;
        finalRate = (finalRate.toFixed(2));
        return finalRate;
    }
}

