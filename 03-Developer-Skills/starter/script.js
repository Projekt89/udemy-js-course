// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
1. understand
- What's the amplitude?
- what's the sensor error?

2. divide into small problems
- How to ignore errors
- how to find highest value in array
- how to find lowest value in array
- calculate the difference and return it
- where to store returned value

3. write pseudo code (use internet in case of difficulties)
function calcAmplitude(arr) {
  const max = get highest element of the arr
    {
      for (let i=0; i < arr.length; i++) {
        if (arr[i] !== 'number') continue
        if (arr[i] > max) max = arr[i]
      }
    }
  const min = get lowest element from the arr
    () => {
      Math.min(...arr.filter(val => {
        if (typeof(val) === 'number') return val
      }))
    }
    // or use Math.min/max(...arr)
  return max - min
}

4. Implement the most suitable solution
const calcAmplitude = (arr) => {
  const max = Math.max(
    ...arr.filter((val) => (typeof val === "number" ? val : null))
  );
  const min = Math.min(
    ...arr.filter((val) => (typeof val === "number" ? val : null))
  );
  return max - min;
};

console.log(calcAmplitude([-1, -3, -6, 0, "error", 5, 8, 13, 19]));

/////////// Temperatures in 2 arrays ///////////////////
1. function has to recive 2 arrays not 1
2. Need to recive 2 arguments, check if it's array and marge it into one array. Rest can stay the same

4.  const calcAmplitude = (arr1, arr2) => {
  let arr = [];
  if (arr1.length > 0) arr = [...arr1];
  if (arr2.length > 0) arr = [...arr, ...arr2];
  //rest the same as in function above
  const max = Math.max(
    ...arr.filter((val) => (typeof val === "number" ? val : null))
  );
  const min = Math.min(
    ...arr.filter((val) => (typeof val === "number" ? val : null))
  );
  return max - min;
};

console.log(
  calcAmplitude([-1, -3, -6, 0, "error", 5, 8, 13, 19], [-10, 11, "error"])
);
*/
/*
const measureKelvin = () => {
  const measurment = {
    temp: "temp",
    unit: "celsius",
    //value: Number(prompt("Degrees celsius")),
    value: 10,
  };

  debugger;
  const kelvin = measurment.value + 273;
  return kelvin;
};

console.log(measureKelvin());
*/
/*
1. 
-how to extract every position from the given array
-make sure you have correct data
-put them into a string or array and then join().


2.
-get sure you have an array
-make sure you have a number from array
-need variable to store the string or array
-concatenate data into one string and print in console

3.
const printForecast = array => {
  let forecast = ''
  if (array is an array){
    for (every element in array) {
      if (is element a number) {
        forecast = `${forecast} ... ${array[i]C in [i+1] days} ...`
      } 
    }
  }
  return forecast
}

4. solution
const printForecast = (arr) => {
  let forecast = "";
  if (arr.length > 0) {
    arr.forEach((el, i) => {
      if (typeof el === "number") {
        forecast = `${forecast}... ${arr[i]}℃ in ${[i + 1]} days `;
      }
    });
  } else {
    return "Sorry no forecast this time";
  }
  return `${forecast} ...`;
};

console.log(printForecast([10, 13, 16, "error", 22]));
*/
