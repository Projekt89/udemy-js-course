'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault(); // fix for scrolling to the top after clicking <a>
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////
/* IMPLEMENTING SMOOTH SCROLLING */
///////////////////////////////////
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
learnMoreBtn.addEventListener('click', () => {
  /*  // OLD WAY OF SETTING SMOOTH SCROLLING
  const s1coords = section1.getBoundingClientRect(); // get data about position of section 1
  console.log(s1coords);

  // Current scroll advencement (mainly Y) and size
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'Height/Width of the viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // first arg = left, second arg = top
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   window.pageYOffset + s1coords.top
  // );

  // Smooth Scrolling - pass as argument object wiht left, top and behaviour: 'smooth'
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: window.pageYOffset + s1coords.top,
    behavior: 'smooth',
  });
 */
  // MODERN WAY OF SETTING SMOOTH SCROLLING TO POSITION
  // does same as all code above but works only in modern browsers !!!!!!!!
  section1.scrollIntoView({ behavior: 'smooth' });
});
////////////////////////////////////////////////////////////////////
/* EVENT DELEGATION - IMPLEMENTING SMOOTH SCROLLING TO NAVIGATION */
////////////////////////////////////////////////////////////////////
// const navBtns = document.querySelectorAll('.nav__link');

// navBtns.forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// ); // this kind of attaching listeners is not efficient in bigger node collections

// therefor we will use EVENT DELEGATION which is ATTACHING EVENT TO PARENT NODE AND TRIGGERING IT THROUGH THE MECHANISM OF BUBBLING. This is also usefull functionality for preparing event handling for not yet existing elements

// EVENT DELEGATION PROCEDURE:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('nav__link')) return; // prevent event when not link clicked

  document
    .querySelector(e.target.getAttribute('href')) // E.TARGET POINTS TO TRIGGER ELEMENT
    .scrollIntoView({ behavior: 'smooth' });
});
// despite there is no listener attached to .nav__link element clicking on it triggers event anyway. The event during bubbling 'travels up' the tree and triger 'click' events attached to parent .nav__links list. In the event object we have stored element that triggered  the event so we get required data (id we want to scroll to) from it and perform scrollIntoView.

///////////////////////////////////////////////////////////////////
/* TAB COMPONENT - EVENT DELEGATION, DOM TRAVERSING, DATA ATTR.  */
///////////////////////////////////////////////////////////////////
/* 
  // My version
  document.querySelector('.operations').addEventListener('click', function (e) {
  // selecting correct trigger
  let trigger = e.target;
  if (trigger.tagName === 'SPAN') trigger = e.target.parentElement;
  if (trigger.classList.contains('btn')) {
    const tabIndex = trigger.dataset.tab;
    // selecting and manipulation of content
    this.querySelectorAll('.operations__content').forEach(content => {
      content.classList.remove('operations__content--active');
      [...content.parentNode.children][tabIndex].classList.add(
        'operations__content--active'
      );
    });
    // selecting and manipulation of tab buttons
    this.querySelectorAll('.operations__tab').forEach(btn =>
      btn.classList.remove('operations__tab--active')
    );
    trigger.classList.add('operations__tab--active');
  }
}); */

// course version
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return; // if clicked == null as there is no operations__tab el. found
  // handle activating tab btn
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // Activate adequate content area
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////////////////////////////////
/* MENU FADE FUNCTIONALITY - PASSING ARGUMENTS TO EVENT HANDLERS */
///////////////////////////////////////////////////////////////////

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const navLink = e.target;
    const siblings = navLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = navLink.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== navLink) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// mouse over is similar to mouse enter however it bubble up while mouse enter doesn't
// here we dont use closest as clickable element has no children
nav.addEventListener('mouseover', e => handleHover(e, 0.5));

// mouse out is similar to mouse leave however it bubble up while mouse leave doesn't
nav.addEventListener('mouseout', e => handleHover(e, 1));

// Alternative solution from course - passing value through this - assigning it manually via bind

// nav.addEventListener('mouseover', handleHover.bind(0.5));
// in function
// siblings.forEach(el => {
//   if (el !== navLink) el.style.opacity = this;
//   // this is binded to the argument value. That way we can pass only 1 arg. so 1 value or object
// });

//////////////////////////////////////
/* STICKY NAVIGATION - SCROLL EVENT */
//////////////////////////////////////
/* const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  if (window.pageYOffset < initialCoords.top - initialCoords.top * 0.7) {
    nav.classList.remove('sticky');
  }
}); // using scroll event is really not efficient and should be avoided */

///////////////////////////////////////////////////
/* STICKY NAVIGATION - INTERSECTION OBSERVER API */
///////////////////////////////////////////////////

// LECTURE:

// const obsCallback = function (entries, observer) {
//   // entries === array of treshold entries
//   entries.forEach(entry => console.log(entry));
// };
// const obsOptions = {
//   root: null, // root is the element we are observing. null === observe entire viewport
//   threshold: [0, 0.2], // % of intersection at which callback function will be called,
//   // 0 - trigger when el moves in or out of the view
//   // 1 - trigger ony when 100% of element is visible within root
// };
// // callback function will be called every time the observed element intersect root element at a given treshold. It will happen every time so no matter if we scroll up or down
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// STICKY NAV via INTERSECTION OBSERVER - IMPLEMENTATION
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // margin like in CSS of root |+5px||-5px|   root   |-5px||+5px|
});
headerObserver.observe(header);
//////////////////////////////////////////////////////////
/* REVEALING ELEMENTS ON SCROLL - INTERSECTION OBSERVER */
//////////////////////////////////////////////////////////
/* // v1 - my version 
const sections = [...document.querySelectorAll('.section')];
const sectionHights = sections.map(el => el.getBoundingClientRect().height);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
};

const revealOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-25%',
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);
sections.forEach(section => sectionObserver.observe(section));
 */

// v2 - course version
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; // guarding executing unobserving too soon
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // stop observing after reveal - better for performence
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
//////////////////////////////////////////////////////////////////
/* LAZY LOADING OF IMAGES + IMPROVING PERFORMANCE WITH OBSERVER */
//////////////////////////////////////////////////////////////////

// Commonly the most performence affecting elements of web application are images. Therefore in order to optimize webapp efficency we should implement solutions related to images.

const lazyImages = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const [entry] = entries;
  // guard code to execute only when element is intersecting observer
  if (!entry.isIntersecting) return;
  // replace src with data-src
  // assign new source and start downloading
  entry.target.src = entry.target.dataset.src;
  // remove blur only after the target element fires event LOAD !!!! to prevent showing ugly low resolution picture
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // start loading image before it reach an observer
});
lazyImages.forEach(image => imageObserver.observe(image));

///////////////////////////////////
/* BUILDING A SLIDER COMPONENT - */
///////////////////////////////////
// v1 - my attempt to implement the slider
const initiateSlider = function () {
  const slides = [...document.querySelectorAll('.slide')];
  const slider = document.querySelector('.slider');
  const dotsContainer = document.querySelector('.dots');
  let currentSlide = 0;

  // binding slide with dot
  const slidesNavBundle = slides.map((slide, i) => {
    slide.setAttribute(
      'style',
      `transform: translateX(${(i - currentSlide) * 100}%)`
    );
    const dot = document.createElement('div');
    i === 0
      ? dot.classList.add('dots__dot', 'dots__dot--active')
      : dot.classList.add('dots__dot');
    return [slide, dot];
  });

  // visualising navigation dots
  slidesNavBundle.forEach(([_, dot]) => dotsContainer.append(dot));

  // executing slide change
  const switchSlide = function (slide, dot, index) {
    slide.setAttribute(
      'style',
      `transform: translateX(${(index - currentSlide) * 100}%)`
    );
    dot.classList.remove('dots__dot--active');
    if (currentSlide === index) dot.classList.add('dots__dot--active');
  };

  // changing slide direction functions
  const slideLeft = function () {
    --currentSlide;
    if (currentSlide === -1) currentSlide = slides.length - 1;
    slidesNavBundle.forEach(([slide, dot], i) => switchSlide(slide, dot, i));
  };

  const slideRight = function () {
    ++currentSlide;
    if (currentSlide === slides.length) currentSlide = 0;
    slidesNavBundle.forEach(([slide, dot], i) => switchSlide(slide, dot, i));
  };

  const activateDot = function (e) {
    currentSlide = slidesNavBundle.findIndex(([_, dot]) => e.target === dot);
    slidesNavBundle.forEach(([slide, dot], i) => switchSlide(slide, dot, i));
  };

  // resolving click event delegation and click target
  slider.addEventListener('click', function (e) {
    if (e.target.classList.contains('slider__btn--left')) slideLeft();
    else if (e.target.classList.contains('slider__btn--right')) slideRight();
    else if (e.target.classList.contains('dots__dot')) activateDot(e);
  });

  // navigate slider with arrow keys
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') slideLeft();
    if (e.key === 'ArrowRight') slideRight();
  });
};

initiateSlider();

// v2 - course solution
/* 
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

  // dots
  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      )
    );
  };

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    const { slide } = e.target.dataset; // data set is an object so we destruct it taking out slide
    goToSlide(slide);
  });

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // move to next slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
    activateDot(slide);
  };

  // next slide
  const nextSlide = function () {
    currentSlide++;
    if (currentSlide > maxSlide) currentSlide = 0;
    goToSlide(currentSlide);
  };

  // previous slide
  const prevSlide = function () {
    currentSlide--;
    if (currentSlide < 0) currentSlide = maxSlide;
    goToSlide(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // handle slider control with keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // init
  const init = () => {
    createDots();
    goToSlide(0);
  };

  init();
};

slider();
 */
////////////////////////////////////////
/* SELECT, CREATE AND DELETE ELEMENTS */
////////////////////////////////////////

let message, logo;

{
  /* // SELECTING
  console.log(document.documentElement); // selecting document
  console.log(document.head); // selecting head
  console.log(document.body); // selecting body

  document.querySelector('.header'); // selects first el. that fulfill query
  const allSections = document.querySelectorAll('.section'); // selects all el.
  console.log(allSections); // NodeList with sections
  document.getElementById('sections--1');
  document.getElementsByTagName('button'); // HTMLCollection with all buttons
  // HTML collection is different from node list in the way that it is !!!!!!! automatically updated when it's elements get modified (for ex. deleted)
  // Node list doesn't get updated automatically and contains versions of elements from the moment it was created
  document.getElementsByClassName('btn'); // HTMLCollection

  // CREATING and INSERTING
  message = document.createElement('div'); // creates div el.
  message.classList.add('cookie-message');
  // message.textContent = 'We use cookies to improve functionality and analytics'
  message.innerHTML =
    'We use cookies to improve functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
  //header.prepend(message); // inserts element at START of calling element
  header.append(message); // inserts element at END of calling element
  // you cant insert the same element twice. It ends up in the latest location
  //header.prepend(message.cloneNode(true)); // clone element to insert it twice
  // header.before(message); // inserts element before calling element
  // header.after(message); // inserts element after calling element

  // DELETION OF ELEMENTS
  document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', () => message.remove());
  // In old version before implementation of remove()
  // message.parentElement.removeChild(message) */
}
////////////////////////////////////
/* STYLES, ATTRIBUTES AND CLASSES */
////////////////////////////////////
{
  /*   // STYLES
  // Setting inline styles
  message.style.backgroundColor = '#37383d';
  message.style.width = '120%';
  // getting inline styles
  console.log(message.style.color); // nothing as inline color is not defined
  console.log(message.style.backgroundColor); // rgb(55, 56, 61)
  // getting any style property of an element
  console.log(getComputedStyle(message).color); // rgb(....)
  console.log(getComputedStyle(message).height); // 48.75px

  // 1. parsing numeric value received from el. -> adding 30 -> concatenation 'px'
  // 2. setting inline style value for message element of 48.75 + 30 + px = '78.75px'
  message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

  // Work with css variables (document in CSS is ->):root { --color-primary: #5ec576; ... etc }
  document.documentElement.style.setProperty('--color-primary', 'orangered'); //editing css variable assigned to :root === documentElement section 13 / 187

  // ATTRIBUTES
  // reading
  logo = document.querySelector('.nav__logo');
  console.log(logo.alt, logo.src, logo.className); // reading standard attributes
  console.log(logo.getAttribute('designer')); // reading custom attributes
  // difference in data get by these two methods
  console.log(logo.src); // gets absolute url to source
  console.log(logo.getAttribute('src')); // gets exactly value of that attr. in html

  const link = document.querySelector('.nav__link--btn');
  console.log(link.href); // http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/index.html#
  console.log(link.getAttribute('href')); // #

  // setting
  logo.alt = 'Minimalist logo';
  logo.setAttribute('company', 'Bankist');

  // DATA ATTRIBUTES - accessing data attributes through dataset
  console.log(logo.dataset.versionNumber);

  // CLASSES
  // logo.classList.add('c');
  // logo.classList.remove('c');
  // logo.classList.toggle('c');
  // logo.classList.contains('c');
  // logo.className = 'logo'; // don't do this!!! overrites all current classes */
}
//////////////////////////////
/* EVENT TYPES AND HANDLERS */
//////////////////////////////
{
  /* // Anything that happens within a document generates an event. Even just moving a mouse
  // Events are happening no mather wether we are listening for them or not
  const h1 = document.querySelector('h1');

  // Ways of listening for events
  h1.addEventListener('mouseenter', () => {
    console.log('Mouse entered the heading area');
  });
  h1.onmouseleave = () => console.log('Mouse left the heading area');
  // 'on' listeners were used in the old days as addEventListener allow to add more event listeners to the same function when using 'on' new function will overwrite previous one

  // Managing listeners - how to add and remove them
  const alertH1 = () => {
    alert('Mouse entered the heading area');

    //h1.removeEventListener('mouseenter', alertH1); // removing listener after it fired once
  };
  h1.addEventListener('mouseenter', alertH1);

  // Example - remove listener after some time has passed
  setTimeout(() => {
    h1.removeEventListener('mouseenter', alertH1);
  }, 4000);

  // Setting event listeners directly in HTML - should not be used at all!!!
  // <h1 onclick="alert('HTML alert') ">Heading on website</h1>*/
}
////////////////////////////////////////////////
/* EVENT PROPAGATION - BUBBLING AND CAPTURING */
////////////////////////////////////////////////
{
  /* // When event is triggered by for example click on the link, the event element is not created by this clicked element.
  //
  // 1. CAPTURING PHASE - The event element is generated by the document element (root of the DOM tree) and trevels down the elements tree to the element that called it
  // 2. TARGET PHASE - When the event element reaches the target element the target phase begins where events can be handled right at the target and the function associated with that event is triggered
  // 3. BUBBLING PHASE - When the event happen the event bubble back up to the root by passing through every PARENT element in the DOM tree between target element and the root
  //
  // That mechanism cause that event that triggers by the target is like it would happen in every element that event is passing through. That can cause situation where 'click' event on a button trigers reaction on one of it's parent elements if that parent element is also listening for click event. !!!
  //
  // Not all events have capturing and bubbling phase but most of them do
  //
  // The mechanisms described above are called PROPAGATION so we can say that event triggered on the element propagates to it's parent elements
  //
  // PRACTICE

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1 + min);
  const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
  console.log(randomColor());

  document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = `${randomColor()}`;
    console.log('LINK', e.target, e.currentTarget);

    e.stopPropagation(); // to stop propagation we need to explicitly call it in listener !!!!
    // this is not great idea but can help with unwanted behaviour in complex applications
  });

  document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = `${randomColor()}`;
    console.log('LINK', e.target, e.currentTarget);
  });

  document.querySelector('.nav__links').addEventListener(
    'click',
    function (e) {
      this.style.backgroundColor = `${randomColor()}`;
      console.log('LINK', e.target, e.currentTarget);
    },
    true // third arg in listener is if we want to CATCH the event during CAPTURING PHASE
    // It cause that the event is triggered first while rest is triggered during bubbling phase
  );
  // e.target - triggering element,
  // e.currentTarget - element to which listener is attached and is the same as this keyword
  // propagation cause triggering of all 3 listeners as nav-links and nav are parents of nav-link.
  // in all 3 cases after click on link e.target points to link as element that triggered event so this is an example of propagation (bubbling) of events

  // arrow functions prevent propagations */
}
/////////////////////////////////////////////
/* DOM TRAVERSING - PARENT, SIBLING, CHILD */
/////////////////////////////////////////////
{
  /* const h1 = document.querySelector('h1');

  // Going downwards: CHILD
  console.log(h1.querySelectorAll('.highlight')); // selecting all children of h1 el. with class
  console.log(h1.childNodes); // NodeList of all h1 children (text, elements, comments, all)
  console.log(h1.children); // HTMLCollection of only h1 children that are HTML elements
  h1.firstElementChild.style.color = '#fff'; // selects first HTML child of h1
  h1.lastElementChild.style.color = 'orangered'; // selects last HTML child of h1

  // Going upwards: PARENT
  console.log(h1.parentNode); // direct parent element of h1
  console.log(h1.parentElement); // the same as above
  h1.closest('.header').style.background = 'var(--gradient-secondary)'; // arg = query same as querySelector. Select nearest element that match query string. Often used for event delegation
  h1.closest('h1'); // returns itselves as it's closest h1 in this case

  // Going sideways: SIBLINGS
  console.log(h1.previousElementSibling); // null as h1 has no previous sibling
  console.log(h1.nextElementSibling); //  h4  - next HTML element sibling is H4
  console.log(h1.previousSibling); // #text - previous node is text
  console.log(h1.nextSibling); // #text - next node is also text
  console.log(h1.parentElement.children); // selecting all sibling HTML elements of h1

  // create array from HTMLCollection and perform operation all h1 siblings
  [...h1.parentElement.children].forEach(el => {
    if (el !== h1) el.style.transform = 'scale(0.5)';
  }); */
}
//////////////////////////
/* DOM EVENTS LIFECYCLE */
//////////////////////////
//
// Lifecycle is the time since user enter until he leaves the web application
//
// Event - DOMContentLoaded - fires when the web page is fully loaded. However it doesn't for images and other external resources to load so only JS and HTML need to be loaded

document.addEventListener('DOMContentLoaded', () =>
  console.log('HTML and JS loaded')
);
// when we set script loading at the end of HTML we don't need to listen for that event as js will execute that listener after all HTML code is loaded and JS file is loaded and executed

// Event - load - fires on window object when the page is FULLY loaded

window.addEventListener('load', e => console.log('Page is fully loaded', e));

// Event - beforeunload - event fires right before user leaves the page (close browser tab for ex)

// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   console.log(e);
//   // alert('leave the page');
//   e.returnValue = ''; // nie działa w firefox, alert działa
// });

//////////////////////////////////////////////////
/* ASYNC, DEFER AND OTHER WAYS TO LOAD A SCRIPT */
//////////////////////////////////////////////////

// event = DOMContentLoaded

// SCRIPT IN HEAD - first load script and execute -> load html -> fire event === BAD SOLUTION
// SCRIPT END OF BODY - first load html -> load and execute script -> fire event
// ASYNC IN HEAD - start loading html and script -> execute script -> finish loading HTML -> event
//  + if script is too big, event fires when HTML is parsed even if script fetch and exec is not done
//  + scripts are NOT guaranteed to executre in order they are in the code

// DEFER IN HEAD - parse HTML + fetch script -> execute script -> fire event
//  + if script is too big, event fires AFTER fetching, parsing and execution is done
//  + scripts ARE guaranteed to executre in order they are in the code

// use DEFER is OVERALL THE BEST SOLUTION
// use ASYNC is GOOD solution to load side scripts like analytics (not key for functioning)

// ONLY NEW BROWSERS RECOGNIZE ASYNC AND DEFER to support OLD BROWSERS use script at the end of the body
