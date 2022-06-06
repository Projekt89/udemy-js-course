'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

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
const section1 = document.getElementById('section--1');
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

////////////////////////////////////////
/* SELECT, CREATE AND DELETE ELEMENTS */
////////////////////////////////////////
let message, logo;

{
  // SELECTING
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
  // message.parentElement.removeChild(message)
}
////////////////////////////////////
/* STYLES, ATTRIBUTES AND CLASSES */
////////////////////////////////////
{
  // STYLES
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
  // logo.className = 'logo'; // don't do this!!! overrites all current classes
}
//////////////////////////////
/* EVENT TYPES AND HANDLERS */
//////////////////////////////
{
  // Anything that happens within a document generates an event. Even just moving a mouse
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
  // <h1 onclick="alert('HTML alert') ">Heading on website</h1>
}
