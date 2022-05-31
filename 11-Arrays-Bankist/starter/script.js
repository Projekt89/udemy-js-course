'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//////////////////////
/* BANKIST APP CODE */
//////////////////////

// displaying user operations
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // cleaning container

  // creating HTML and inserting into container
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div> 
    </div>`;
    // insertAdjacentHTML('opt were to insert', string (with code) to insert)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// forcing the operation for user account1
displayMovements(account1.movements);

// creates additional value 'username' in every account obj.
const createUsernames = function (accs) {
  // modify source array with forEach
  accs.forEach(acc => {
    acc.username = acc.owner // add new value made of user initials
      .toLowerCase()
      .split(' ')
      .map(el => el[0]) // returns for ex. ['p', 'r']
      .join('');
  });
};
createUsernames(accounts); // call func. to create username values

// displaying a balance of oparations
const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance} €`;
};

calcPrintBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*      TRAINING CENTER FOR ARRAY METHODS      */
/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];
/////////////////////////
/* BASIC ARRAY METHODS */
/////////////////////////
{
  // // SLICE
  // // slice DOES NOT MUTATE original array
  // console.log(arr.slice(2)); // [c, d, e] // slice return new array
  // console.log(arr.slice(2, 4)); // [c, d]
  // console.log(arr.slice(-2)); // [d, e] last two el
  // console.log(arr.slice(-1)); // [e] last el
  // console.log(arr.slice(1, -2)); // [b, c] all from 1 except last 2 el.
  // console.log(arr.slice()); // returns shallow copy of the array
  // console.log([...arr]); // returns shallow copy of the array
  // // SPLICE
  // // splice MUTATES original array, .splice(index, num. of el. to delete)
  // console.log(arr.splice(2)); // [c, d, e]
  // console.log(arr); // [a, b]
  // arr.splice(-1) // remove last element
  // // REVERSE
  // // reverse MUTATES original array
  // console.log(arr2.reverse()); //self explanatory
  // // CONCAT
  // // concat DOESNT MUTATE any of original arrays and return new array
  // const letters = arr.concat(arr2);
  // console.log(letters);
  // console.log([...arr, ...arr2]);
  // // JOIN
  // console.log(letters.join(' - '));
  // // AT
  // // at method is great for grabbing data from array and to do method chaining on it.
  // console.log(arr.at(0)); // the same as arr[0]
  // //how to get last element of the array?
  // console.log(arr[arr.length - 1]); // get last el by arr.length
  // console.log(arr.slice(-1)[0]); // get last el to new array at i = 0
  // console.log(arr.at(-1)); // get last element with .at
  // // works also with strings
  // console.log('Maybe'.at(2)); // y
}
/////////////////////
/* FOR EACH METHOD */
/////////////////////
// forEach is shorter then for of loop but there is no way to break the forEach loop so if we need to break out at some point - use for of
{
  /* 
  // first arg. element, second arg index, third arg. array
  movements.forEach((el, i, arr) => {
    if (el > 0) {
      console.log(`Movement ${i + 1} You deposited ${el}`);
    } else {
      console.log(`Movement ${i + 1} You withdrew ${Math.abs(el)}`);
    }
  });


// FOR EACH WITH MAPS
currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// FOR EACH WITH SETS
// in sets ther is no key or index as arrangement is not important. That's why we throw away second argument from forEach with _
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR']);
currenciesUnique.forEach((val, _, set) => {
  console.log(`Currency: ${val}`);
});
 */
}
// _ - underscore means 'variable to throw away'
////////////////////////////
/* CHALLENGE 1 DOGS STUDY */
////////////////////////////
{
  /* 
  //Test Data 1
  const dogsControllGroupJulia = [3, 5, 2, 12, 7];
  const dogsControllGroupKate = [4, 1, 15, 8, 3];
  //Test Data 2
  const dogsControllGroupJulia2 = [9, 16, 6, 8, 3];
  const dogsControllGroupKate2 = [10, 5, 6, 1, 4];

  const checkDogs = (dogsJ, dogsK) => {
    const controllGroup = [...dogsJ.slice(1, 3), ...dogsK];
    controllGroup.forEach((dog, i) => {
      const isAdult = dog > 3 ? 'an adult' : 'a puppy';
      console.log(
        dog >= 3
          ? `Dog number ${i + 1} is ${isAdult} and is ${dog} years old`
          : `Dog number ${i + 1} is still ${isAdult} 🐶`
      );
    });
  };

  console.log('TestData 1');
  checkDogs(dogsControllGroupJulia, dogsControllGroupKate);
  console.log('TestData 2');
  checkDogs(dogsControllGroupJulia2, dogsControllGroupKate2);
   */
}
////////////////////////////////
/* .MAP() .FILTER() .REDUCE() */
////////////////////////////////
// Map loops over array and returns new array after edits from callback
// Filter loops over array and returns new array of elements for which the returned value from callback function was true
// Reduce create a sum of all values of the array and returns it as a value. It requires accumulator and current state as args that are later summed
{
  /* 
  // Map(el, i, arr)
  const euroToUsd = 1.1;
  const usd = movements.map(el => Math.trunc(el * euroToUsd));
  usd.map(el => console.log(el + ' $'));

  const movementsDescriptions = movements.map(
    (el, i) =>
      `Movement ${i + 1} You ${el > 0 ? 'deposited' : 'withdrew'} ${el}`
  );

  console.log(movementsDescriptions);

  // Filter(el, i, arr)
  const deposits = movements.filter(el => el > 0);
  const withdrawals = movements.filter(el => el < 0);
  console.log(deposits, withdrawals);

  // Reduce((acc, cur, i, arr) => (), initial(f.ex. 0))
  const balance = movements.reduce((acc, cur, i) => {
    console.log(`Iteration ${i}: ${acc} + (${cur})`);
    return acc + cur;
  }, 10);
  console.log(balance);

  // Maximum value
  const maxValue = movements.reduce(
    (acc, cur) => (cur > acc ? cur : acc),
    movements[0]
  );
  console.log(maxValue);
  */
}
//////////////////////////////
/* CHALLENGE 2 DOGS AVG AGE */
//////////////////////////////
{
  /* 
// TEST DATA 1
const dog1 = [5, 2, 4, 1, 15, 8, 3];
// TEST DATA 2
const dog2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageAge = function (ages) {
//   const dogAgeInHumanYears = ages.map(dog =>
//     dog <= 2 ? 2 * dog : 16 + dog * 4
//   );
//   const adultDogs = dogAgeInHumanYears.filter(el => el >= 18);
//   const averageAdultAge =
//     adultDogs.reduce((acc, cur) => acc + cur) / adultDogs.length;
//   return Math.trunc(averageAdultAge);
// };
// max reduction (chaining + reducing based on arr argument)
const calcAverageAge = function (ages) {
  const averageAdultAge = ages
    .map(dog => (dog <= 2 ? 2 * dog : 16 + dog * 4))
    .filter(el => el >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  return Math.trunc(averageAdultAge);
};
console.log(calcAverageAge(dog1));
console.log(`-----------------------`);
console.log(calcAverageAge(dog2));
 */
}
