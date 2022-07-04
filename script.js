const form = document.getElementById('myForm')

// Input elements
const submitBtn = document.querySelector('#submitBtn');
const fName = document.querySelector('#first-name');
const lName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const telNum = document.querySelector('#phone-number')
const password = document.querySelector('#pass');
const confirmPass = document.querySelector('#confirm-pass')

// Error messages elements
const fNameError = document.querySelector(".fname-error");
const lNameError = document.querySelector(".lname-error");
const emailError = document.querySelector(".email-error");
const telError = document.querySelector(".tel-error");
const passError = document.querySelector(".pass-error");
const passConfirmError = document.querySelector(".cpass-error");

fName.addEventListener('input', (e) => {
  if (fName.value === '') {
    fNameError.textContent = "* ENTER YOUR FIRST NAME"
  } 
  else if (checkPattern(fName.value, fName.pattern) === false) {
    fNameError.textContent = "* MUST BE ALPHABET LETTERS ONLY";
  }
  else {
    fNameError.textContent = "";
  }
})

lName.addEventListener('input', () => {
  if (lName.value === '') {
    lNameError.textContent = "* ENTER YOUR LAST NAME"
  } 
  else if (checkPattern(lName.value, lName.pattern) === false) {
    lNameError.textContent = "* MUST BE ALPHABET LETTERS ONLY";
  }
  else {
    lNameError.textContent = "";
  }
})

email.addEventListener('input', () => {
  // RFC 2822 standard email validation
  const validEmailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (checkPattern(email.value, validEmailPattern) === false) {
    emailError.textContent = "* MUST BE A VALID EMAIL ADDRESS"
  }
  else {
    emailError.textContent = "";
  }
})

telNum.addEventListener('input', () => {
  let value = formnatPhoneNumber(telNum.value);
  telNum.value = value;
  if (checkPattern(telNum.value, telNum.pattern) === false) {
    telError.textContent = "* MUST BE A VALID PHONE NUMBER"
  }
  else {
    telError.textContent = "";
  }
})

password.addEventListener('input', (e) => {
  const passWordValue = password.value;
  let msg = "";

  if(passWordValue){
    // Length validation
    if (passWordValue.length < 6) {
      msg = "MUST BE ATLEAST 6 CHARACTERS";
      msg += "<br>";
    }
    else {
      msg = "";
    }

    // Lowercase Validation
    if (checkPattern(password.value, "(?=.*[a-z])") === false){
      msg += "MISSING ATLEAST 1 LOWERCASE LETTER";
      msg += "<br>";
    }
    else {
      msg += "";
    }

    // Uppercase Validation
    if (checkPattern(password.value, "(?=.*[A-Z])") === false){
      msg += "MISSING ATLEAST 1 UPPERCASE LETTER";
      msg += "<br>";
    }
    else {
      msg += "";
    }
    // Number Validation
    if (checkPattern(password.value, "(?=.*[0-9])") === false) {
      msg += "MISSING ATLEAST 1 NUMBER CHARACTER";
      msg += "<br>";
    }
    else {
      msg += "";
    }

    passError.innerHTML = msg;
  }
  else {
    passError.textContent = "";
  }
})

confirmPass.addEventListener('input', () => {
  if (password.value !== confirmPass.value) {
    passConfirmError.textContent = "* PASSWORD DO NOT MATCH";
  }
  else {
    passConfirmError.textContent = "";
  }
})

// Functions
function checkPattern(text, pattern) {
  pattern = new RegExp(pattern);
  return pattern.test(text);
}

function formnatPhoneNumber(value) {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 5) return phoneNumber;
  if (phoneNumberLength < 8) {
  return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`
  }
  return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7,12)}`
} 