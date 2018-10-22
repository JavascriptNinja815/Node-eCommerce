'use strict';

const CART = (function() {

    let DOMStrings = {
        tab: '.tab',
        step1: '#step1',
        step2: '#step2',
        step3: '#step3',
        // Progress bar!
        p1: '#p1',
        p2: '#p2',
        p3: '#p3',
        btnNext: '.proceed',
        addressInput: {
            nameFirst: '.nameFirstInput',
            nameLast: '.nameLastInput',
            emailInput: '.emailInput',
            addressStreet: '.addressStreetInput',
            addressSuite: '.addressSuiteInput',
            addressState: '.addressStateInput',
            addressZipCode: '.addressPostalCodeInput',
            addressPhonePrimary: '.addressPhonePrimary',

        },
        spanInput: {
            nameFirst: '.nameFirstSpan',
            nameLast: '.nameLastSpan',
            email: '.emailSpan',
            streetSpan: '.shippingStreetSpan',
            suiteSpan: '.shippingSuiteSpan',
            stateSpan: '.shippingStateSpan',
            zipCodeSpan: '.shippingZipCode',
            countrySpan: '.shippingCountrySpan',
            phonePrimarySpan: '.shippingPhoneSpan',
        }
    }

    let tab = document.querySelectorAll(DOMStrings.tab);
    let btnNext = document.querySelectorAll(DOMStrings.btnNext);
    let step1 = document.querySelector(DOMStrings.step1);
    let step2 = document.querySelector(DOMStrings.step2);
    let step3 = document.querySelector(DOMStrings.step3);
    let p1 = document.querySelector(DOMStrings.p1);
    let p2 = document.querySelector(DOMStrings.p2);
    let p3 = document.querySelector(DOMStrings.p3);

    // Address Input
    let nfAddress = document.querySelector(DOMStrings.addressInput.nameFirst);
    let nlAddress = document.querySelector(DOMStrings.addressInput.nameLast);
    let emailAddress = document.querySelector(DOMStrings.addressInput.emailInput);
    let addressStreet = document.querySelector(DOMStrings.addressInput.addressStreet);
    let addressSuite = document.querySelector(DOMStrings.addressInput.addressSuite);
    let addressState = document.querySelector(DOMStrings.addressInput.addressState);
    let addressZipCode = document.querySelector(DOMStrings.addressInput.addressZipCode);
    let addressPhonePrimary = document.querySelector(DOMStrings.addressInput.addressPhonePrimary);

    // Span Input
    let nfSpan = document.querySelector(DOMStrings.spanInput.nameFirst);
    let nlSpan = document.querySelector(DOMStrings.spanInput.nameLast);
    let emailSpan = document.querySelector(DOMStrings.spanInput.email);
    let streetSpan = document.querySelector(DOMStrings.spanInput.streetSpan);
    let zipCodeSpan = document.querySelector(DOMStrings.spanInput.zipCodeSpan);
    let suiteSpan = document.querySelector(DOMStrings.spanInput.suiteSpan);
    let stateSpan = document.querySelector(DOMStrings.spanInput.stateSpan);
    let countrySpan = document.querySelector(DOMStrings.spanInput.countrySpan);
    let phonePrimarySpan = document.querySelector(DOMStrings.spanInput.phonePrimarySpan);

    let loadInitial = () => {
        window.onload = () => {
            for(let i = 1; i < tab.length; i++) {
                tab[i].style.display = 'none';
                p1.style.backgroundColor = '#AFEEEE';
                p1.style.color = '#ffffff';
            }
        }
    }

    let shipping = () => {
        for(let i = 0; i < btnNext.length; i++) {
            btnNext[i].addEventListener('click', function() {
                step1.style.display = 'none';
                step2.style.display = 'block';
                step3.style.display = 'none';

                // Progress bar!
                p2.style.backgroundColor = '#AFEEEE';
                p2.style.color = '#ffffff';
            })
        }
    }

    /*
    let payment = () => {
        for(let i = 1; i < btnNext.length; i++) {
            btnNext[i].addEventListener('click', function() {
                step1.style.display = 'none';
                step2.style.display = 'none';
                step3.style.display = 'block';
    
                // Progress Bar!
                p3.style.backgroundColor = '#AFEEEE';
                p3.style.color = '#ffffff';
            });
        }
    }
    */

    let hideClientCode = () => {
        let cc = document.querySelectorAll('.tab--clientCode');
        for(let i = 0; i < cc.length; i++) {
            cc[i].style.display = 'none';
        }
        // Hide client code but let it generate nonetheless
    }

    let carryInputOver = () => {
        for(let i = 1; i < btnNext.length; i++) {
            btnNext[i].addEventListener('click', function() {
                nfSpan.innerHTML = nfAddress.value;
                nlSpan.innerHTML = nlAddress.value;
                emailSpan.innerHTML = emailAddress.value;
                streetSpan.innerHTML = addressStreet.value;
                suiteSpan.innerHTML = addressSuite.value;
                stateSpan.innerHTML = addressState.value;
                zipCodeSpan.innerHTML = addressZipCode.value;
                phonePrimarySpan.innerHTML = addressPhonePrimary.value;
            })
        }
    }

    return {
        init: function() {
            hideClientCode();
            loadInitial();
            shipping();
            // payment();
            carryInputOver();
        }
    }

}());

CART.init();