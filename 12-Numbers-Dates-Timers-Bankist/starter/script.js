'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-06-01T14:43:26.374Z',
    '2022-06-03T18:49:59.371Z',
    '2022-06-04T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2022-06-01T14:43:26.374Z',
    '2022-06-03T18:49:59.371Z',
    '2022-06-04T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / 1000 / 60 / 60 / 24;

  let daysPassed = Math.round(calcDaysPassed(new Date(), date.getTime()));

  if (daysPassed === 0) return 'today';
  else if (daysPassed === 1) return 'yesterday';
  else if (daysPassed <= 7) return daysPassed + ' days ago';

  return new Intl.DateTimeFormat(locale).format(date);
  // return (
  //   `${date.getDate()}`.padStart(2, 0) +
  //   '/' +
  //   `${date.getMonth()}`.padStart(2, 0) +
  //   '/' +
  //   `${date.getFullYear()}` +
  //   ', ' +
  //   `${date.getHours()}`.padStart(2, 0) +
  //   ':' +
  //   `${date.getMinutes()}`.padStart(2, 0)
  // );
};

const formatCurrToLocale = function (value, locale, curr) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: curr,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurrToLocale(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrToLocale(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrToLocale(
    incomes,
    acc.locale,
    acc.currency
  );

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrToLocale(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrToLocale(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  //v1
  let counter = 5 * 60 * 1000;

  const tick = () => {
    const time = new Date(counter);
    const minutes = time.getMinutes();
    const seconds = `${time.getSeconds()}`.padStart(2, '0');
    labelTimer.textContent = `0${minutes}:${seconds}`;
    counter = counter - 1000;
  };
  tick();
  const clock = setInterval(tick, 1000);

  const timeToLogout = setTimeout(() => {
    currentAccount = {};
    containerApp.style.opacity = 0;
  }, counter + 1000);

  document.body.addEventListener('click', () => {
    clearTimeout(timeToLogout);
    clearInterval(clock);
    startLogoutTimer();
    return;
  });

  /* // v2
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);
  return timer; */
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALLWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and format to local standard
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }

  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    {
      setTimeout(function () {
        // Add movement
        currentAccount.movements.push(amount);

        // Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);
      }, 2500);
    }
  }
  inputLoanAmount.value = '';

  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//////////////////////////////////////////////////
/* CONVERTING AND CHECKING IF VALUE IS A NUMBER */
//////////////////////////////////////////////////
{
  /* // There is only one number format in JS - Float. Numbers are represented internally as 64 base 2 format (allways store in binary format)
  console.log('comparing base systems, errors in calculations');
  console.log(23 === 23.0); // true

  // Base 10: 0 - 9. 1/10 = 0.1, 3/10 = 3.33333
  // Base 2: 0 - 1
  console.log(0.1 + 0.2); // 0.3000000000004 - this is error in js caused by use of binary system used to represent numbers in JS
  console.log(0.1 + 0.2 === 0.3); // false // should be true if not bug above

  // conversion to number
  console.log('2 ways to convert string to number');
  console.log(Number('24')); // using Number function
  console.log(+'24'); // using type conversion (+ on left converts to number)

  // Parsing
  console.log('parseInt() and parseFloat()');
  // Number.parseInt('30px', radix/base)
  console.log(Number.parseInt('30px', 10)); // 30 - parsing creates number from string but the string HAS TO START with number
  console.log(Number.parseInt('30px', 10)); // NaN
  // Number.parseFloat('', radix/base)
  console.log(Number.parseInt('2.5rem', 10)); // 2
  console.log(Number.parseFloat('2.5rem', 10)); // 2.5

  // isNaN(value) - use only to check if value === NaN
  console.log('isNaN()');
  console.log(Number.isNaN(20)); // false - this is a number
  console.log(Number.isNaN('20')); // false - this is a string, not NaN
  console.log(Number.isNaN(+'20x')); // true - failure to convert to number returns NaN so isNaN hence check returns true
  console.log(Number.isNaN(24 / 0)); // false - expression returns Infinity

  // isFinite(value) - use to check if value === 'number'
  console.log('isFinite()');
  console.log(Number.isFinite(20 / 0)); // false
  console.log(Number.isFinite(20)); // true
  console.log(Number.isFinite('20')); // false
  console.log(Number.isFinite(+'20x')); // false
  // isFinite is BETTER option FOR checking wether SOMETHING IS A NUMBER!!!,

  // isInteger(value) - alternative for isFinite however 20 === 20.0 -> true
  console.log('isInteger()');
  console.log(Number.isFinite(20)); // true
  console.log(Number.isFinite(20.0)); // true
  console.log(Number.isFinite('20')); // false
  console.log(Number.isFinite(+'20x')); // false */
}
///////////////////////////////
/* MATH METHODS AND ROUNDING */
///////////////////////////////
{
  /* // Calculating roots
  console.log('Calculating roots');
  console.log(Math.sqrt(25)); // 5 - square root
  console.log(25 ** (1 / 2)); // 5 - also square root

  // Maximum value
  console.log('Max/Min vlaue');
  console.log(Math.max(5, 2, 6, 8)); // 8
  console.log(Math.max(5, 2, '15', 6, 8)); // 15 - does type conversion
  console.log(Math.max(5, 2, '15px', 6, 8)); // NaN - does NOT parse

  console.log(Math.min(5, 2, '15', 6, 8)); // 2

  // Math constants
  console.log('Constants');
  console.log(Math.PI, Math.E, Math.LOG2E, Math.SQRT2, ' etc...');
  console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.15...

  // Random Numbers
  console.log('Random Numbers');
  console.log(Math.random()); // random number between 0 and 1

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1 + min);
  console.log(randomNumber(24, 45));
  // function generating random number from set of (n - m>

  // Rounding to integer
  console.log('Rounding to integer');
  console.log(Math.trunc(24.5)); // 24  - throw away decimals
  console.log(Math.floor('24.5')); // 24  - round down
  console.log(Math.floor(-24.5)); // 25  - round down
  console.log(Math.ceil(24.5)); // 25 - round up
  console.log(Math.round(24.5)); // 25 // 0 to 4 round down 5 to 9 round up
  // all above conduct type conversion

  // Rounding to decimals
  console.log('Rounding to decimal');
  console.log((2.7).toFixed(2)); // 2.70 - toFixed returns STRING !!!
  console.log(+(2.78963).toFixed(3)); // 2.79 - + at the beginning converts string to number which get rounded to 3 decimals. 6 cause rounding up so 9 + 1 what cause 8 + 1 so result is 2.79. Result if stay string = 2.790

  // REMEMBER IN THE BACKGROUND JS DOES BOXING - THAT IS CONVERS PRIMITIVE TO OBJECT -> EXECUTE METHODS -> CONVERT BACK TO PRIMITIVE */
}
//////////////////////////
/* REMAINDER OPERATOR % */
//////////////////////////
{
  /* console.log(5 % 2); // 1
  console.log(8 % 3); // 2
  console.log(6 % 2 ? 'ODD' : 'EVEN'); // EVEN
  console.log(7 % 2 ? 'ODD' : 'EVEN'); // ODD

  const isEven = n => n % 2 === 0;

  labelBalance.addEventListener('click', () => {
    [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
      if (isEven(i)) row.style.backgroundColor = 'orangered';
      if (i % 3 === 0) row.style.backgroundColor = 'deepskyblue';
    });
  }); */
}
////////////////////////
/* NUMERIC SEPARATORS */
////////////////////////
{
  /* // Numeric separators are _ that we can place anywhere in number to separate digits and make it easier to read
  //const diameter = 287460000000;
  const diameter = 287_460_000_000;
  console.log(diameter); //287460000000 - js ignores separators

  const priceInCents = 345_99;
  console.log(priceInCents); // 34599

  const transferFee1 = 15_00; // 1500
  const transferFee2 = 1_500; // 1500 the same number different meaning

  //const PI = 3_.1415  // Error. Illegal placings -> _3_._1415_

  console.log(Number('23_000')); // NaN - separator works ONLY WITH NUMBERS */
}
/////////////
/* BIG INT */
/////////////
{
  /*  // Biggest int number to store by JS is 2 ** 53 - 1 because data is stored in 64 bit system but only 53 bits are dedicated to store the value and the rest is used to store other information like for example sign (+/-)
  console.log(2 ** 53 - 1);
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(Number.MIN_SAFE_INTEGER);
  // Biggers numbers are required for ex to work with db with high id's etc.
  // in ES 2020 BIGINT was introduced - new primitive to store any large num

  // How to make big int? Just add N at the end of the number or use BigInt()
  console.log(123134456347543456234153452345n);
  console.log(BigInt(123134456347543456234153452345));
  // both versions give different result after and that's because of how BigInt() creates it's value. So if use BigInt -> only for smaller numbers

  // Operations work as normal
  console.log(10000n + 10000n); // 20000
  console.log(64372163478112734234115n * 10000001n);

  const huge = 437107410835487529743509843n;
  const num = 23;
  //console.log(huge * num); // error - unable to do operations on 2 different types. This is situation where we use BigInt() function
  console.log(huge * BigInt(num));

  // exceptions
  console.log(20n > 15); // true
  console.log(20n === 20); //false - different types
  console.log(20n == 20); //true - type conversion available version

  console.log(huge + ' is Really big!!!');
  // Math.sqrt(23423n) // error. Math not working with big int

  console.log(10n / 3); // 3 - big int automatically get rid of decimals
  console.log(10 / 3); // 3.33333 */
}
///////////////////
/* DATE AND TIME */
///////////////////
{
  /*   // 4 ways to Create a date
  // 'now' via object
  console.log(new Date()); // now
  // date from string
  console.log(new Date('Sat Jun 04 2022 13:53:17')); // date from string
  console.log(new Date('December 24, 2014')); // that way may be unreliable
  console.log(new Date(account1.movementsDates[0]));
  // date from number parameters (year, month, day, hours, minutes, seconds)
  console.log(new Date(2089, 10, 2, 14, 51, 24)); // months are 0 based
  console.log(new Date(2089, 10, 34, 14, 51, 24)); // 03.12 autocorrect day
  // number of miliseconds after begining of unix time 1/1/1970
  console.log(new Date(0)); // 1/1/1970
  // conversion to miliseconds
  console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 4/1/1970

  // Working with dates
  const future = new Date(2089, 10, 2, 14, 51);
  console.log(future.getFullYear()); // 2089
  console.log(future.getMonth()); // 10 - November (remember 0 based)
  console.log(future.getDate()); // 2 - date returns number of the day
  console.log(future.getDay()); // 3 - day returns index of weekday
  console.log(future.getHours()); // 14
  console.log(future.getMinutes()); // 51
  console.log(future.getSeconds()); // 0
  console.log(future.toISOString()); // returns standarized time string
  console.log(future.getTime()); // returns miliseconds since 1/1/1970
  console.log(Date.now()); // returns milisec since 1/1/1970 to now

  // analogical as get methods above there are set functions just like them
  future.setFullYear(2098); // modify date object with new value for the year */
}
///////////////////////////////////////
/* ARYTHMETILCAL OPERATIONS ON DATES */
///////////////////////////////////////
{
  /* 
  const future = new Date(2098, 10, 2, 14, 24);
  console.log(Number(future)); // converting date tu number (in miliseconds)
  console.log(+future); // converting date tu number (in miliseconds)

  // calculating number of days passed between two dates
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / 1000 / 60 / 60 / 24;

  console.log(
    calcDaysPassed(new Date(2098, 10, 2, 14, 24), new Date(2098, 10, 8, 14, 24))
  ); // 6
  // for weird edge cases of calculating dates use MOMENT.JS library
   */
}
//////////////////////////////
/* INTERNATIONALIZATION API */
//////////////////////////////
{
  /*
  console.log(`////// DATES AND TIME //////`);

  // Internalization is adjusting formats of dates, time and numbers to local standard. Js has many options for this but here we just touch the dates and numbers
  // MORE INFO ABOUT INTL API ON MDN

  const now = new Date();
  // formating the date to US standard -
  // new Intl - object for internationalization,
  // .DateTimeFormat('en-US') - choose format
  // .format(date) - converts date to chosen format
  console.log('USA', new Intl.DateTimeFormat('en-US').format(now)); // m/d/y
  console.log('UK', new Intl.DateTimeFormat('en-UK').format(now)); // d/m/y
  console.log('Syria', new Intl.DateTimeFormat('ar-SY').format(now)); // d/m/y
  console.log('Norway', new Intl.DateTimeFormat('nb-NO').format(now)); // d/m/y
  console.log('Mnglia', new Intl.DateTimeFormat('mn-MN').format(now)); // d/m/y
  console.log('China', new Intl.DateTimeFormat('zh-TW').format(now)); // d/m/y
  // search for Format codes ar at lingoes.net/en/translator/langcode.htm

  // We can provide options object for internationalization for customisation
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: '2-digit', // show as 2 digits
    month: 'long', // show as text
    year: 'numeric',
    weekday: 'long', // also can use 'short' or 'narrow'
  };
  console.log('USA:', new Intl.DateTimeFormat('en-US', options).format(now)); // Saturday, June 04, 2022, 4:27 PM
  console.log('PL:', new Intl.DateTimeFormat('pl-PL', options).format(now)); // sobota, 04 czerwca 2022, 16:30

  // !!! Grabbing format from users browser !!!
  const locale = navigator.language;
  console.log(
    'Format code taken from browser: \n',
    locale.toUpperCase(),
    new Intl.DateTimeFormat(locale, options).format(now)
  ); // Saturday, June 04, 2022, 4:34 PM

  console.log('\n'.repeat(2));

  console.log(`////// NUMBERS //////`);

  const num = 522315.24;
  console.log('US: ', new Intl.NumberFormat('en-US').format(num));
  console.log('UK: ', new Intl.NumberFormat('en-UK').format(num));
  console.log('DE: ', new Intl.NumberFormat('de-DE').format(num));
  console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num));
  console.log(
    'Browser ' + navigator.language,
    new Intl.NumberFormat(navigator.language).format(num)
  );

  // We can specify options, if unit must specify unit, if currency spec curr
  const optionsN = {
    style: 'currency', // 'percent', 'currency'
    unit: 'mile-per-hour', // 'celcius' etc...
    currency: 'EUR', // 'USD', 'JPY', 'PLN' etc...
    //useGrouping: false, // removes divider -> 324564234.25
  };
  console.log('US:', new Intl.NumberFormat('en-US', optionsN).format(num));
  console.log('DE:', new Intl.NumberFormat('de-DE', optionsN).format(num));
  console.log('Syria:', new Intl.NumberFormat('ar-SY', optionsN).format(num));
  */
}
///////////////////////////////////////
/* TIMERS SETTIMEOUT AND SETINTERVAL */
///////////////////////////////////////
{
  /*
  // setTimeout(callback, timer, arguments) - IS ASYNCHRONUS
  const ingredients = ['olives', 'onion'];
  const pizzaTimer = setTimeout(
    (ing1, ing2, ing3) => {
      console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕 ${ing3}`);
    },
    3000,
    ...ingredients, // from arg 3 we pass values to timeout function
    'Bob'
  );
  console.log('Waiting...');

  // conditionally clearing timeout
  if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

  // setInterval(callback, timer, arguments) - ALSO ASYNCHRONUS
  setInterval(function () {
    const now = new Date();
    console.log(now.getSeconds());
  }, 1000);
  */
}
