'use strict';

let TABLE = (function() {

    let DOMSTRINGS = {
        table: '.table--products',
        row: '.table--products__item',
        select: '.count--select__products',
        /*
        btn: '.btn--sort',
        search: '.table--search',
        */
        pagination: '.pagination--amount'
    }

    let table = document.querySelector(DOMSTRINGS.table);
    let row = document.querySelectorAll(DOMSTRINGS.row);
    let select = document.querySelectorAll(DOMSTRINGS.select);
    /*
    let btn = document.querySelector(DOMSTRINGS.btn);
    let search = document.querySelector(DOMSTRINGS.search);
    */
    let pagination = document.querySelector(DOMSTRINGS.pagination);

    // Return Select Value from the select DOMSTRINGS object

    let amount = () => {
        let result;
        for(let i = 0; i < select.length; i++) {
            result = select[i].value;
            result = JSON.parse(result);
        }
        return result;
    }

    let rowAmount = () => {
        let result;
        for(let i = 0; i < row.length; i++) {
            result = row[i];
        }
        return result;
    }

    /*

    let hideAll = (x) => {
        for(let i = x; i < row.length; i++) {
            row[i].style.display = 'block';
        }
    }
    */

    let displayAmount = (x, y) => {
        for(let i = y; i < x.length; i++) {
            x[i].style.display = 'none';
            console.log(x[i]);

        }
    }

    let eventListeners = () => {
        for(let i = 0; i < select.length; i++) {
            select[i].addEventListener('click', function() {
                displayAmount(rowAmount, amount);
            })
        }
    }
    
    // Search
    // Paginate


    return {
        init: function() {
            eventListeners();
        }
    }

}());

TABLE.init();