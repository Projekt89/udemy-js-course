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
// FLOWCHART IS PICTURE OF WHAT WE WANT TO IMPLEMENT !!
// Example picture pt 3

// 4. ARCHITECTURE
// Architecture is as well not necessery to be planed with detail. It's ok to make changes in the architecture of the project during experimenting in development phase but it's important that we know to some extent which tools and how we want to use
// ARCHITECTURE IS PICTURE OF HOW WE WANT IT TO BE IMPLEMENTED !!

// 5. DEVELOPMENT
// In this phase it's important that we have all previous steps figured out so we know what tools we need and what we need them for

/////////////
/* PROJECT */
/////////////

// prettier-ignore

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteAllLoadingBar = document.querySelector('.delete-loadingBar');

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

/////////////////////
// WORKOUT CLASSES //
/////////////////////

class Workout {
  date = new Date();
  // ANY OBJECT WE CREATE SHOULD HAVE IT'S OWN IDENTIFIER
  // to generate id use library for creating id - dont use simple solution like date or math.random()
  id = Date.now() + '';
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `
      ${this.type[0].toUpperCase()}${this.type.slice(1)} on 
      ${months[this.date.getMonth()]} 
      ${this.date.getDate()}
    `;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
  }
}

//////////////////////////////
// APPLICATION ARCHITECTURE //
//////////////////////////////

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  // set workouts to workouts from local storage or empty array if there is no workouts in LS
  #workouts = this._getLocalStorage() || [];

  // Events controllers
  // #controllerReset = new AbortController(); // adding controller to handle window.eventListener signal

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._addWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationForm);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    // add listener to update storage before unload with options where signal is controlled by abort controller. When controller.abort() event listener will not fire
    // window.addEventListener('beforeunload', this._setLocalStorage.bind(this), {
    //   signal: this.#controllerReset.signal,
    // });
    // delete all event
    deleteAllBtn.addEventListener(
      'mousedown',
      this._deleteAllWorkouts.bind(this)
    );
    // hide form on press Escape
    document.addEventListener(
      'keyup',
      e => e.key === 'Escape' && this._hideForm(e)
    );
    // delete workout
    containerWorkouts.addEventListener('click', e =>
      this._deleteWorkout.bind(this, e)()
    );
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
    // we can load workouts only when map is allready loaded so we execute loading of storaged workouts after load of the map
    this._renderWorkoutsFromLocalStorage();
  }

  _renderWorkoutsFromLocalStorage() {
    this.#workouts.forEach(workout => {
      if (!workout) return; // guard if any falsy value is in the storage
      // bind prototypes to objects retrieved from storage
      workout.type === 'running'
        ? (workout.__proto__ = new Running())
        : (workout.__proto__ = new Cycling());

      this._renderWorkout(workout);
      this._renderWorkoutMarker(workout);
    });
    console.log(this.#workouts);
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm(e) {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
    // trick to avoid playing animations when making changes in classes of an element
    if (!e) {
      form.style.display = 'none';
      setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    form.classList.add('hidden');
  }

  _toggleElevationForm() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _addWorkout(e) {
    e.preventDefault();
    // helper funcitons
    const areNumbers = (...inputs) => inputs.every(el => Number.isFinite(el));
    const arePositive = (...inputs) => inputs.every(el => el > 0);
    // when we use ...name (rest operators) we get any number of arguments packed in an array

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // validate data
    // If workout is running create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      console.log(areNumbers(distance, duration, cadence));
      if (
        !areNumbers(distance, duration, cadence) ||
        !arePositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling create cycling object
    if (type === 'cycling') {
      const elevationGain = +inputElevation.value;
      if (!areNumbers(distance, duration) || !arePositive(distance, duration))
        return alert('Inputs have to be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    // add object to database
    this.#workouts.push(workout);

    // render workout on the map
    this._renderWorkoutMarker(workout);

    // render workout on the workouts list
    this._renderWorkout(workout);

    // hide the form + clear form fields
    this._hideForm();

    // set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <button class="btn workout__remove">X</button>
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === 'running') {
      html += ` 
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(2)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }

    if (workout.type === 'cycling') {
      html += ` 
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(2)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workoutObj = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    this.#map.setView(workoutObj.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using public interface (api)
    workoutObj.click();
  }
  // creating 'variable' workouts in local storage
  // localStorage.setItem('name', string_value) - local storage is very small container to store temporary values. We have to be very carefull using it to avoid store too much data which would block it.
  // setItem is a function that takes 2 strings as arguments - first is a key and second is value in format of string. We can use JSON.stringify to convert object to string to store it
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    return JSON.parse(localStorage.getItem('workouts'));
  }

  _deleteAllWorkouts() {
    // check if any workouts to delete exist
    if (this.#workouts.length === 0) return;

    // helper function for clearing timer if key is relesed
    const stopTimer = () => {
      deleteAllBtn.disabled = true;
      deleteAllLoadingBar.classList.add('quick-return');
      deleteAllLoadingBar.classList.remove('loading');
      clearTimeout(timer);
      deleteAllBtn.removeEventListener('mouseup', stopTimer);
      setTimeout(() => {
        deleteAllLoadingBar.classList.remove('quick-return');
        deleteAllBtn.removeAttribute('disabled');
      }, 200);
    };

    // start loadingBar animation
    deleteAllLoadingBar.classList.add('loading');

    // set timer so app perform reset after 3s of keypress
    const timer = setTimeout(() => {
      // add protection timer
      deleteAllBtn.removeEventListener('mouseup', stopTimer);
      // clear storages and perform app reset
      localStorage.removeItem('workouts');
      this.#workouts = [];
      this.reset();
      // hide loading bar
      deleteAllLoadingBar.style.display = 'none';
      deleteAllLoadingBar.classList.remove('loading');
      setTimeout(() => (deleteAllLoadingBar.style.display = 'flex'), 3000);
    }, 3000);

    deleteAllBtn.addEventListener('mouseup', stopTimer);
  }

  // delete all data from local storage and reload the page
  reset() {
    // map container preparing
    const oldMap = document.getElementById('map');
    const newMap = document.createElement('div');
    newMap.setAttribute('id', 'map');

    // clearing storage and #workouts
    // abort listener attached to window so it won't update storage on unload
    // this.#controllerReset.abort();

    // replacing map containers and initialization of new map
    document.body.replaceChild(newMap, oldMap);
    this._getPosition();
    document.querySelectorAll('.workout').forEach(el => el.remove());
  }

  _deleteWorkout(e) {
    if (!e.target.classList.contains('workout__remove')) return;
    this.#workouts = this.#workouts.filter(
      workout => workout.id !== e.target.parentElement.dataset.id
    );
    this.reset();
  }
}

// Start the app
const app1 = new App();
