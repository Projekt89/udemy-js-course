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
const [main, , secondary] = restaurant.categories;
// switch values of variables
[secondary, main] = [main, secondary];
// recive two values returned from a function
const [starter, mainCourse] = restaurant.order(2, 0);
// destructuring nested arrays
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
// default values
const [p = 1, q = 1, r = 1] = [8, 9];
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
