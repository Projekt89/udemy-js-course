'use strict';
// WHAT IS OOP, OBJECTS, CLASES ETC. - FUNDAMENTALS (mostly known already)
// PRINCIPLES
// + ABSTRACTION - hiding/ignoring details that dont matter to user
// + ENCAPSULATION - making methods/properities inside the class private. Some public methods  of the class (called PUBLIC INTERFACE (API)) can expose private stuff for changes.
// + INHERITANCE - inheritance of props and methods by child class
// + POLYMORPHISM - child class can overwrite the property or method of parrent class

// Difference in OOP in JS vs Many other languages
// Prototypal inheritance - In JS there is prototype that contains methods and object is an instance that is linked to that prototype. Bahoviour of instance is DELEGATED to linked prototype object. Prototypal inheritance works opposite to instantiation (see picture)
// How to create classes?
// + Constructor functoins
// + ES6 Classes - the same as constructor functions but more modern syntax
// + Object.create() - eastiest way to link an object to  custom prototype object (class)
///////////////////////////////////
/* CONSTRUCTOR FUNCTIONS and NEW */
///////////////////////////////////
// Constructor Function === CF

// CF example - name allways start with capital letter, arrow functions doesn't work as CF as we need this keyword in those functions
const Person = function (firstName, personAge) {
  this.name = firstName;
  this.age = personAge;

  // BAD PRACTICE - YOU SHOULD NEVER CREATE METHODS INSIDE CONSTRUCTOR FUNCTIONS !!!!!!!!
  this.calcBirthBadPractice = function () {
    console.log('Bad practice - method in CF', 2037 - this.age);
  };
  // if thousands of instances are created each would have it's own separate method - for methods we should use prototypes and inheritance in order achieve much better performance
};
// How NEW keyword works with CF - stap by step
const bob = new Person('Bob', 24);
// NEW creates new instance of an object. It works in 4 steps:
// 1. new empty {} is created
// 2. function is called and THIS GETS ASSIGNED TO NEWLY CREATED OBJECT
// 3. {} gets linked to the prototype
// 4. function automatically returns that newly created {}
console.log(bob);
bob.calcBirthBadPractice();

const jack = new Person('Jack', 51); // new object with passes data

// testing if object is instance of 'class'
console.log(bob instanceof Person); // true
const frank = {};
console.log(frank instanceof Person); // false
////////////////////////////////////////////////////
/* PROTOTYPES, PROTOTYPAL INHERITANCE, DELEGATION */
////////////////////////////////////////////////////
// Prot == prototype, Pi - prototypal inheritance
// Goog practice in adding methods to 'classes' created with CF is to add it to prototype
Person.prototype.calcBirthGoodPractice = function () {
  console.log('Prototypal inheritance: ', 2037 - this.age);
};

bob.calcBirthGoodPractice(); // 2013
jack.calcBirthGoodPractice(); // 1986

console.log(bob.__proto__); // prototype of bob object instance (so prototype property of CT)
console.log(bob.__proto__ === Person.prototype); // true
// Person.prototype is not prototype of Person - it's a separate prototype property created in Person which is prototype that will be used for every object created with person CT

console.log(Person.prototype.isPrototypeOf(bob)); // true
console.log(Person.prototype.isPrototypeOf(frank)); // false
// SCHEME
// prototype <- Person    <- Person.prototype    <- Person object instance (bob)
//                     |created in step 3 of new|
// We can also add properties to prototype
Person.prototype.spieces = 'Homo Sapiens';
console.log(bob); // {..., __proto__{..., spiecies: 'Homo Sapiens }, ...}
console.log(bob.hasOwnProperty('firstName')); // true
console.log(bob.hasOwnProperty('spiecies')); // false - spiecies is shared with others in Prot
