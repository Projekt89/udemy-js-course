'use strict';
/* SCOPE TRAINING
// global scope
function callAge(bitrtYear) {
  // callAge scope
  const age = 2037 - bitrtYear;

  function printAge() {
    // printAge scope
    let output = `You are ${firstName} age ${age}, born in ${bitrtYear}`;
    console.log(output);

    if (bitrtYear >= 1981 && bitrtYear <= 1996) {
      // if block scope
      var millenial = true; // var is only function scope

      // creating NEW local variable with same name as in outer scope
      const firstName = 'Steven';
      // reassingning outer scope variable
      output = 'New output!!!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    // add(2,3) //Reference error in strict mode
  }
  printAge();

  return age;
}

const firstName = 'Bob';
calcAge(1965);
*/

/* HOISTING EXERCISE

// variables
console.log(me);
// console.log(job)  //TDZ
// console.log(year) //TDZ

var me = 'Bob';
let job = 'teacher';
const year = 1991;

//functions
console.log(addDecl(2, 3)); // works
console.log(addExpr(2, 3)); //undefined in case of var
console.log(addArrow(2, 3)); //TDZ beause of const

function addDecl(a, b) {
  return a + b;
}
var addExpr = function (a, b) {
  return a + b;
};
const addArrow = (a, b) => a + b;

// Exercise of a bug with hoisting
if (!numProducts) deleteShoppingCart()

var numProducts = 10

function deleteShoppingCart() {
  console.log('All products deleted');
}

var x = 1; // var creates property in window object
let y = 2;  // let/ const don't
const z = 3;
*/

/* THIS EXERCISES
console.log(this); // points to window object

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined in strict mode/ window in sloopy mode
};
calcAge(1965);

const calcArrow =(birthYear) => {
  console.log(2037 - birthYear);
  console.log(this); // points to window object (this of parent scope)
};
calcArrow(1981);

const bob = {
  year: 1965;
  calcAge: function() {
    console.log(this);  // points to bob object
  }
}
bob.calcAge() 

const matilda = {
  year: 2002,
}
matilda.calcAge = bob.calcAge 
matilda.calcAge() // points to matilda object

const f = bob.calcAge()
f() // undefined as f is just reguler function copied from bob object
*/

/* THIS PITFALL EXAMPLES 

const bob = {
  firstName: 'Bob',
  year: 1965,
  calcAge: function () {
    console.log(this); // points to bob object

    // old version of access of this in nested functions
    const self = this; // usually self or that
    const isMillenialSolution1 = function () {
      // this is undefined as it should be in regular function
      console.log(this.year >= 1981 && this.year <= 1996);
      // we can pass actual this through self variable
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    // new version of access of this in nested funcitons
    const isMillenialSolution2 = () => {
      // this is taken from parent
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenialSolution2();
  },
  greet: () => {
    // NEVER USE ARROW FUNCTION AS A METHOD
    console.log(`Hey ${this.name}`);
  },
};
bob.greet(); // hey undefined - object is not code block and arrow function doesnt create its own this so we try to access firstName of window object hence we get undefined

// Arguments keyword
var addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
const addArrow = (a, b) => a + b;
*/

/* PRIMITIVES and REFERENCE */
/*
// primitives
let age = 30;
let oldAge = age;
age = 21;
console.log(age);
console.log(oldAge);
// reference
const me = {
  name: 'Bob',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log(friend);
console.log(me);
///////////////
// primitive
let lastName = 'William';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, newLastName);
// reference
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before: ', jessica, ' After: ', marriedJessica);
// copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Adam', 'Bob']
};
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary')
jessicaCopy.family.push('John')
// value of array changes in both objects because of shallow copy
console.log(jessica2, jessicaCopy);
*/
