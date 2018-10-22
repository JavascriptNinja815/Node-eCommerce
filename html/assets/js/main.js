'use strict';

let MOD = (function() {

    let DOMStrings = {
        clientCode: '.nameLast',
        btn: '.btn--clientCode',
        clientCodeInput: '.clientCode',
    }

    let clientCode = document.querySelector(DOMStrings.clientCode);
    let btn = document.querySelector(DOMStrings.btn);
    let foo = document.querySelector('.foo');
    let clientCodeInput = document.querySelector(DOMStrings.clientCodeInput);

    let generateClientCode = () => {
        let randomNumber = Math.random().toString(9).substring(2, 6);
        let newclientCode = clientCode.value.substring(0, 3);
        newclientCode = newclientCode.toUpperCase();
        newclientCode = newclientCode + (randomNumber);
        clientCodeInput.value = newclientCode;
    }

    return {
        init: function() {
            btn.addEventListener('click', function() {
                generateClientCode();
            })
        }
    }

}());

MOD.init();