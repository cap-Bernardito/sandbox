import * as exports from './lib/__defineVars';
import smoothscroll from 'smoothscroll-polyfill';
// import pixel from 'pixel-glass/script.js';
// import 'slick-carousel';
// import slick from './lib/slick';
// import burger from './lib/burger';
// import rangesliderJs from 'rangeslider-js';
import sideMenu from './lib/side-menu';


// pixel();




function domCreated() {
  exports.registerEvents();
  sideMenu();
  smoothscroll.polyfill(); // http://iamdustan.com/smoothscroll/


}
window.addEventListener('DOMContentLoaded', domCreated);


