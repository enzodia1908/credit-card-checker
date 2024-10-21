// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Create a function, validateCred() that has a parameter of an array. 
// The purpose of validateCred() is to return true when an array contains digits of a valid credit card number and false when it is invalid.
// This function should NOT mutate the values of the original array.

const validateCred = array => {
  let result = [];
  result.push(array[array.length-1]);
  let count = 0;
  for (let i = array.length-2; i >= 0; i--){
    if (count % 2 === 0) {
      let num = array[i] * 2;
      if (num > 9) {
        result.unshift(num -= 9);
        count++;
      } else {
        result.unshift(num);
        count++;
      }
    } else {
      result.unshift(array[i]);
      count++
    }
  }
  const sum = result.reduce((accumulator, currentValue) => accumulator + currentValue);
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

// console.log(validateCred(invalid1));


// Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers.
// The role of findInvalidCards() is to check through the nested array for which numbers are invalid,
// and return another nested array of invalid cards.

const findInvalidCards = array => {
  let invalidCardsArray = [];
  array.forEach(arrayItem => {
    if (!validateCred(arrayItem)) {
      invalidCardsArray.push(arrayItem);
    }
  })
  return invalidCardsArray;
}

let invalidCards = findInvalidCards(batch);


// Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers
// and returns an array of companies.

const idInvalidCardCompanies = array => {
  let invalidCompaniesResult = [];
  let amex = 'Amex (American Express)';
  let visa = 'Visa';
  let mcard = 'Mastercard';
  let dcover = 'Discover';

  array.forEach(arrayItem => {
    if (arrayItem[0] === 3) {
      if (invalidCompaniesResult.find(company => company === amex)) {
        return;
      } else {
        invalidCompaniesResult.push(amex);
      }
    } else if (arrayItem[0] === 4) {
      if (invalidCompaniesResult.find(company => company === visa)) {
        return;
      } else {
        invalidCompaniesResult.push(visa);
      }
    } else if (arrayItem[0] === 5) {
      if (invalidCompaniesResult.find(company => company === mcard)) {
        return;
      } else {
        invalidCompaniesResult.push(mcard);
      }
    } else if (arrayItem[0] === 6) {
      if (invalidCompaniesResult.find(company => company === dcover)) {
        return;
      } else {
        invalidCompaniesResult.push(dcover);
      }
    }
  });

  return invalidCompaniesResult;
}

// console.log(idInvalidCardCompanies(invalidCards));



