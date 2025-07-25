// Function to validate form on 'complete purchase' button click
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('complete-purchase').addEventListener('click', validateForm);
});

function validateForm(event) {
    event.preventDefault(); // Prevent form submission for now

    let isValid = true;

    // Payment Details Section
    const cardNumber = document.getElementById('card-number');
    const cardNumberError = document.getElementById('card-number-error');
    if (!/^\d{16}$/.test(cardNumber.value.trim())) {
        cardNumberError.textContent = 'Card Number must be 16 digits.';
        isValid = false;
    } else {
        cardNumberError.textContent = '';
    }

    const cardName = document.getElementById('card-name');
    const cardNameError = document.getElementById('card-name-error');
    if (cardName.value.trim() === '') {
        cardNameError.textContent = 'Cardholder Name is required.';
        isValid = false;
    } else {
        cardNameError.textContent = '';
    }

    const expiryDate = document.getElementById('expiry-date');
    const expiryDateError = document.getElementById('expiry-date-error');
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value.trim())) {
        expiryDateError.textContent = 'Expiry Date must be in MM/YY format.';
        isValid = false;
    } else {
        expiryDateError.textContent = '';
    }

    const cvv = document.getElementById('cvv');
    const cvvError = document.getElementById('cvv-error');
    if (!/^\d{3}$/.test(cvv.value.trim())) {
        cvvError.textContent = 'CVV must be 3 digits.';
        isValid = false;
    } else {
        cvvError.textContent = '';
    }

    // Billing Address Section
    const address1 = document.getElementById('address1');
    const address1Error = document.getElementById('address1-error');
    if (address1.value.trim() === '') {
        address1Error.textContent = 'Address Line 1 is required.';
        isValid = false;
    } else {
        address1Error.textContent = '';
    }

    // Address Line 2 and Line 3 are optional, so no validation needed

    const city = document.getElementById('city');
    const cityError = document.getElementById('city-error');
    if (city.value.trim() === '') {
        cityError.textContent = 'City/Town is required.';
        isValid = false;
    } else {
        cityError.textContent = '';
    }

    const country = document.getElementById('country');
    const countryError = document.getElementById('country-error');
    if (country.value === '') {
        countryError.textContent = 'Please select a Country.';
        isValid = false;
    } else {
        countryError.textContent = '';
    }

    const zip = document.getElementById('zip');
    const zipError = document.getElementById('zip-error');
    if (zip.value.trim() === '') {
        zipError.textContent = 'ZIP Code is required.';
        isValid = false;
    } else {
        zipError.textContent = '';
    }

    // Personal Details Section
    const firstName = document.getElementById('first-name');
    const firstNameError = document.getElementById('first-name-error');
    if (firstName.value.trim() === '') {
        firstNameError.textContent = 'First Name is required.';
        isValid = false;
    } else {
        firstNameError.textContent = '';
    }

    const surName = document.getElementById('sur-name');
    const surNameError = document.getElementById('sur-name-error');
    if (surName.value.trim() === '') {
        surNameError.textContent = 'Surname is required.';
        isValid = false;
    } else {
        surNameError.textContent = '';
    }

    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    // Use a regular expression to validate phone number format (example: XXX-XXX-XXXX)
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone.value.trim())) {
        phoneError.textContent = 'Phone Number must be in XXX-XXX-XXXX format.';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }

    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (email.value.trim() === '') {
        emailError.textContent = 'Email Address is required.';
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        emailError.textContent = 'Please enter a valid Email Address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (isValid) {
        // Generate a new reference number
        const referenceNumber = generateReferenceNumber();
        
        // Store the reference number in localStorage
        localStorage.setItem('referenceNumber', referenceNumber);
        
        // Redirect to the confirmation page
        window.location.href = './shop.html';
    
        // Show an alert with the success message and the reference number
        alert(`Form submitted successfully! Please note your reference number: ${referenceNumber}`);
    } else {
        // Show an alert with the error message
        alert('Please fix the errors in the form.');
    }
}

// Function to validate email format
function isValidEmail(email) {
    // Basic email validation using a regular expression
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Function to retrieve total price from localStorage and update the DOM
function retrieveTotalPrice() {
    let totalPrice = localStorage.getItem('totalPrice');
    if (totalPrice) {
        document.getElementById('order-total').innerText = totalPrice;
    }
}

// Call the function to retrieve and display the total price when the page loads
document.addEventListener('DOMContentLoaded', function() {
    retrieveTotalPrice();
});

// Function to generate a unique reference number
function generateReferenceNumber() {
    let prefix = '#ORD'; // Static prefix for reference number
    let randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
    let referenceNumber = prefix + randomNumber; // Combine prefix with random number
    return referenceNumber;
}

// Function to display the generated reference number
function displayReferenceNumber() {
    let referenceNumber = generateReferenceNumber(); // Generate the reference number
    document.getElementById('reference-number').textContent = referenceNumber; // Update the reference number in the HTML
}

// Call the function to display the reference number when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayReferenceNumber();
});

