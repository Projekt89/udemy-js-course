'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // destructuring parameters object and assigning default values
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20: 00',
    address,
  }) {
    console.log(
      `Order received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngr, ...otherIngr) {
    console.log(mainIngr, otherIngr);
  },
};

// Exercises
/////////////
/* STRINGS */
/////////////
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[2]); // 2
console.log('B737'[2]); // 3
console.log(airline.length); // 16

console.log(airline.indexOf('r')); // 6
console.log(airline.indexOf('portugal')); // -1 /case sensitive
console.log(airline.lastIndexOf('r')); // 10

console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air

// first and last word
console.log(airline.slice(0, airline.indexOf(' '))); // Tap
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal
console.log(airline.slice(-2)); // al (counting from left)
console.log(airline.slice(1, -1)); // slice first and last character

// Example. Checking if your seat is in the middle
const checkMiddleSeat = function (...seat) {
  //B and E are middle seats
  const s = seat.map(seat => seat.slice(-1));
  s.forEach(el =>
    el === 'B' || el === 'E'
      ? console.log('You got middle seat ' + el)
      : console.log('You got lucky, seat ' + el)
  );
};
checkMiddleSeat('11B', '23A', '3E', '15D');

// Fix capitalization in name - .toLowerCase(), .toUpperCase()
const person = 'jeSsiCA';
const fixed = person[0].toUpperCase() + person.slice(1).toLowerCase();
console.log(fixed);

// comparing emails -  .trim() - cuts out spaces, new lines etc.
const email = 'bobross@email.com';
const loginEmail = '   BobRoss@email.Com \n';
const normalizedEmail = loginEmail.toLowerCase().trim();
email === normalizedEmail ? console.log(true) : console.log(false);

// replacing  -  replace("","") is as well !!CASE SENSITIVE!!
const priceGB = '288,97£';
const priceUS = priceGB.replace(',', '.').replace('£', '$');
console.log(priceUS);

const announcement =
  'All passengers of flight WZ6116 please head for boadring door 23! Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate')); // using replaceAll
console.log(announcement.replace(/door/g, 'gate')); // using regEx

// Booleans - includes(''), startsWith(''), endsWith('') !!CASE SENSITIVE!!
console.log(airline.includes('Por')); // true
console.log(airline.startsWith('Por')); // false

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('gun') || baggage.includes('knife'))
    console.log('You are not allowed on board');
  else console.log('Welcome aboard!');
};
checkBaggage('I have a laptop, some Food and pocket Knife');

// Split and Join - .split(' ')  .join(' ')
console.log('a+very+nice+string'.split('+')); // ['a', 'very', ... ]
console.log('Bob Ross'.split(' '));

const [firstName, lastName] = 'Bob Ross'.split(' ');
console.log(['Mr.', firstName, lastName.toUpperCase()].join(' '));

const capitalizeName = function (name) {
  const names = name.split(' ');
  const capitalized = names.map(n => n[0].toUpperCase() + n.slice(1));
  console.log(capitalized.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('bob ross');

// Padding - fills string to n chars .padStart(n, '*') .padEnd(10, '$')
const message = 'Go to gate 21';
console.log(message.padStart(25, '+')); // ++...+Go to gate 21 //len = 25
console.log(message.padEnd(25, '+')); // Go to gate 21++...++ //len = 25

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  console.log(last.padStart(str.length, '*'));
};
maskCreditCard(5432168465987543);

// Repeat - repeats string n times .repeat(n)
const message2 = 'Bad weather... All departures delayed';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛬'.repeat(n)}`);
};
planesInLine(5);
*/
////////////////////
/* MAPS ITERATION */
////////////////////
/* 
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try Again!'],
]);
// it's the same structure as returned from Object.entries() [key, value]
console.log(question);

// Convert OBJECT to MAP
const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer:'));
question.get('correct') == answer
  ? console.log(question.get(true))
  : console.log(question.get(false));

// Convert MAP to ARRAY
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
*/
//////////
/* MAPS */
//////////
/*
// Bind values with keys like in objects but KEY CAN BE ANY TYPE
const rest = new Map();
rest.set('name', 'Pizzeria'); // {"name" => "Pizzeria"} // map element
rest
  .set(1, 'Firenze, Italy')
  .set(2, 'Lisbon, Portugal')
  .set('cat', restaurant.categories) // SET method can be chained
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open!')
  .set(false, 'We are closed');
console.log(rest.get(false)); // use GET(KEY) to get data from map
console.log(rest.get('name')); // get cant be chained

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// logic returns true so print 'We are open!' into the console
console.log(rest.has('cat')); // true // HAS works like includes
rest.delete(2); // DELETE removes position with passed key
console.log(rest.size); // SIZE same as length
rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // undefined. Despite passing the same array to retirive a value, it's another object in the HEAP.
// if key = object we must pass pointer to that object as a key
const arr = [2, 3];
rest.set(arr, 'Test2');
console.log(rest.get(arr)); // Test2
// it's usefull for making maps of DOM elements
rest.set(document.querySelector('h1'), 'Heading');

console.log(rest);
// rest.clear(); // CLEAR make the map empty
*/
//////////
/* SETS */
//////////
/*
// Creating: new Set([array]) - iterable data structure as argument
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Risotto',
  'Pizza',
  'Risotto',
  'Pizza',
]);
console.log(ordersSet); // {'Pasta', 'Pizza', 'Risotto'} - no duplicates
// Set is iterable, ever value is unique, order is irrevelant
console.log(new Set('Bob')); // {'B', 'o', 'b'},
console.log(ordersSet.size); // 3 // SIZE not length
console.log(ordersSet.has('Pizza')); // true // HAS is like includes
ordersSet.add('Garlic Bread'); // ADD ads element to set
ordersSet.delete('Garlic Bread'); // DELETE remove el. from set
ordersSet.clear(); // Removes all elements from the set
// Retriving data from Set: Set is used to store a unique value not to retrive it. If value needs to be retrived, use ARRAY
for (const order of ordersSet) console.log(order); // set is loopable
// Example
const staff = ['Waiter', 'Chef', 'Manager', 'Waiter', 'Waiter', 'Chef'];
const staffUnique = [...new Set(staff)]; // {'Waiter', 'Chef', 'Manager'}
console.log(staffUnique); // staffUnique converted to ARRAY above
console.log(new Set(staff).size); // number of unique positions in rstrant
// how many letters are there in a name
console.log(new Set('bobross').size); // 4
*/
//////////////////////////////
/* LOOPING OVER THE OBJECTS */
//////////////////////////////
/*
// Looping over object keys using .keys() [key1, key2, key3, etc]
for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day); // logs days from array of keys ['thu','fri','sat']
}
// looping over values using .values() [val1, val2, val3, etc]
for (const val of Object.values(restaurant.openingHours)) {
  console.log(val); // logs values from array of values [{},{},{}]
}
// looping using .entries() [[key1, val1],[key2,val2],[etc, etc]]
for (const ent of Object.entries(restaurant.openingHours)) {
  console.log(ent); // logs out arrays with [key, value]
  // [day, {open, close}] // ex. destr. of el. from object.entries
}
*/
///////////////////////
/* OPTIONAL CHAINING */
///////////////////////
/*
console.log(restaurant.openingHours.mon); // undefined
// console.log(restaurant.openingHours.mon.open); //Error no property with name of 'open' in undefined`
console.log(restaurant.openingHours.mon?.open); // undefined
console.log(restaurant.openingHours?.mon?.open); // undefined
// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const hours = restaurant.openingHours?.[day]; //need to use [] to insert value of variable into selection chain
  hours
    ? console.log(`${day} opening hours: ${hours.open} - ${hours.close}`)
    : console.log(`${day}: closed`);
}
// Call method if exist
console.log(restaurant.order?.(0, 1) ?? "Method doesn't exist");
console.log(restaurant.orderRisotto?.('0, 1') ?? "Method doesn't exist");
// Also works with ARRAYS
const users = [{ name: 'Bob', email: 'bob@email.com' }];
console.log(users[0]?.name ?? 'User array empty');
*/
/////////////////////////////////
/* ENHANCED OBJECT LITERALS ES6*/
/////////////////////////////////
/*
// 3 enhancements
const age = {
  age: 1965,
};
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const bob = {
  name: 'Bob',
  // enhancement number 1
  // age: age, //version before es6
  age, // after es6 - variable with name age and value of object age
  // enhancement number 2
  // order: function() {} // before es6
  order() {}, // after es6
  // enhancement number 3
  // operations on object keys inside square brackets []
  [weekdays[3]]: 'open',
  [`day-${2 + 4}`]: 'closed',
  [(weekdays[3] === 'tue' && 'second') || 'everyday']: 22,
};
console.log(bob);
*/
/////////////////
/* FOR OF LOOP */
/////////////////
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for of loop syntax. For of handles continue and break keywords
for (const item of menu) console.log(item); // item = value
// in order to get index in for of loop we need to use entries method
for (const item of menu.entries()) {
  // item = [index, value]
  console.log(`${item[0] + 1}: ${item[1]}`); // string - 1: itemName
}
// destructuring entries tight in the loop // string - 1: itemName
for (const [i, el] of menu.entries()) console.log(`${i++}: ${el}`);
*/
/////////////////////////////////////////
/* LOGICAL ASSIGNMENT OPERATORS ES 2021*/
/////////////////////////////////////////
/*
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Pizza',
  owner: 'Giovanni Rossi',
};
rest1.numGuests = rest1.numGuests || 10; // 10
rest2.numGuests = rest2.numGuests || 10; // 10
// OR Asignment operator does the same as above
rest1.numGuests ||= 10; //10
rest2.numGuests ||= 10; //10
// NULLISH Assignment operator (null or undefined)
rest1.numGuests ??= 10; // 0
rest2.numGuests ??= 10; // 10
// AND Assignment operator
rest1.owner &&= 'ANONYMOUS'; // assigns only if value is truthy so no value
rest2.owner &&= 'ANONYMOUS'; // ANONYMOUS
*/
////////////////////////////////////
/* ?? NULLISH COALESCING OPERATOR */
////////////////////////////////////
/*
restaurant.numGuests = 0;
const guestWrong = restaurant.numGuests || 10;  // 10
const guestCorrect = restaurant.numGuests ?? 10;  // 0
// ?? operator react only on Nullish values (null and undefined)
*/
//////////////////////////////
/* &&, ||, SHORT CIRCUITING */
//////////////////////////////
/*
// Operator ||
// Use any data type, return any data type
// short circuiting mean if first true value is immidiately returned
console.log(3 || 'Bob'); // log out 3
console.log('' || 'Bob'); // Bob
console.log(true || 0); // true
console.log(undefined || null); // null

const guests2 = restaurant.numGuests || 10; // if rest.numGuests is 0 it still assign 10 what is an ERROR
console.log(guests2); // if numGuests is falsy assign default value of 10

// Operator &&
// short circut using && returns first falsy value. If all values are true then returns the last truthy value
console.log(0 && 'Bob'); // 0
console.log(7 && 'Bob'); // Bob
console.log('Hello' && 22 && null && 'Bob'); // null

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'onion', 'ham');
*/
//////////////////
/* REST PATTERN */
//////////////////
/*
// 1. Destructuring:
// Spread is on right side of =, Rest is on left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5]; // a=1, b=3, c=[3,4,5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.sideMenu,
]; // Pizza, Risotto, [rest of foods after last directly assigned value], skipped elements remain skipped, so rest can only be at the end
// Objects
const { sat, ...weekdays } = restaurant.openingHours; //sat, {thu, fri}

// 2. Functions
// Rest parameters - create table with any number of parameters
const add = function (...numbers) {
  let sum = numbers.reduce((prev, next) => prev + next);
  return sum;
};
add(4, 3, 5, 6, 2, 7); //27
add(...others); //12

restaurant.orderPizza('mushrooms', 'onion', 'olives');
// mainIngr = mushrooms, restIngr = [onion, olives]
*/
/////////////////////////
/* ... SPREAD OPERATOR */
/////////////////////////
/*
const arr = [7, 8, 9];
// spread array values in another array
const newArr = [1, 2, ...arr];
console.log(...newArr); // log -> 1 2 7 8 9
// create new SHALLOW COPY of mainMenu array and add 1 more value
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// join 2 arrays using spread
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// ... can be used on all iterables but not on objects
const str = 'Bob';
const letters = [...str, '', 'S']; //['B', 'o', 'b', '', 'S']
// spreading values to func. arguments to use in template literal
restaurant.orderPasta(...arr);
// objects
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant, // copy vlaues of restaurant into new object
  founder: 'Giuseppe',
};
// object copies are as well SHALLOW so copy is only in 1 lvl of data structure
*/
///////////////////////////
/* DESTRUCTURING OBJECTS */
///////////////////////////
/*
// need exact names of vlaues in object. Order is not important. : - as
const { name: restaurantName, openingHours: hours, categories } = restaurant;
// default value / default value + name change
const { menu = [], starterMenu: starters = [] } = restaurant;
// Mutating a variable
let a = 111;
let b = 888;
const obj = { a: 22, b: 11, c: 33 };
// cant use const or let as variables are already declared. need to mutate them. When line started with {} JS expect a code block. We cannot assigned anything to code block so need to wrap operation with parenthesis
({ a, b } = obj);
// nested objects + change name
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
// destructurins parameters object in function / method
restaurant.orderDelivery({
  time: '22:30',
  address: 'Karakana 15',
  mainIndex: 2,
  starterIndex: 2,
});
*/
//////////////////////////
/* DESTRUCTURING ARRAYS */
//////////////////////////
/*
const arr = [2, 3, 4];
const [x, y, z] = arr; // destructuring array into 3 variables
// ommiting a value during destructurizing
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
// switch values of variables
[secondary, main] = [main, secondary];
console.log(main, secondary);
// recive two values returned from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);
// destructuring nested arrays
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(nested, i, j, k);
// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
/////////////////////////
/* CODING CHALLENGE #1 */
/////////////////////////
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

function printGoals(...players) {
  console.log(...players);
  console.log(`${players.length} goals were scored`);
}
printGoals(...game.scored);
const odds = (team1 < team2 && 'team1') || (team1 > team2 && 'team2');
console.log(odds);
*/

/////////////////////////
/* CODING CHALLENGE #2 */
/////////////////////////
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// log out string goal number: player
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}
// calculate average odd
const odds = Object.value(game.odds);
let average = 0;
for (const odd of odds) average += odd;
console.log((average /= odds.length));
console.log(
  Object.values(game.odds).reduce((a, b) => a + b) /
    Object.values(game.odds).length
);
// generate strings which team has what odd to win
for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game?.[key] ? 'victory ' + game[key] : 'draw'}: ${value}`
  );
}
// BONUS create object with players as keys and number og goals as value
const scorers = {};
for (const player of Object.values(game.scored)) {
  scorers[player] = scorers?.[player] + 1 || 1;
}
console.log(scorers);
*/
/////////////////////////
/* CODING CHALLENGE #3 */
/////////////////////////
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
// 1
const events = [...new Set(gameEvents.values())];
console.log(events);
// 2
gameEvents.delete(64);
// 3
console.log(
  `An event happened, on average, every ${
    [...gameEvents.keys()].pop() / gameEvents.size
  } minutes`
);
// 4
for (const [key, value] of gameEvents) {
  console.log(`${key < 45 ? '[FIRST' : '[SECOND'} HALF] ${key}: ${value}`);
}
*/
