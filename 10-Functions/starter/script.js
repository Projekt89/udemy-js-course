'use strict';

////////////////////////
/* DEFAULT PARAMETERS */
////////////////////////
/*
const bookings = [];

const createBooking = function (
  // default value after ES6
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // default value before ES6
  // numPassengers = numPassengers || 1;
  // price = price || 199

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('WZ432', 5);
// skipping parameter - use undefined
createBooking('RY324', undefined, 1000);
*/
////////////////////////////////////////////////////////////////
/* ARGUMENTS - HOW PRIMITIVES AND OBJECTS WORK WITH FUNCITONS */
////////////////////////////////////////////////////////////////
/*
const flight = 'LH234';
const bob = {
  name: 'Bob Ross',
  passport: 1234144126,
};
// value passed as arg. makes a copy of that value and stores in arg. name
const checkIn = function (flightNumber, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 1234144126) {
    console.log('Checked in');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, bob);
console.log(flight); // LH234 - funcition did not change the value
console.log(bob); // Mr. Bob Rosss - funciton changed the value of object
// it happens becaues in case of primitive val. copy of that value is stored in parameter, but copy of object pointer points to the same object
*/
////////////////////////////////////////////
/* FIRST-CLASS AND HIGHER ORDER FUNCTIONS */
////////////////////////////////////////////
// First class functions means just that all functions are values
// Higher order functions means that they receive, return or both another funciton
/*
// HIGHER ORDER RECEIVING A FUNCTION 
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order funcition reciving other function
const transformer = function (str, fn) {
  console.log(`Original string ${str}`);
  console.log(`Transformed string ${fn(str)}`);
  console.log(`Transformation done by ${fn.name} function`);
};

// functions passed into higher order functions as arg are called callback functions
transformer('Javascript is the best!', upperFirstWord); //JAVASCRIPT is...
transformer('Javascript is the best!', oneWord); // javacriptisthebest

// JS uses callback functions all the time
const high5 = function () {
  console.log('👋');
};
['Bob', 'Martha', 'Adam'].forEach(high5);
document.body.addEventListener('pointerdown', () => high5);

// HIGHER ORDER RETURNING A FUNCTION 
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeter = greet('Hey');
greeter('Bob');
greeter('Matilda');
greet('Hello')('Frank'); // important to functional programing

const greets = greeting => name => console.log(`${greeting} ${name}`);
greets('Hello')('Bob');
*/
//////////////////////////////////////////////////////
/* CALL AND APPLY METHODS - ASSIGNING THIS MANUALLY */
//////////////////////////////////////////////////////
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNumber, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNumber}`, name });
  },
};

lufthansa.book(242, 'Bob Ross');
lufthansa.book(552, 'Rob Bobs');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
// manipulating THIS keyword using .call() method
const book = lufthansa.book;
//book(12, 'Al Bun'); // this is a copy of method not pointer so just a simple function with it's own this keyword so it show error if called as 'this' inside points to undefined

book.call(eurowings, 322, 'Al Bun'); //book is an object of function so we can call on it method .call() which first arg is what we want this keyword to point to
book.call(lufthansa, 234, 'Amy Peel');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 628, 'Bob Ross');

// using .apply() method to manipulate THIS keyword
const flightData = [582, 'Alexander Johanson'];
book.apply(swiss, flightData); // apply receives this target as first argument and an array of data as a second. Almost not in use anymore
book.call(swiss, ...flightData); // the same as above
*/
/////////////////
// BIND METHOD //
/////////////////
// bind allow to bind THIS keyword with a target but the difference between call and apply is that it doen't immidiatelly call the function but RETURNS A FUNCTION with this keyword binded
/*
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSw = book.bind(swiss);
bookEW(812, 'Peggy Bun');

// we can bind any number of arguments using bind. First argument is where is this binded to. Rest is set as default arguments with every call
const bookEW412 = book.bind(eurowings, 412);
bookEW412('Jenny Bun');
bookEW412('Brad Bun');
// setting some args with bind is a pattern called PARTIAL APPLICATION

// WITH EVENT LISTENERS
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// ERROR this in event listeners points to element triggering event
document
  .querySelector('.buy')
  .addEventListener('pointerdown', lufthansa.buyPlane);
// solution - this binded to lufthansa object
document
  .querySelector('.buy')
  .addEventListener('pointerdown', lufthansa.buyPlane.bind(lufthansa));

// PARTIAL APPLICATION - simply means that we can preset some arguments
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// binding 23% vat rate and (part. applic.) and null to this
const addVAT = addTax.bind(null, 0.23); //!!!order of arg is IMPORTANT!!!
// addVAT = value => value + value * 0.23
console.log(addVAT(141));
console.log(addVAT(100));

const addTaxx = value => rate => console.log(value + value * rate);
const addTaks = function (value) {
  return function (rate) {
    return value + value * rate;
  };
};
const rate = addTaks(100);
console.log(rate(0.5));
addTaxx(100)(0.1);
*/
////////////////////////
/* CODING CHALLENGE 1 */
////////////////////////
/*
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0,0,0,0]
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);
    if (isNaN(answer) || answer < 0 || answer > this.answers.length - 1) {
      console.log('wrong DATA');
      return;
    }
    this.answers[answer]++;
    ///////// alternative conditionig with short cirtcuiting
    // !isNaN(answer) &&
    //   answer < this.answers.length &&
    //   answer > -1 &&
    //   this.answers[answer]++;
    this.displayResults(this.answers);
  },

  displayResults(type) {
    typeof type === 'string'
      ? console.log(`Pool results are ${type}`)
      : console.log(type);
  },
};

document
  .querySelector('.poll')
  .addEventListener('pointerdown', poll.registerNewAnswer.bind(poll));

const displayResults = poll.displayResults;
displayResults('10, 31, 41, 5');
displayResults([5, 2, 3]);
displayResults([1, 5, 3, 9, 6, 1].join(', '));
*/
/////////////////////////////////////////////////////
/* IIFE - IMMEDIATELY INVOKED FUNCTION EXPRESSIONS */
/////////////////////////////////////////////////////
/*
// functions that needs to be called just once and then dissapear. These are needed for async await.
//IIFE were commonly used before let and const keyword were implemented to avoid errors with local function scoped variables.
const runOnce = function () {
  console.log(`This will never run again`);
};
runOnce();
// This function can be called multiple times

//IIFE
(function () {
  console.log(`This will never run again`);
})(); // Such construction will be called once and dissappear

(() => console.log('This will also never run again'))();
*/
//////////////
/* CLOSURES */
//////////////
// A function always has access to variable environment (VE) of the function in which it was created
// Closure = VE attached to the function exactly ath the time and place the function was created
// Through this mechanism we are able to create enclosed environment of variables that are not available anywhere else but in the function/functions that were created when that VE was existing. When the 'parent function' is poped from the CALL STACK the access to it's variables (VE) may be only mentained inside these returned functions
// it's then like a PRIVATE property of function, without access from out
/*
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
// access to secureBooking VE maintained only in booker function
// in this case passengerCount variable is inside closure to which access is provided only through the booker() function

console.dir(booker); // in scopes we can see closures func. has access to

// EXAMPLES
// exampla 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
// f was defined in global scoped but assigned to value of function that has access to closure of g variables

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // f assigned a * 2
f(); // f executed
h(); // f assigned b * 2
f(); // f executed

console.debug(f);
// example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(() => {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(90, 5);
// setTimeout executes n seconds after boarding passengers is poped of call stack (setTimeout is asyns) so JS creates closure for it with perGroup variable so useTimeout can use it after time runs out
*/
/////////////////
/* CHALLENGE 2 */
/////////////////
/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('pointerdown', () => {
    header.style.color = 'blue';
    setTimeout(() => {
      header.style.color = 'red';
    }, 1000);
  });
})();
// in challenge above there are two functions that are using closure from IIFE one gets access to VE of iife when body is clicked and second exactly second after click turning color back to red
*/
