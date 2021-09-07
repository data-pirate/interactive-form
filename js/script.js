/***
 * Author: Damanpreet singh
 * Date: sept 6, 2021
 * Project: Interactive form
 */


const nameBox = document.getElementById('name');
const email = document.getElementById('email');


const activities = document.querySelector('#activities-box');

// dropdown for shirt design to change color according to the selected design
const shirtDesigns = document.getElementById('design');
const colors = document.getElementById('color');


// first box to get focused when user loads the page
nameBox.focus();

/***
 * `ShowOrHideTooltip` function
 * @params[condition] : boolean value representing whether to show msg or not
 * @params[element] : HTML element to for which the error message need to appear
 * @returns[boolean] : representing messge is visible or not
 * if the elemement provided has valid text then the 
 * tooltip disappears if not the error text appears
 ***/
function showOrHideTooltip(condition, element) {
    if (condition) {
        element.style.display = 'none';
        return false;
    } else {
        element.style.display = 'inherit';
        return true;
    }
}

/***
 * `isValidName` function
 * @params[text] : string, value of the input field
 * @returns[boolean] : representing is text is valid
 ***/
function isValidName(text) {
    return /^[\w ]+$/.test(text);
}


/***
 * `isValidEmail` function
 * @params[text] : string, value of the input field
 * @returns[boolean] : representing is text is valid
 ***/
function isValidEmail(text) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
}


/***
 * `handler` function
 * @params[element] : HTML element, to be validated
 * @params[validator]: fucntion, validtor function for the element
 * @returns[boolean] : representing error message is appearing or not
 ***/
function handler(element, validator) {
    const text = element.value;
    const isValid = validator(element.value);
    const condition = text !== '' && isValid;
    const tooltip = element.nextElementSibling;
    return showOrHideTooltip(condition, tooltip);
}


/***
 * Event listerner for the change
 * if user selects other job role the other job role text box should appear
 ***/

 const jobRole = document.getElementById('title');
 const otherJobRole = document.getElementById('other-job-role');

//  by default hte other job role field is hidden
 otherJobRole.style.display = 'none';

jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'inherit';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// if the user havn't selected any shirt design
// colors should be disabled
if (shirtDesigns.value === 'Select Theme') {
    colors.disabled = true;
}

/***
 * `Event listener` for shirt design change
 * if no shirt design is selected then the 
 * colors option will be disabled
 * 
 * and dynamically shows colors available only with specific desisgn
 */
 
shirtDesigns.addEventListener('change', e => {
    if (shirtDesigns.value === 'Select Theme') {
        colors.disabled = true;
    }else{
        colors.disabled = false;
    }
    for (let each of colors) {
        let theme = each.getAttribute('data-theme');
        if (theme === e.target.value) {
            each.style.display = 'inherit';
        } else {
            each.style.display = 'none';
        }
    }
});


const activitiesCost = document.querySelector('#activities-cost');

/***
 * `Event listener` for activities selection
 * if no shirt design is selected then the 
 * colors option will be disabled
 * 
 * and dynamically shows colors available only with specific desisgn
 */
let selectedActivities = [];
let selectedActivitiesVenue = [];
let total = 0;
activities.addEventListener('change', e => {
    let cost = parseInt(e.target.getAttribute('data-cost'));
    let haveDayTime = e.target.getAttribute('data-day-and-time');

    let eventName = e.target.nextElementSibling.textContent;
    // check if the selected element have day and time value associated
    if (haveDayTime) {
        // if the checkbox is not checked
        if (!e.target.checked) {
            total -= cost;
            const index = selectedActivitiesVenue.indexOf(haveDayTime);
            const index2 = selectedActivities.indexOf(eventName);
            // if user unchecked now then remove the event from the list
            if (index > -1) {
                selectedActivitiesVenue.splice(index, 1);
            }
            if (index2 > -1) {
                selectedActivities.splice(index, 1);
            }
        } else {
            // add new activity to the lst;
            total += cost;
            selectedActivities.push(eventName);
            selectedActivitiesVenue.push(haveDayTime);
        }
    } else {
        if (!e.target.checked) {
            total -= cost;
            const index2 = selectedActivities.indexOf(eventName);
            if (index2 > -1) {
                selectedActivities.splice(index2, 1);
            }
        } else {
            total += cost;
            selectedActivities.push(eventName);
        }
    }

    // disable the clashing event
    for (let each of activities.children) {
        let venue = each.firstElementChild.getAttribute('data-day-and-time');
        if (!each.firstElementChild.checked && e.target !== each.firstElementChild && selectedActivitiesVenue.indexOf(venue) > -1) {
            each.firstElementChild.disabled = true;
        } else {
            each.firstElementChild.disabled = false;
        }
    }

    activitiesCost.textContent = `Total: $${total}`;
});

// **************************** PAYMENT OPTIONS **************************** //
// select the payement box and disable don't display anything till selected
const paymentBox = document.querySelector('.payment-method-box');
const creditCardBox = document.querySelector('#credit-card');
creditCardBox.style.display = 'none';

const paypal = document.querySelector('#paypal');
paypal.style.display = 'none';

const bitcoin = document.querySelector('#bitcoin');
bitcoin.style.display = 'none';

// event change
// hide payment options and show them when selected
paymentBox.addEventListener('change', e => {
    if (e.target.tagName === 'SELECT') {
        // for paypal
        if (e.target.value === 'paypal') {
            paypal.style.display = 'inherit';
        } else {
            paypal.style.display = 'none';
        }
        // for credit card
        if (e.target.value === 'credit-card') {
            creditCardBox.style.display = 'inherit';
        } else {
            creditCardBox.style.display = 'none';
        }
        // for bitcoin
        if (e.target.value === 'bitcoin') {
            bitcoin.style.display = 'inherit';
        } else {
            bitcoin.style.display = 'none';
        }
    }
})


// check if credit card meets the criteria
function validateCreditCard(){
    const creditCardNumber = document.querySelector('#cc-num');
    const cvv = document.querySelector('#cvv');
    const zip = document.querySelector('#zip');

    let validccn = /^\d{13,16}$/.test(creditCardNumber.value);
    showOrHideTooltip(validccn, creditCardNumber.nextElementSibling);
    let validcvv = /^\d{3}$/.test(cvv.value);
    showOrHideTooltip(validcvv, cvv.nextElementSibling);
    let validzip = /^\d{5}$/.test(zip.value);
    showOrHideTooltip(validzip, zip.nextElementSibling);

    return  validccn && validcvv && validzip;
}

// if user have slected any activity or not
function validateActivities(){
    let element = document.getElementById('activities-hint');

    if(selectedActivities.length > 0){
        element.style.display = 'none';
        return true;
    }else{
        element.style.display = 'inherit';
        return false;
    }
}

const paymentOption = document.querySelector('#payment');

// validate the form and submit it
document.querySelector('form').addEventListener('submit', e => {
    // console.log(e);
    let isValid = true;
    if(handler(nameBox, isValidName)){
        e.preventDefault();
        nameBox.scrollIntoView({behaviour: 'smooth', block: "center"});
        isValid = false;
    }

    if(handler(email, isValidEmail)){
        e.preventDefault();
        email.scrollIntoView({behaviour: 'smooth', block: "center"});
        isValid = false;
    }

    if(!validateActivities()){
        e.preventDefault();
        document.getElementById('activities-hint').scrollIntoView({behaviour: "smooth", block: "center"});
        isValid = false;
    }

    if(paymentOption.value === 'credit-card'){
        if(!validateCreditCard()){
            email.scrollIntoView({behaviour: 'smooth', block: "center"});
            isValid = false;
        }
    }

    if(isValid){
        e.preventDefault();
        let success = `<div class='center'><h1>form submitted successfully</h1> </div>`;
        document.querySelector('body').innerHTML = success;
    }

    if(!isValid){
        e.preventDefault();
    }
    
});

