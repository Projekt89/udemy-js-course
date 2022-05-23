"use strict";

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio';
// const private = 534;
*/
/*
function logger() {
  console.log('My name is Bob');
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number('23');
*/
/*
function calcAge1(birthYeah) {
  return 2037 - birthYeah;
}
const age1 = calcAge1(1991);

// Function expression
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}
const age2 = calcAge2(1991);

console.log(age1, age2);
*/
/*
const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYeah, firstName) => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement(1991, 'Jonas')); console.log(yearsUntilRetirement(1980, 'Bob'));
*/
/*
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));
*/
/*
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}

const yearsUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
}
console.log(yearsUntilRetirement(1991, 'Bob'));
console.log(yearsUntilRetirement(1950, 'Mike'));
*/
/*
const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5));

// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win: (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win: (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log('No winner.');
  }
}
checkWinner(scoreDolphins, scoreKoalas);

checkWinner(576, 111);

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
checkWinner(scoreDolphins, scoreKoalas);
*/
/*
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']

const firstName = 'Bob';
const bob = [firstName, 'Ross', 2037 - 1956, 'teacher', friends];
console.log(bob);
console.log(bob.length);

const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/
/*
const friends = ['Michael', 'Steven', 'Peter'];

// Add elements
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

// Remove elements
friends.pop(); // Last
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // First
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Steven')) {
  console.log('You have a friend called Steven');
}
*/
/*
const data = [125, 555, 44]

const calcTip = (bill) => (bill > 50 && bill < 300) ? (bill * 0.15) : (bill * 0.2)

const tip = data.map(bill => calcTip(bill).toFixed(2))
const total = data.map(bill => (calcTip(bill) + bill).toFixed(2))

console.log(tip, total)
*/
/*
const bobArray = [
  'Bob',
  'Ross',
  2037 - 1965,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];

const bob = {
  firstName: 'Bob',
  lastName: 'Ross',
  age: 2037 - 1965,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};
*/
/*
const bob = {
  firstName: 'Bob',
  lastName: 'Ross',
  age: 2037 - 1965,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};

console.log(bob);

console.log(bob.lastName);
console.log(bob['lastName']);

const nameKey = 'Name';
console.log(bob['first' + nameKey]);
console.log(bob['last' + nameKey]);

// console.log(bob.'last' + nameKey) // wrong

const interestedIn = prompt('What do you want to know about bob? Choose between firstName, lastName, age, job, and friends');

if (bob[interestedIn]) {
  console.log(bob[interestedIn]);
} else {
  console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

bob.location = 'USA';
bob['twitter'] = '@bobross';
console.log(bob);

console.log(`${bob.firstName} has ${bob.friends.length} friends, and his best friend is called ${bob.friends[0]}`)
*/
/*
const bob = {
  firstName: 'Bob',
  lastName: 'Ross',
  birthDate: 1965,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriverLicense: true,

  // calcAge: function () {
  //   return 2037 - this.age
  // },

  calcAge: function () {
    this.age = 2037 - this.birthDate
    return this.age
  },

  getSummary: function () {
    console.log(`${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he ${this.hasDriverLicense ? 'has' : "doesn't have"} a driver's licence`)
  }
};

console.log(bob.calcAge())
bob.getSummary()
// console.log(bob['calcAge'](1965))
*/
/*
const Mike = {
  height: 1.99,
  weight: 78,

  calculateBMI: function () {
    return this.bmi = this.weight / this.height ** 2
  }
}

const John = {
  height: 1.95,
  weight: 92,

  calculateBMI: function () {
    return this.bmi = this.weight / this.height ** 2
  }
}

if (Mike.calculateBMI() > John.calculateBMI()) {
  console.log(`Mike's BMI (${Mike.bmi}) is higher than Mark's (${John.bmi})`)
} else {
  console.log(`John's BMI (${John.bmi}) is higher than Mike's (${Mike.bmi})`)
}
*/
/*
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} ⚖`);
}
*/
/*
const bob = [
  'Bob',
  'Ross',
  2037 - 1965,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];
const types = [];

for (let i = 0; i < bob.length; i++) {
  console.log(bob[i], typeof bob[i]);
  types.push(typeof bob[i]);
}

console.log(types)

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

console.log('--- ONLY STRINGS ---')
for (let i = 0; i < bob.length; i++) {
  if (typeof bob[i] !== 'string') continue; // exit current iteration

  console.log(bob[i], typeof bob[i]);
}

console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < bob.length; i++) {
  if (typeof bob[i] === 'number') break; // exit loop completely

  console.log(bob[i], typeof bob[i]);
}
*/
/*
const bob = [
  'Bob',
  'Ross',
  2037 - 1965,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];

for (let i = bob.length - 1; i >= 0; i--) {
  console.log(i, bob[i])
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`Starting exercise ${exercise}:`)
  for (let rep = 1; rep < 6; rep++) {
    console.log(`$Lifting weights repetition ${rep} ⚖`)
  }
}
*/
/*
// for works with a counter
// while doesn't need a counter, just condition that can be eventualy achieved
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

let rep = 1;
while (rep <= 10) {
  // console.log(`WHILE: Lifting weights repetition ${rep}`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...');
}
*/
/*
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
const tips = []
const totals = []

const calcTip = (bill) => (bill > 50 && bill < 300) ? (bill * 0.15) : (bill * 0.2)

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]))
  totals.push(calcTip(bills[i]) + bills[i])
}

console.log(tips, totals);

const calcAverage = (arr) => {
  return arr.reduce((prev, current) => (prev + current)) / arr.length
}

console.log(calcAverage(bills));
console.log(calcAverage(tips));
console.log(calcAverage(totals));
*/
