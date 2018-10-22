'use strict';

let CARD = (function() {

    // Stripe.setPublishableKey('pk_test_JRixRBE8l3GSBQIyVLw3Fo1B');

    let DOMStrings = {
        // Personal Data
        nameFirst: '.nameFirstInput',
        nameLast: '.nameLastInput',
        email: '.emailInput',
        addressStreet: '.addressStreetInput',
        addressSuite: '.addressSuiteInput',
        addressState: '.addressStateInput',
        addressCity: '.addressCityInput',
        postalInput: '.postalInput',
        phoneInput: '.phoneInput',
        // Credit Card Information
        number: '.ccNumber',
        code: '.code',
        expMonth: '.expMonth',
        expYear: '.expYear',
        zip: '.creditCardZip',
        submitPayment: '.submitPayment'
    }

    let number = document.querySelector(DOMStrings.number);
    let code = document.querySelector(DOMStrings.code);
    let expMonth = document.querySelector(DOMStrings.expMonth);
    let expYear = document.querySelector(DOMStrings.expYear);
    let zip = document.querySelector(DOMStrings.zip);
    let nameFirst = document.querySelector(DOMStrings.nameFirst);
    let nameLast = document.querySelector(DOMStrings.nameLast);
    let email = document.querySelector(DOMStrings.email);
    let addressStreet = document.querySelector(DOMStrings.addressStreet);
    let addressSuite = document.querySelector(DOMStrings.addressSuite);
    let addressState = document.querySelector(DOMStrings.addressState);
    let addressCity = document.querySelector(DOMStrings.addressCity);
    let postalInput = document.querySelector(DOMStrings.postalInput);
    let phoneInput = document.querySelector(DOMStrings.phoneInput);
    let submit = document.querySelector(DOMStrings.submitPayment);

    let valStrings = (x) => {
        let valString = /^[a-zA-Z]+$/;
        if(valString.test(x.value) && x.value.length >= 3) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let valEmail = (x) => {
        let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(emailRegex.test(x.value) && isNaN(x.value)) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    // Confirm email...

    let valAddress = (x) => {
        if(x.value) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let valState = (x) => {
        let stateRegEx = /^([Aa][LKSZRAEPlkszraep]|[Cc][AOTaot]|[Dd][ECec]|[Ff][LMlm]|[Gg][AUau]|[Hh][Ii]|[Ii][ADLNadln]|[Kk][SYsy]|[Ll][Aa]|[Mm][ADEHINOPSTadehinopst]|[Nn][CDEHJMVYcdehjmvy]|[Oo][HKRhkr]|[Pp][ARWarw]|[Rr][Ii]|[Ss][CDcd]|[Tt][NXnx]|[Uu][Tt]|[Vv][AITait]|[Ww][AIVYaivy])$/
        if(stateRegEx.test(x.value)) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let valCity = (x) => {
        if(x.value && x.value.length >= 3) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let valPostal = (x) => {
        let postalRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if(postalRegEx.test(x.value)) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let valPhone = (x) => {
        let phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if(phoneRegEx.test(x.value)) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
            return false;
        }
    }

    let validateNumber = (x) => {
        let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
        let amexpRegEx = /^(?:3[47][0-9]{13})$/;
        let discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

        if (visaRegEx.test(x)) {
            number.classList.add('success');
            return true;
          } else if(mastercardRegEx.test(x)) {
            number.classList.add('success');
            return true;
          } else if(amexpRegEx.test(x)) {
            number.classList.add('success');
            return true;
          } else if(discovRegEx.test(x)) {
            number.classList.add('success');
            return true;
          } else {
              number.classList.add('error');
              number.classList.remove('success');
              return false;
          }
        }

    let validateCode = (x) => {
        if(x.value.length < 5 && x.value.length > 2 && !isNaN(x.value)) {
            code.classList.add('success');
            return true;
        } else {
            code.classList.add('error');
            code.classList.remove('success');
            return false;
        }
    }

    let validateMonth = (x) => {
        if(x.value.length === 2 && !isNaN(x.value)) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
        }
    }

    let validateYear = (x) => {
        if(x.value.length === 4 && !isNaN(x.value)) {
            x.classList.add('success');
            return true;
        } else {
            x.classList.add('error');
            x.classList.remove('success');
        }
    }

    let eventListener = () => {
        submit.addEventListener('click', function(e) {
            // validateNumber(number.value) === true && validateCode(code) === true && validateMonth(expMonth) === true && valdiateYear(expYear) === true && 
            if(valStrings(nameFirst) === true && valStrings(nameLast) === true && valEmail(email) === true && valAddress(addressStreet) === true && valAddress(addressSuite) === true && valState(addressState) === true && valCity(addressCity) === true && valPostal(postalInput) === true && valPhone(phoneInput) === true) {
                return true;
            } else {
                e.preventDefault();
                /*
                validateNumber(number.value);
                validateCode(code);
                validateMonth(expMonth);
                validateYear(expYear);
                */
                valStrings(nameFirst);
                valStrings(nameLast);
                valEmail(email);
                valAddress(addressStreet);
                valAddress(addressSuite);
                valState(addressState);
                valCity(addressCity);
                valPostal(postalInput);
                valPhone(phoneInput);

            }
        })

    }

    return {
        init: function() {
            eventListener();
        }
    }

}());

CARD.init();