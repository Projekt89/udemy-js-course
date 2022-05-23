'use strict';
// elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
// buttons
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

const hideModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// handle showing modal
btnShowModal.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});
// handle hiding modal
overlay.addEventListener('click', hideModal);
btnCloseModal.addEventListener('click', hideModal);
document.onkeydown = e => {
  if (e.key === 'Escape') hideModal();
};
