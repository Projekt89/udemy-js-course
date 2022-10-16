'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//// HELPER FUNCTION FROM EXERCISE 2 USED IN LATER EXERCISES ////
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span> ${(
        +data.population / 1000000
      ).toFixed(2)}</p>
      <p class="country__row"><span>🗣️</span> ${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span> 
      ${data.currencies[Object.keys(data.currencies)[0]].name} 
      ${data.currencies[Object.keys(data.currencies)[0]].symbol}
      </p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
{
  ///////////////////////////////////
  /* AJAX Call with XMLHttpRequest */
  ///////////////////////////////////
  /* Exercise 1: Make an AJAX Call using old method in order to get data about country from online API and render in the web browser */
  /*
  AJAX Call is a way to send a request to the server in order to aquire some data from a server or online API. Back then in order to make such request we were using XMLHttpRequest object. Now we do it using a FETCH API

  AJAX Call makes a request. Listen for 'load' event on variable that stores reference to request object and in calback function we can access response under this.responseText. Use JSON.parse to transfore text into json object. 
*/
  /*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span> ${(
          +data.population / 1000000
        ).toFixed(2)}</p>
        <p class="country__row"><span>🗣️</span> ${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
        <p class="country__row"><span>💰</span> 
        ${data.currencies[Object.keys(data.currencies)[0]].name} 
        ${data.currencies[Object.keys(data.currencies)[0]].symbol}
        </p>
      </div>
    </article>
  `;
    console.log(html);

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('canada');
getCountryData('norway');
*/
}
{
  ///////////////////////////////////////////////////////////
  /* Render Neighbour - Nested AJAX Call and Callback Hell */
  ///////////////////////////////////////////////////////////
  /* Exercise 2: Make an AJAX Call using old method in order to get data about country's neighbour from online API and render in the web browser. Refactor code and make nested callbacks to achieve rendering of countries in desired order. */
  /*
  Callback hell is when we have request inside a request inside a request etc. It is a method of forcing execution of requests in planned order however it is a BAD PRACTICE.
  */
  /*
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span> ${(
        +data.population / 1000000
      ).toFixed(2)}</p>
      <p class="country__row"><span>🗣️</span> ${
        data.languages[Object.keys(data.languages)[0]]
      }</p>
      <p class="country__row"><span>💰</span> 
      ${data.currencies[Object.keys(data.currencies)[0]].name} 
      ${data.currencies[Object.keys(data.currencies)[0]].symbol}
      </p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //render selected coutry
    renderCountry(data);

    //get neighbour country
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // !!! HERE CALLBACK HELL STARTS !!!
    
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('canada');
*/
}
{
  ////////////////////////////
  /* FETCH API and PROMISES */
  ////////////////////////////
  /* Exercise 3: Make call to online API using fetch API and console log the promise in the response */
  /*
  Promises were introduces by ES6 (2015)
  Promise - its an object that is used as a container for the future result of asynchronous operation (for example AJAX Call)
  
  Thanks to promises we don't need to rely on events and callbacks in asynchronus functions like shown in previous exercises. 
  
  Instead of nesting callbacks we can chain promisses what allows us to escape callback hell
  
  {PROMISE LIFECYCLE}
    Pending - before value is available
    Settled - when asynchronous task has finished (happen only once)
      -> Fulfilles - when the data is returned and accesible 
      -> Rejected - when error occured
    Build Promise - Usually done by Fetch API but is also possible to build a promise manually
    Consume Promise - Use data from a promise
  */
  /*
  const request = fetch('https://restcountries.com/v3.1/name/norway');
  console.log(request)
  */
}
{
  ////////////////////////
  /* CONSUMING PROMISES */
  ////////////////////////
  /* Exercise 4: Make call to online API using fetch API and conduct consuming of response using .then() methods in chain. Generate country from fetched data in the browser (same as in exercise 1) */
  /*
    to consume promise we start with then method after making a call with fetch api.

    Fetch API when return data, returns response object with different values. One of these values is body of the response which is actually the data we ask for but in READABLE STREAM format. To transform that into data format that we can use we chain .THEN method with RES object as an argument after FETCH call and we use .JSON() method on the response object (res.json()).

    .json() method returns another promise that we consume with another .then method. This time as an argument we of function passed to then method is passed the actual data returned from fetch api in a format that is usable in the code. It's good practice to name that argument 'data' as it is the data that we use not just response that we have to convert in some way as in previous .then method.
 */
  /*

  // Fetching data using Fetch api
  const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      // first then - converting response
      .then(res => res.json())
      // second then - using converted data
      .then(data => renderCountry(data[0]));
  };

  getCountryData('mexico');
  */
}
{
  ////////////////////////
  /* CHAINING PROMISES  */
  ////////////////////////
  /* Exercise 5: Make call to online API using fetch API and 
  render conunty and it's neighbour from fatched data. Chain promises to consume them in order therefore avoiding callback hell */
  /* .then() method ALWAYS return a promise. If we return some value from .then() method, that value will become fulfilment value of that promise.

  The KEY to avoid callback hell and still avieve order of execution in asynchronus calls is to make fetch call at the end of preceding call consumption (second .then() method) and RETURN promise returned by that fetch call. Then that promise after fulfilment is consumed by adjacent .then() methods.

  fetch(promise1)
    .then(res1)
    .then((data1) => return fetch(promise2))
    .then(res2)
    .then(data2 => etc.)
    
  */
  /*
  // Fetching data using Fetch api
  const getCountryData = function (country) {
    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      // first then - converting response
      .then(res => res.json())
      // second then - using converted data
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];

        if (!neighbour) return;
        // Country 2
        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
      })
      .then(res => res.json())
      .then(data => renderCountry(data[0], 'neighbour'));
  };

  getCountryData('mexico');
  */
}
{
  //////////////////////////////////
  /* HANDLING ERRORS IN PROMISES  */
  //////////////////////////////////
  /* Exercise 6: 
  Study ways of handling errors that can occure during loading process. 
  Use second funciton in then(), catch(), finally() methods to catch error. 
  Throw errors manually. 
  Generate and show message based on error object. 
  Create helper function for handling errors and another for requesting data and throwing errors */
  /* 
  1. Second function passed to the .then() method is used for handling errors but it is not good practice to handle errors this way because every single .then() method would need to have it's own error handling function.
  .then(res => res.json(), err => alert(err))

  2.  Adding a .catch() method at the end of a method chain allow you to cach any error that may occur during execution of that chain. It's because errors propagate down the chain of execution. The catch() method accept error object as an argument which contains for example message property.

  3. Throwing errors manually. In some cases like 404, error is not thrown. In such cases we should manually handle the errors in a way understandeble for user. To do it we use throw new Error()

  4. .finally() method is a method that we can add at the very end of a chain of execution and it is a method that will ALWAYS be executed at the end even if during the execution an error occures. Usefull to for example hiding loading animation regardless of the result of fetch call.

  */
  /*
  const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
  };

  const getJSON = function (url, msg = 'Something went wrong') {
    return (
      fetch(url)
        // first then - converting response
        .then(res => {
          if (!res.ok) throw new Error(`${msg}, ${res.status}`);

          return res.json();
        })
    );
  };

  // Fetching data using Fetch api
  const getCountryData = function (country) {
    // Country 1
    getJSON(
      `https://restcountries.com/v3.1/name/${country}`,
      `No ${country} country found!`
    )
      // second then - using converted data
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];

        if (!neighbour) throw new Error('No neighbour found');
        // Country 2
        return getJSON(
          `https://restcountries.com/v3.1/alpha/${neighbour}`,
          'Country not found'
        );
      })
      .then(data => renderCountry(data[0], 'neighbour'))
      .catch(err => {
        renderError(`💣 ${err.message} 💣`);
      })
      .finally(() => (countriesContainer.style.opacity = 1));
  };

  btn.addEventListener('click', function () {
    getCountryData('Austria');
  });
  */
}
{
  ////////////////////////
  /* CODING CHALLENGE 1 */
  ////////////////////////
  const getCoordinates = function () {
    let coords = '';
    navigator.geolocation.getCurrentPosition(function (pos) {
      coords = pos.coords;
      console.log(coords);
    });
    return [coords.latitude, coords.longitude];
  };

  const whereAmI = function (lat, lng) {
    //render country based on coords
    fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=816179578821611767486x30853`
    )
      .then(res => {
        if (!res.ok)
          throw new Error(
            'Too many requests to the server, error ' + res.status
          );

        return res.json();
      })
      .then(data => {
        console.log(data);

        return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
      })
      .then(res => {
        if (!res.ok) throw new Error('No such country found');

        return res.json();
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(err.message))
      .finally(() => (countriesContainer.style.opacity = 1));
  };

  const coords = [
    [51.50354, -0.12768],
    [52.508, 13.381],
    [19.037, 72.873],
    [-33.933, 18.474],
  ];

  console.log(getCoordinates());

  btn.addEventListener('click', () => {
    coords.forEach(place => whereAmI(...place));
  });
}
