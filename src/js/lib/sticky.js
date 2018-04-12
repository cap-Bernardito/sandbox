import * as exports from './__defineVars';

export default function() {
  const header = document.querySelector('.header');
  const headerHeight = header.offsetHeight;
  const content = document.querySelector('.js-content');


  function sticky () {
    const scroll = exports.events.handleBodyScroll();

    if (scroll > headerHeight - 3) {
      document.body.classList.add('sticky');
      content.style.paddingTop = +headerHeight + 'px';
    } else {
      document.body.classList.remove('sticky');
      content.style.removeProperty('padding-top');
    }
  }

  window.addEventListener('scroll', sticky);
}

