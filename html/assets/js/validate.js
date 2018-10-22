'use strict';

let SHIP = (function() {

    let DOMStrings = {
        nameFirst: '.nameFirstInput',
        nameLast: '.nameLastInput',
        submitButton: '.submitButtonOne'
    };

    // Variables with query selector
    let nameFirst = document.querySelector(DOMStrings.nameFirst);
    let nameLast = document.querySelector(DOMStrings.nameLast);
    let submit = document.querySelector(DOMStrings.submitButton);

    let valString = /^[a-zA-Z]+$/;

    let valStrings = (x) => {
        if(valString.test(x.value) && x.value.length >= 3) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let eventListeners = function() {
        submit.addEventListener('click', function(e) {
            if(valStrings(nameFirst) === true && valStrings(nameLast) === true) {
                return true;
            } else {
                e.preventDefault();
                valStrings(nameFirst);
                valStrings(nameLast);
            }
        })
    }

    return {
        init: function() {  
            eventListeners();
        }
    }
}());

SHIP.init();
