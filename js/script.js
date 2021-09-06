const nameBox = document.getElementById('name');
const email = document.getElementById('email');
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';


const activities = document.querySelector('#activities-box');

// dropdown for shirt design to change on the click
const shirtDesigns = document.getElementById('design');
const colors = document.getElementById('color');


// first box to get focused when user loads the page
nameBox.focus();

// shows and hides the messages for wrong input
function showOrHideTooltip(condition, element) {
    if (condition) {
        element.style.display = 'none';
        return false;
    } else {
        element.style.display = 'inherit';
        return true;
    }
}

function isValidName(text) {
    return /^[a-zA-Z]+$/.test(text);
}

function isValidEmail(text) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
}


function handler(element, validator) {
    const text = element.value;
    const isValid = validator(element.value);
    const condition = text !== '' && isValid;
    const tooltip = element.nextElementSibling;
    return showOrHideTooltip(condition, tooltip);
}

jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'inherit';
    } else {
        otherJobRole.style.display = 'none';
    }
});


if (shirtDesigns.value === 'Select Theme') {
    colors.disabled = true;
}

shirtDesigns.addEventListener('change', e => {
    if (shirtDesigns.value === 'Select Theme') {
        colors.disabled = true;
    }else{
        colors.disabled = false;
    }
    for (let each of colors) {
        // console.log();
        let theme = each.getAttribute('data-theme');
        if (theme === e.target.value) {
            each.style.display = 'inherit';
        } else {
            each.style.display = 'none';
        }
    }
});


const activitiesCost = document.querySelector('#activities-cost');

let selectedActivities = [];
let total = 0;
activities.addEventListener('change', e => {
    let cost = parseInt(e.target.getAttribute('data-cost'));
    let haveDayTime = e.target.getAttribute('data-day-and-time');

    if (haveDayTime) {
        if (!e.target.checked) {
            total -= cost;
            const index = selectedActivities.indexOf(haveDayTime);
            if (index > -1) {
                selectedActivities.splice(index, 1);
            }
        } else {
            total += cost;
            selectedActivities.push(haveDayTime);
        }
    } else {
        if (!e.target.checked) {
            total -= cost;
        } else {
            total += cost;
        }
    }


    for (let each of activities.children) {
        let venue = each.firstElementChild.getAttribute('data-day-and-time');
        if (!each.firstElementChild.checked && e.target !== each.firstElementChild && selectedActivities.indexOf(venue) > -1) {
            each.firstElementChild.disabled = true;
        } else {
            each.firstElementChild.disabled = false;
        }
    }

    activitiesCost.textContent = `Total: $${total}`;
});

const paymentBox = document.querySelector('.payment-method-box');
const creditCardBox = document.querySelector('#credit-card');
creditCardBox.style.display = 'none';

const paypal = document.querySelector('#paypal');
paypal.style.display = 'none';

const bitcoin = document.querySelector('#bitcoin');
bitcoin.style.display = 'none';


paymentBox.addEventListener('change', e => {
    if (e.target.tagName === 'SELECT') {
        if (e.target.value === 'paypal') {
            paypal.style.display = 'inherit';
        } else {
            paypal.style.display = 'none';
        }


        if (e.target.value === 'credit-card') {
            creditCardBox.style.display = 'inherit';
            creditCardBox.required = true;
        } else {
            creditCardBox.style.display = 'none';
            creditCardBox.required = false;
        }



        if (e.target.value === 'bitcoin') {
            bitcoin.style.display = 'inherit';
        } else {
            bitcoin.style.display = 'none';
        }


    }
})



function validateCreditCard(){
    const creditCardNumber = document.querySelector('#cc-num');
    const cvv = document.querySelector('#cvv');
    const zip = document.querySelector('#zip');


    let validccn = showOrHideTooltip(/^[0-9]{13,16}$/.test(creditCardNumber.value), creditCardNumber.nextElementSibling)
    let validicvv = showOrHideTooltip(/^[0-9]{3}$/.test(cvv.value), cvv.nextElementSibling);
    let validzip = showOrHideTooltip(/^[0-9]{5}$/.test(zip.value), zip.nextElementSibling);

    // console.log(validccn, validicvv, validzip);
    return  validccn && validicvv && validzip;
    // console.log(typeof(cvv));
    // console.log(/^\d{3}$/.test(cvv.value));
            

}

const paymentOption = document.querySelector('#payment');

document.querySelector('form').addEventListener('submit', e => {
    let isValid = true;
    if(handler(nameBox, isValidName)){
        e.preventDefault();
        nameBox.scrollIntoView({block: "center"});
        isValid = false;
    }


    if(handler(email, isValidEmail)){
        e.preventDefault();
        email.scrollIntoView({block: "center"});
        isValid = false;
    }

    if(paymentOption.value === 'credit-card'){
        if(!validateCreditCard()){
            email.scrollIntoView({block: "center"});
            isValid = false;
        }
    }

    if(isValid){
        e.preventDefault();
        console.log('all passed');
    }
    
});

