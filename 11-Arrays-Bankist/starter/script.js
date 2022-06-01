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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // cleaning container

  const transactions = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  // creating HTML and inserting into container
  transactions.forEach((mov, i) => {
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

// sorting movement list functionality
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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
const calcPrintBalance = function (movements, interest) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0) + interest;
  labelBalance.textContent = `${balance} €`;
  return balance;
};

// calculating summaries
const calcDisplaySummary = function (user) {
  const income = user.movements
    .filter(el => el > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const expenses = user.movements
    .filter(el => el < 0)
    .reduce((acc, cur) => acc + cur, 0);
  const interest = user.movements
    .filter(el => el > 0)
    .reduce(
      (acc, cur) =>
        cur * (user.interestRate / 100) > 1
          ? acc + cur * (user.interestRate / 100)
          : acc,
      0
    );

  labelSumIn.textContent = `${income.toFixed(2)} €`;
  labelSumOut.textContent = `${Math.abs(expenses).toFixed(2)} €`;
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
  user.balance = calcPrintBalance(user.movements, interest);
};

let currentAccount;

//Updating UI function used after introducing changes to user data
const updateUI = function (user) {
  displayMovements(user.movements);
  calcDisplaySummary(user);
};

// handling logging of users
const loginUser = (users, login, password) =>
  users.find(user => user.username === login && user.pin === password);

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  const username = inputLoginUsername.value.trim();
  const pin = Number(inputLoginPin.value.trim());
  currentAccount = loginUser(accounts, username, pin);
  if (!currentAccount) {
    console.log('Wrong data');
    return;
  }
  // reset input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // Display welcome message
  labelWelcome.textContent = `Welcome back ${
    currentAccount.owner.split(' ')[0]
  }`;
  // Show UI and update it with user data
  containerApp.style.opacity = 1;
  updateUI(currentAccount);
});

// Transfering money between users
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find(
    user =>
      user.username === inputTransferTo.value ||
      user.name === inputTransferTo.value
  );

  if (
    amount > 0 &&
    amount < currentAccount.balance &&
    transferTo?.username &&
    transferTo.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);
    updateUI(currentAccount);
  } else console.log('transfer invalid');
  inputTransferAmount.value = inputTransferTo.value = '';
});

// Apply for loan functionality
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const requestedAmount = Number(inputLoanAmount.value);
  if (currentAccount.movements.some(el => el >= requestedAmount * 0.1)) {
    currentAccount.movements.push(requestedAmount);
    updateUI(currentAccount);
  } else console.log('not granted');
  inputLoanAmount.value = '';
});

// Deleting account functionality
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(
        account => account.username === currentAccount.username
      ),
      1
    );
    containerApp.style.opacity = 0;
  } else console.log('Could not confirm');

  inputClosePin.value = inputCloseUsername.value = '';
});

// counting total bank balance
const bankBalance = accounts
  .flatMap(account => account.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankBalance);

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
/* CHALLENGE 2 & 3 DOGS AVG AGE */
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
//////////////////////
/* CHAINING METHODS */
//////////////////////
{
  /* 
  const euroToUsd = 1.1;
  // PIPELINE
  const income = movements
    .filter(el => el > 0)
    .map(el => el * euroToUsd)
    // .map((el, i, arr) => {
    //   console.log(arr);        // we can inspect returned array i pipeline
    //   return el * euroToUsd;
    // })
    .reduce((acc, cur) => acc + cur);

  console.log(`Income in USD: ${income.toFixed(2)}`);
   */
}
/////////////////
/* FIND METHOD */
/////////////////
{
  /* 
// Find method loops over the array and retrive first element of the array that return value true in comparison
// returns element not array
// returns only first element found

const firstWithdrawal = movements.find(el => el < 0);
console.log(firstWithdrawal);

console.log(accounts.find(el => el.username === 'stw'));
 */
}
////////////////////
/* SOME and EVERY */
////////////////////
{
  /* 
  // Some returns true when any of array elements cause the comparison in callback return true
  console.log(movements.includes(-130)); // true
  console.log(movements.some(el => el === -130)); // true - done the same as includes
  console.log(movements.some(el => el > 0)); // true - any deposits
  console.log(movements.some(el => el > 5000)); // true - any deposits above 5000

  // Every returns true when all of array elements cause the comparison in callback return true
  console.log(movements.every(el => el > 0)); // false
  console.log(movements.every(el => el > 0 || el < 0)); // true

  // Separate Callback - important in case of dry code
  const deposits = el => el > 0;
  console.log(movements.some(deposits)); // true - there are deposits on that account
  console.log(movements.every(deposits)); // false - they are not all only deposits
  console.log(movements.filter(deposits)); // return array of deposits
   */
}
//////////////////////
/* FLAT and FLATMAP */
//////////////////////
{
  /* 
  // flat flattens array which is removing nested arrays and puting them into main array
  // flat returns new array NOT MUTATE original array
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  console.log(arr.flat()); // [1, ... ,8] flatten array (remove level)

  const arrDeep = [[1, [2, 3]], [[4, [5]], 6], 7, 8];
  console.log(arrDeep.flat()); // [1, [2,3], ... , 8] flatten without arg removes 1 level of array
  console.log(arrDeep.flat(3)); // [1, ... , 8] flatten with arg removes n levels of array

  // flatMap combains flat() and map() methods together which is better for performace
  // flatMap only goes 1 LEVEL DEEP
  console.log(arrDeep.flatMap(el => el));
   */
}
////////////////////
/* SORTING ARRAYS */
////////////////////
{
  /* 
  // sort() method works by sorting values of array based on strings
  // sort MUTATES the original array
  const owners = ['Bob', 'Jonas', 'Adam', 'Martha'];
  console.log(owners.sort()); // [alpahbeticaly sort array]

  console.log(movements.sort()); // [array sorted based on values converted to strings] (total mess)

  // if return is less than 0  A, B,  if return is larger than 0 B, A
  console.log(movements.sort((a, b) => (a > b ? 1 : -1))); // ascending order
  console.log(movements.sort((a, b) => a - b))); // ascending order simplified
  console.log(movements.sort((a, b) => (a > b ? -1 : 1))); // descending order
  console.log(movements.sort((a, b) => b - a)); // descending order simplified
 */
}
/////////////////////////////////
/* PROGRAMATICLY CREATE ARRAYS */
/////////////////////////////////
{
  // create completely empty array using Array() object
  const x = new Array(7); // [empty x 7]

  // only method working with such empty array is .FILL(value) which fills array with the value
  //x.fill(5); // [5, ... , 5, 5]

  // .fill() works a bit like slice where starting index and ending can be specified
  x.fill(3, 3, 5); // [empty x 3, 3, empty x 2]

  // .fill() works with regular arrays to
  movements.fill(100, 2, 6); // [ ... , 100, 100, 100, 100, ...]

  // creating new array by using FROM method of object ARRAY. Arg 1: object with property length, Arg 2 callback function returning value of every place in array
  const y = Array.from({ length: 7 }, () => 1); // [1, ... , 1] array of 7 filled with 1
  const z = Array.from({ length: 7 }, (_, i) => i + 1); // [1, 2, ... , 7]
  // callback function used in method array works exactly like .map() so we have access to the same arguments that are available for map method

  // Transformation of Node List returned from for ex. querrySelectorAll to array
  labelBalance.addEventListener('click', () => {
    const movementsUI = Array.from(
      document.querySelectorAll('.movements__value'), //select node list
      el => Number(el.textContent.replace('€', '')) //return just amount from every node
    );

    console.log(movementsUI);

    // creating array with html elements using JS6 spread operator
    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
    console.log(movementsUI2);
  });
}
