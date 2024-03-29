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
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  this.stops = false;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};

Car.prototype.brake = function () {
  this.speed -= 15;
};

Car.prototype.speedTest = function (maxSpeed, accelRate) {
  const speedTest = setInterval(() => {
    if (this.speed > maxSpeed) {
      console.log(`Time to slow down`);
      this.stops = true;
    }
    if (this.speed <= 5) clearInterval(speedTest);
    if (this.stops) {
      this.brake();
      return;
    }
    this.accelerate();
  }, 3000 * (1 - accelRate / 100));
};

// const car1 = new Car('Hundai', 55);
// // car1.speedTest(80, 30);
// car1.speedTest(220, 10);

/////////////////
/* ES6 CLASSES */
/////////////////

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
console.log(james);

PersonCL.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet(); // Hey Jessica

// IMPORTANT NOTES !!!!!!!!!!!!!!!!!!!!!!!
// 1. Classes are NOT Hoisted
// 2. Classes are first-class citizens (can be passed and returned from functions)
// 3. Classes are ALLWAYS executed in strict mode

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
//////////////////
/* CHALLENGE #2 */
//////////////////
{
  // Slightly modified in order to accomodate set speedUS during speed test and get it to displayed it in the console as the test runs.

  class CarCL {
    constructor(make, speed) {
      this.speed = speed;
      this.make = make;
    }

    accelerate() {
      this.speed += 10;
    }

    brake() {
      this.speed -= 5;
    }

    speedTest(maxSpeed, accelRate) {
      const speedTest = setInterval(() => {
        this.speedUS = this.speed;
        console.log(
          `Speed - ${Math.trunc(this.speedUS)} mph   /   ${Math.trunc(
            this.speed
          )} kph`
        );
        if (this.speed > maxSpeed) this.stops = true;
        if (this.speed <= 50) clearInterval(speedTest);
        if (this.stops) {
          this.brake();
          return;
        }
        this.accelerate();
      }, 3000 * (1 - accelRate / 100));
    }

    get speedUS() {
      return this._speed;
    }

    set speedUS(speed) {
      this._speed = speed / 1.6;
    }
  }

  const carUS = new CarCL('Tesla', 55);
  console.log(carUS);
  // carUS.speedTest(82, 80);
}
/////////////////////////////////
/* INHERITANCE BETWEEN CLASSES */
/////////////////////////////////
{
  // Two ways for implementation inheritance between classes:
  // 1. ES6
  class Student extends PersonCL {
    constructor(fullName, birthYear, course) {
      super(fullName, birthYear);
      this.course = course;
    }
  }

  const jessy = new Student('Jessy James', 22, 'Computer Science');
  console.log(jessy);

  // 2. CF and Object.create()
  const StudentCF = function (firstName, birthYear, course) {
    // connecting this keyword with Person CF so inside Person CF when Person class is called to create new object this will point to instance of StudentCF class.
    Person.call(this, firstName, birthYear);
    this.course = course;
  };
  // Manually assigning prototype of StudentCF new object that inherits from prototype of Person. This way inheritance chain is created and prototype of person becomes the parent of StudentCF
  StudentCF.prototype = Object.create(Person.prototype);

  const mike = new StudentCF('Mike', 24, 'Biology');

  // Tests - if we comment out binding of prototypes above, mike stops beeing instance of Person
  console.log(mike instanceof StudentCF); // true
  console.log(mike instanceof Person); // true - after setting inheritance

  StudentCF.prototype.introduce = function () {
    console.log(
      `My name is ${this.firstName} and I'm studying ${this.course}.`
    );
  };

  console.log(mike);
  mike.calcBirthGoodPractice();
  console.log(mike.__proto__.__proto__); // Person.prototype

  // fix of constructor as before that js thinks the constructor of student is Person
  StudentCF.prototype.constructor = StudentCF;
}

///////////////////////////////////
/* CHALLENGE #3 - EV CHILD CLASS */
///////////////////////////////////
// creating new 'class'
const EV = function (make, speed, battery) {
  // calling parent class with THIS binded to this in EV function ('class')
  Car.call(this, make, speed);
  this.battery = battery;
};
// connecting prototypes through inheritance
EV.prototype = Object.create(Car.prototype);
// adding additional methods to EV prototype
EV.prototype.chargeBattery = function (chargeTo) {
  if (chargeTo > 100) chargeTo = 100;
  this.battery = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.battery -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.battery}%`
  );
};
// Testing functionality
const tesla = new EV('Tesla', 10, 10);
tesla.chargeBattery(25);
tesla.speedTest(200, 75);

/////////////////////////////////////////////////
/* INHERITANCE IMPLEMENTATION WITH ES6 CLASSES */
/////////////////////////////////////////////////
{
  // In case of ES6 classes - all of the inheritance mechanisms are done automatically in the background. We only need to use keyword extends following by name of parent class.
  class StudentCL extends PersonCL {
    constructor(fullName, birthYear, course) {
      // super calls constructor from PersonCL and ALWAYS has to happen first in constructor
      super(fullName, birthYear);
      this.course = course;
    }

    introduce() {
      console.log(
        `My name is ${this.fullName} and I'm studying ${this.course}.`
      );
    }
    // calcAge in child class will overwrite the method with the same name from the parent class
    calcAge() {
      console.log(`I'm ${2037 - this.birthYear} years old`);
    }
  }

  // The code below still works just in a way that StudentCL is 'new name' of PersonCL
  // class StudentCL extends PersonCL {}
  // const martha = StudentCL('Martha Bird', 1995);

  const martha = new StudentCL('Martha Bird', 1995, 'Computer Science');
  martha.introduce();
  martha.calcAge();
}

///////////////////////////////////////////////////
/* COMPLEX PROTOTYPE CHAIN USING OBJECT.CREATE() */
///////////////////////////////////////////////////
{
  // This is the way to create inheritance between:
  // Instance of StudentProto -> StudentProto -> PersonProto -> Object
  // using manuall assignment of relations between these objects (Object.create())
  // That way it is more code than ES6 but the code is clearer and unveil more steps that picture connections between specific objects

  // initial prototype
  const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },

    init(firtsName, birthYear) {
      this.firstName = firtsName;
      this.birthYear = birthYear;
    },
  };

  const steven = Object.create(PersonProto);

  // Manual assignation of inheritance between StudentProto(child) and PersonProto(parent)
  // StudentProto.__proto__ === PersonProto -> true
  const StudentProto = Object.create(PersonProto);

  // editing init method for StudentProto with use of init method from parent (bind this with .call)
  StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
  };

  StudentProto.introduce = function () {
    console.log(
      `My name is ${this.firstName} and I'm studying ${this.course}.`
    );
  };

  const jay = Object.create(StudentProto);
  jay.init('Jay', 2018, 'Chemistry');
  jay.introduce();
  jay.calcAge();
}

//////////////////////////////////////////////////
/* RULES IN WORKING WITH CLASSES, ENCAPSULATION */
//////////////////////////////////////////////////
{
  class Account {
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.current = currency;
      // _ at start of name is convention of PROTECTED properties (not truly private)
      // !this prop is STILL ACCESSIBLE but programmers know that they SHOULD DO IT ONLY using API!
      this._pin = pin;
      this._movements = [];
      this.locale = navigator.language;
      // we can execute any code we want in constructor and it will be executed every time new object is created and constructor function is used
      console.log(`Thanks for opening an accout ${owner}! 💰`);
    }
    // It's very bad practice to EDIT OBJECT PROPERTIES directly in the code. So any edition of object's values should be done throught methods of that object. These methods are called API
    deposit(val) {
      this._movements.push(val);
    }

    withdraw(val) {
      this.deposit(-val);
    }

    // Managing public / private interface - ENCAPSULATION - to prevent user from access and edition of values and methods that he should not have access to
    _approveLoan(val) {
      return true;
    }

    requestLoan(val) {
      if (this._approveLoan(val)) {
        this.deposit(val);
        console.log(
          `Loan of ${val} has been granted and soon the money will be on your account.`
        );
      }
    }

    // this is convention to get values of protected properties.
    getMovements() {
      return this._movements;
    }
  }

  const acc1 = new Account('Bob Ross', 'EUR', 1111);
  console.log(acc1);
  acc1.deposit(200);
  acc1.withdraw(140);
  acc1.requestLoan(1000); // adds 1000 to movements
  // acc1.approveLoan(1000); // this should be private method not accessible for user
}
//////////////////
/* CLASS FIELDS */
//////////////////
{
  // Class Fields are called this way because in traditional OOP languages (Java, C++ etc)properties are called fields
  // 4 types of fields are:
  // Public Fields
  // Private Fields
  // Public Methods
  // Private Methods
  // (There is also static version of each of these fields- methods that can be use only on class itself)

  console.log('----------CLASS FIELDS - TESTS----------');
  class Account {
    // All the pulbic and private fields have to be created outside of the constructor
    // Public Fields
    locale = navigator.language; // syntax similar to variables

    // Private Fields
    #movements = []; // # at the begining cause the property in object private
    #pin; // to create field which value is assigned inside of the constructor we need just to create it and don't assign it to anythig. Then we assign it with this.#name inside constructor.

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.current = currency;
      this.#pin = pin;
      console.log(`Thanks for opening an accout ${owner}! 💰`);
    }

    // Public Methods
    deposit(val) {
      this.#movements.push(val);
      return this; // returning object to allow chaining
    }

    withdraw(val) {
      this.deposit(-val);
      return this; // returning object to allow chaining
    }

    // Private Methods - these are not yet well implemented in browsers. The syntax will work but the method is not a real private method inside prototype but Private filed stored inside an object instance. It will work but new instance of the function will be created with every new instance of an object of Account class.
    #approveLoan(val) {
      return true;
    }

    requestLoan(val) {
      if (this.#approveLoan(val)) {
        this.deposit(val);
        console.log(
          `Loan of ${val} has been granted and soon the money will be on your account.`
        );
      }
      return this; // returning object to allow chaining
    }

    getMovements() {
      return this.#movements;
    }
  }

  const acc1 = new Account('Bob Ross', 'EUR', 1111);
  // console.log(acc1.#pin); // error - Private value
  acc1.deposit(200);
  acc1.withdraw(140);
  acc1.requestLoan(1000); // adds 1000 to movements
  // acc1.approveLoan(1000); // this should be private method not accessible for user

  acc1.deposit(300).deposit(500).withdraw(50).requestLoan(2000);
  console.log(acc1.getMovements());
}
///////////////////////////////////
/* CHAINING METHODS IN OUR CLASS */
///////////////////////////////////
{
  // Chaining is implemented by returning the object at the end of the method.
  // Functionality implemented in example above
}
//////////////////
/* CHALLENGE #4 */
//////////////////
{
  class EVCl extends Car {
    #charge;

    constructor(make, speed, battery) {
      super(make, speed);
      this.#charge = battery;
    }

    accelerate() {
      this.speed += 20;
      this.#charge -= 5;
      console.log(
        `${this.make} is going at ${this.speed} km/h, with a charge of ${
          this.#charge
        }%`
      );
      return this;
    }

    chargeBattery(chargeTo) {
      if (chargeTo > 100) chargeTo = 100;
      this.#charge = chargeTo;
      return this;
    }

    brake() {
      this.#charge += 2;
      this.speed -= 10;
      console.log(`Regenerative breaking - state of charge ${this.#charge} %`);
      return this;
    }
  }

  // Testing functionality
  const tesla = new EVCl('Tesla', 10, 10);
  tesla
    .chargeBattery(25)
    .accelerate()
    .accelerate()
    .accelerate()
    .brake()
    .brake()
    .brake();
}
