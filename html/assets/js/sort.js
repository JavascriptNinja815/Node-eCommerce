'use strict';

let SORT = (function() {

    let DOMStrings = {
        categories: {
            fish: '.category--fish',
            tanks: '.category--tank',
            food: '.category--food',
            supplies: '.category--supplies',
            // Test then include additional
            catSpan: '.category'
        },
        blocks: {
            products: '.table--products__item'
        }
    }

    let fish = document.querySelector(DOMStrings.categories.fish);
    let tank = document.querySelector(DOMStrings.categories.tanks);
    let food = document.querySelector(DOMStrings.categories.food);
    let supplies = document.querySelector(DOMStrings.categories.supplies);
    let catSpan = document.querySelectorAll(DOMStrings.categories.catSpan);
    let product = document.querySelectorAll(DOMStrings.blocks.products);

    let sort = (x) => {
        let result;
        fish.addEventListener('click', function() {
            for(let i = 0; i < x.length; i++) {
            result = x[i].innerHTML;
            if(result === 'Fish') {
                product[i].style.display = 'block';
            } else {
                product[i].style.display = 'none';
            }
        }
        return result;
    });
        tank.addEventListener('click', function() {
            for(let i = 0; i < x.length; i++) {
                result = x[i].innerHTML;
                if(result === 'Tanks') {
                    product[i].style.display = 'block';
                } else {
                    product[i].style.display = 'none';
                }
            }
        });

        food.addEventListener('click', function() {
            for(let i = 0; i < x.length; i++) {
                result = x[i].innerHTML;
                if(result === 'Food') {
                    product[i].style.display = 'block';
                } else {
                    product[i].style.display = 'none';
                }
            }
        })

        supplies.addEventListener('click', function() {
            for(let i = 0; i < x.length; i++) {
                result = x[i].innerHTML;
                if(result === 'Supplies') {
                    product[i].style.display = 'block';
                } else {
                    product[i].style.display = 'none';
                }
            }
        })
}



    return {
        init: function() {
            sort(catSpan);
        }
    }

}());

SORT.init();