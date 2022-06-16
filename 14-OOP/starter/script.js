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

/* static methods part */
// adding hey() method to Person name space - this method is available only to CF
Person.hey = function () {
  console.log('Hey there from CF static method 👋');
  console.log(this); // prints CF as this points to that function in static methods
};
Person.hey(); // Hey there 👋
// bob.hey(); // error - hey is not a function

////////////////////////////////////////////////////
/* PROTOTYPES, PROTOTYPAL INHERITANCE, DELEGATION */
////////////////////////////////////////////////////
// Prot == prototype, Pi - prototypal inheritance
// Goog practice in adding methods to 'classes' created with CF is to add it to prototype. That way we are not generating new function in every object but store 1 instance of the function in prototype so every time one of the object call that function, it wont be found in the class itself so call will be delegated to the prototype where instance of function is stored. This functionality is called PROTOTYPE CHAIN
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
// SCHEME               __________________________
// Object.prototype <-  | Person.prototype       |  <- Person CT
//                      |created in step 3 of new|  <- Person object instance (bob)

// We can also add properties to prototype
Person.prototype.spieces = 'Homo Sapiens';
console.log(bob); // {..., __proto__{..., spiecies: 'Homo Sapiens }, ...}
console.log(bob.hasOwnProperty('firstName')); // true
console.log(bob.hasOwnProperty('spiecies')); // false - spiecies is shared with others in Prot

// PROTOTYPE CHAIN is a Series of links between object linked through prototype. Similarly to SCOPE CHAIN if calling a method does not find it in it's class or prototype it searches up the chain in it's ancestor objects. If the property or method is not found returns null.

///////////////////////////////////////////////////////////////
/* PROTOTYPAL INHERITANCE ON BUILT-IN OBJECT LIKE ARRAYS ETC */
///////////////////////////////////////////////////////////////

console.log(bob.__proto__.__proto__); // Object.prototype - top of prototype chain
console.log(bob.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor); // constructor function itself

const arr = [3, 5, 6, 5, 2, 8, 7, 8, 3, 1];
console.log(arr.__proto__); // prototype of array containing all the methods (.map, .find etc)
console.log(arr.__proto__ === Array.prototype); // true - its the same prot for every instance of array
console.log(arr.__proto__.__proto__); // Object.prototype - top of prototype chain

Array.prototype.unique = function () {
  return [...new Set(this)];
};
// added new method 'unique' accesible to every array (good experiment but VERY BAD PRACTICE)
console.log(arr.unique());
// examples of prototype chains (__proto__)
const h1 = document.querySelector('h1');
console.log(h1); // H1HTMLElement -> HTMLELement -> Elemnent -> Node -> Event Target -> object
console.log(x => x + 1); // f () -> object - functions are also objects so have prototype chain

/////////////////
/* CHALLENGE 1 */
/////////////////
{
  /* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  this.stops = false;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

Car.prototype.speedTest = function (maxSpeed, accelRate) {
  const speedTest = setInterval(() => {
    if (car1.speed > maxSpeed) car1.stops = true;
    if (car1.speed <= 5) clearInterval(speedTest);
    if (car1.stops) {
      car1.brake();
      return;
    }
    car1.accelerate();
  }, 3000 * (1 - accelRate / 100));
};

const car1 = new Car('Hundai', 55);
// car1.speedTest(80, 30);
car1.speedTest(220, 10); */
}

/////////////////
/* ES6 CLASSES */
/////////////////
{
  // ES6 classes works just like functions (and in fact they are functions but special type of functions) and we can delare them in two different ways

  // class expression
  const PersonCLE = class {};
  // class declaration - more similar to class declaration from other languages
  class PersonCL {
    // constructor function has to be named constructor - when we use NEW keyword constructor function will be called
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
    // INSTANCE METHODS - available for all instances from __proto__
    // this is how methods of the class are added and methods added in the class WILL BE ADDED TO __PROTO__ (PROTOTYPE) instead of being created with every instance of an object PersonCL
    calcAge() {
      console.log(2034 - this.birthYear);
    }

    /* getter / setter pattern - validation at the time of creating a new object, overriding default property*/
    get age() {
      return 2034 - this.birthYear;
    } // getter - every object created will have access to age property returning calculated age

    // Setters are usefull for validation. Here this.fullName of the object will be set only if passed name inclused space. If not it
    // in order to avoid naming conflict we use _ at the begining of the variable to set
    set fullName(name) {
      if (name.includes(' ')) {
        this._fullName = name;
        console.log(`${name} is a full name. Great!`);
      } else alert(`${name} is not a full name!`);
    }
    // in order for user to be able to read fullName property without _ we need a getter
    get fullName() {
      return this._fullName;
    }

    // STATIC METHOD created in ES6 classes using 'static' keyword - available only to PersonCL
    static hey() {
      console.log(`Hey there from ES6 classes static method! 👋`);
    }
  }

  PersonCL.hey();

  const jessica = new PersonCL('Jessica Davis', 1996);
  const james = new PersonCL('James', 1985);
  console.log(jessica);
  console.log(jessica.__proto__ === PersonCL.prototype); // true
  console.log(jessica.age); // 38

  PersonCL.prototype.greet = function () {
    console.log(`Hey ${this.firstName}`);
  };

  jessica.greet(); // Hey Jessica

  // IMPORTANT NOTES !!!!!!!!!!!!!!!!!!!!!!!
  // 1. Classes are NOT Hoisted
  // 2. Classes are first-class citizens (can be passed and returned from functions)
  // 3. Classes are ALLWAYS executed in strict mode
}
/////////////////////////
/* GETTERS and SETTERS */
/////////////////////////
{
  // Getters and setters are called assesor properties while normal value properties are called data properties
  // Getters and setters are functions that get and set a value

  const james = {
    name: 'James',
    movements: [122, 432, 594, 664],

    // creating getter and setter for "property" latest
    get latest() {
      return this.movements[this.movements.length - 1];
    },
    // just getter or just setter is enough, it's not required to make both
    set latest(mov) {
      this.movements.push(mov);
    },
  };

  console.log(james.latest); // we use gettter and setter as it would be just a property
  james.latest = 50; // use setter to add value to movements array
  console.log(james.latest); // 50 - last element of movements array is now 50
  // EXERCISE - next part is adding age to PersonCL class from previous lesson
  // if object shown in console. "latest" property will be shown as property NOT function
}

////////////////////
/* STATIC METHODS */
////////////////////
{
  // Good example of static methos is Array.from() which converts array-like structure to array
  // Static methods are methods ATTACHED TO CONSTRUCTOR not the object instances or prototype
  // So Array.from(d.qSA('p')) - works, [1,2,3].from() - throws error (not a function)
  // .from() method is in Array name space.
  // Other examples: Number.parseFloat()
  // EXERCISES in CONSTRUCTOR FUNCTIONS part (at the top) and ES6 CLASSES
}
/////////////////////
/* OBJECT.CREATE() */
/////////////////////
{
  // Using Object.create there is no CF, constructor, new keyword etc. It's way to manually assign prototype (__proto__) to any object we want (slide available). While in previous ways __proto__ was automatically assigned to prototype of CF or class.
  // This is the least used way to create prototypal inheritance

  const PersonProto = {
    // this is prototype of any object initiated with Object.create(PersonProto)
    calcAge() {
      console.log(2037 - this.birthYear);
    },

    // method inside prototype to improve initiation of object while using Object.create()
    init(firtsName, birthYear) {
      this.firstName = firtsName;
      this.birthYear = birthYear;
    }, // something like constructor but in fact completely different. Can have any name
  };

  const steven = Object.create(PersonProto); // steven is an object with PersonProto as prototype
  console.log(steven.__proto__ === PersonProto); // true
  steven.name = 'Steven';
  steven.birthYear = 2002;
  steven.calcAge(); // 35

  const sarah = Object.create(PersonProto); // create new object
  sarah.init('Sarah', 1977); // use method to initiate values instead of NEW keyword
  sarah.calcAge(); // 60 - calculated age of Sarah
}
