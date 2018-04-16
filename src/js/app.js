import smoothscroll from 'smoothscroll-polyfill';
import enquire from 'enquire.js';
import WOW from 'wow.js';
import * as exports from './lib/__defineVars';
// import pixel from 'pixel-glass/script.js';
// import 'slick-carousel';
// import slick from './lib/slick';
// import burger from './lib/burger';
// import rangesliderJs from 'rangeslider-js';
import sideMenu from './lib/side-menu';


// pixel();

const scrollAnimate = new WOW(
  {
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       0,
    mobile:       true,
    live:         true,
    callback(box) {
      console.log(box);

    },
    scrollContainer: null,
    resetAnimation: true,
  }
);
scrollAnimate.init();





function domCreated() {
  exports.registerEvents();
  sideMenu();
  smoothscroll.polyfill(); // http://iamdustan.com/smoothscroll/


}
window.addEventListener('DOMContentLoaded', domCreated);


// enquire.js Media-query
// http://wicky.nillia.ms/enquire.js/
const query1 = "screen and (min-width:1000px)";
const handler1 = {
    match : function() {
      console.log('> 1000px');
    },
    unmatch : function() {
      console.log('< 1000px');
    },
    setup : function() {
      console.log('setup 1000px');
    },
    deferSetup : false,
    destroy : function() {
      console.log('destroy');
    }
  };
const query2 = "screen and (min-width:800px)";
const handler2 = {
    match : function() {
      console.log('> 800px');
    },
    unmatch : function() {
      console.log('< 800px');
    },
    setup : function() {
      console.log('setup 800px');
    },
    deferSetup : false,
    destroy : function() {
      console.log('destroy');
    }
  };


enquire.register(query1, handler1);
enquire.register(query2, handler2);

// enquire.unregister(query1); // "handler 1 destroyed"
