export default function() {

  const header = document.querySelector('.header');
  const body = document.querySelector('body');
  const headerHeight = header.offsetHeight;


  window.addEventListener('scroll', sticky);

  function sticky () {
    if ( pageYOffset > headerHeight ) {
      body.classList.add('sticky');
    } else {
      body.classList.remove('sticky');
    }
  }


}
