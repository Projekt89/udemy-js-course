'use strict';

////////////////////////
/* PLANNING A PROJECT */
////////////////////////
// 1. USER STORIES - Description of the app functionality from user's perspective. All user stories together describe the application
// 2. FEATURES - First selection of required functionalities based on user stories
// 3. FLOWCHART - Creating a flowchart describing how to achieve planned features
// 4. ARCHITECTURE - Deciding HOW do we build it. Using OOP, functional programming, objects, arrays, which DB, which API etc.
// 5. DEVELOPMENT - Implementation of the plan using code (programming)

// 1. User stories:
// Common format:
// As a [type of user], I want [an action] so that [a benefit]
// Planning a project pt 1 - picture

// 2. Features:
// User story:
// Log running workouts with location, distance, time, pace and steps/minute:
// - Map where user clicks to add new workout (best way to get location)
// - Geolocation to display map at current location (more user friendly)
// - Form to input distance, time, pace, steps/minute
// User story 2: ... etc
// Planning a project pt 2 - picture

// 3. FLOWCHART
// It's good to start making flowchart from events.
// Common pattern is Event -> Preparing -> reaction or event -> reaction
// Flowchart doesn't have to be very detailed, it has to capture the main flow of data in our application
// Example picture pt 3

// 4. ARCHITECTURE
// Architecture is as well not necessery to be planed with detail. It's ok to make changes in the architecture of the project during experimenting in development phase but it's important that we know to some extent which tools and how we want to use

// 5. DEVELOPMENT
// In this phase it's important that we have all previous steps figured out so we know what tools we need and what we need them for

/////////////
/* PROJECT */
/////////////

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/////////////////////////////////////
/* PT 1 - BROWSER GEOLOCATION API  */
/////////////////////////////////////
{
  // // to get location of the device we use built in geolocation API
  // navigator.geolocation.getCurrentPosition(
  //   function (pos) {
  //     // first function execute if we get the users geolocation succesfully
  //     // pos is object containing various data about location including coordinations
  //     const { latitude, longitude } = pos.coords; // destructuring user coords
  //     // example of using user geolocaiton with google maps
  //     // console.log(`https://www.google.com/maps/@${latitude},${longitude}z`);
  //   },
  //   function () {
  //     // second function is for handling errors (for ex. if user don't allow sharing location)
  //     alert('Could not get yoru position');
  //   }
  // );
}

////////////////////////
/* PT 2 - LEAFLET API */
////////////////////////
{
  // // LEAFLET is a library for easly adding maps to our website. Based on openstreet map
  // // Example of implementing map with events, style and markers
  // let map, mapEvent;
  // // implementing obtaining geolocation from browser, setting up leaflet map, handling clicks on map to obtain click coords and showing form. Handling inability to get geolocation from user.
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(
  //     function (pos) {
  //       const { latitude, longitude } = pos.coords;
  //       const coords = [latitude, longitude];
  //       // map - variable, L.map('mapContainerId').setView(arrayWithCoords, zoom)
  //       map = L.map('map').setView(coords, 13);
  //       // in map variable we store leaflet map object that we can later interact with (see docs)
  //       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  //         attribution:
  //           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //       }).addTo(map);
  //       // map object can perfore even listener which takes mapEvent object as an argument. On that event object there is available a lot of data related to click interaction with map object
  //       // Adding functionality related to click on map (popup and form)
  //       map.on('click', function (mapE) {
  //         mapEvent = mapE;
  //         form.classList.remove('hidden');
  //         inputDistance.focus();
  //       });
  //     },
  //     function () {
  //       alert('Could not get yoru position');
  //     }
  //   );
  // }
  // // handling submiting form - submiting form creates popup and pin at clicked coords
  // form.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   // clear input fields
  //   inputCadence.value =
  //     inputDistance.value =
  //     inputDuration.value =
  //     inputElevation.value =
  //       '';
  //   // adding marker to map at clicked coords, binding it with customized popup
  //   const { lat, lng } = mapEvent.latlng;
  //   L.marker([lat, lng])
  //     .addTo(map)
  //     .bindPopup(
  //       L.popup({
  //         // L.popup accepts object of options to customize content of the popup
  //         maxWidth: 250,
  //         minWidth: 100,
  //         autoClose: false,
  //         closeOnClick: false,
  //         className: 'running-popup',
  //       })
  //     )
  //     .setPopupContent('Workout')
  //     .openPopup();
  // });
  // // handling changes in form depending on workout type
  // inputType.addEventListener('change', function () {
  //   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  //   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  // });
}

///////////////////////////////////////////////////////////
/* PT 3 - PLANNING AND IMPLEMENTING PROJECT ARCHITECTURE */
///////////////////////////////////////////////////////////

// Projecting an architecture is creating a structure to which we are going to adhere in the project
// In this project we will use architecture based on OOP so classes and objects
// Main question to answer when creating architecture - WHERE AND HOW TO STORE THE DATA
//
// To directly and carefully controll the flow of data inside the app we will create class App which will handle events happening in the app as it's methods.

// Architecture based on clases can be planned based on user stories
// Architecture in picture pt4

// REFACTORING PREVIOUS CODE TO FIT OUR ARCHITECTURE

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._addWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationForm);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get yoru position');
        }
      );
    }
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationForm() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _addWorkout(e) {
    e.preventDefault();
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app1 = new App();
