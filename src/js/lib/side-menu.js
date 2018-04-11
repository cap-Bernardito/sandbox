export default function sayHello() {

  const burger = document.querySelector('.burger');
  const burgerClose = document.querySelector('.burger--close');
  const body = document.querySelector('body');

  burger.addEventListener('click', toggleMenu);
  burgerClose.addEventListener('click', toggleMenu);

  function toggleMenu () {
    if ( body.classList.contains('menu-open') ) {
      body.classList.remove('menu-open');
    } else {
      body.classList.add('menu-open');
    }
  }


}
