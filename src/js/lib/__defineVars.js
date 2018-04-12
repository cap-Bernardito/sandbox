const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
const content = document.querySelector('.js-content');
const scrolltopTrigger = document.querySelector('.to-top');

export const VARS = {
  supportPageOffset: window.pageXOffset !== undefined,
  // page: document.querySelector('.js-page').getAttribute('data-page'),
  scrollbarWidth: window.innerWidth - document.body.clientWidth,
  isWindows: navigator.userAgent.indexOf('Windows') > -1,


};

export const events = {
  handleBodyScroll: function handleBodyScroll() {
    let scroll = false;

    // Get Scroll
    if (VARS.supportPageOffset) {
      scroll = window.pageYOffset;
    } else {
      if (VARS.isCSS1Compat) {
        scroll = document.documentElement.scrollTop;
      } else {
        scroll = document.body.scrollTop;
      }
    }

    // HeaderStick
    events.handleHeaderSticky(scroll);

    // To-top button
    if (scroll > 500) {
      scrolltopTrigger.classList.add('to-top--visible');
    } else {
      scrolltopTrigger.classList.remove('to-top--visible');
    }

    return scroll;
  },
  handleHeaderSticky: function handleHeaderSticky (scroll) {
    if (scroll > headerHeight - 3) {
      document.body.classList.add('sticky');
      content.style.paddingTop = +headerHeight + 'px';
    } else {
      document.body.classList.remove('sticky');
      content.style.removeProperty('padding-top');
    }
  },
  handleScrolltopTriggerClick: function handleScrolltopTriggerClick(e) {
    e.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  // handleInputBlur: function handleInputBlur(e) { //forminput
  //   const input = e.target;
  //   if (input.value.length) {
  //     input.classList.add('filled');
  //   } else {
  //     input.classList.remove('filled');
  //   }
  // },
  // handleMenuSearchSubmit: function handleMenuSearchSubmit(e) { //forminput
  //   if (menuSearchInput.value.trim().length === 0) {
  //     menuSearchForm.classList.add('show-error');
  //     e.preventDefault();
  //   }
  // },
  // handleMenuSearchInputKeyup: function handleMenuSearchInputKeyup(e) { //forminput
  //   if (menuSearchInput.value.trim().length > 0) {
  //     menuSearchForm.classList.remove('show-error');
  //   }
  // },
  // handleInitTextInputs: function handleInitTextInputs() { //forminput
  //   var _inputs = Array.prototype.slice.call(document.querySelectorAll('[type=text], [type=email], [type=password], [type=date], [type=number]'));
  //   _inputs.forEach(function (_input) {
  //     _input.addEventListener('blur', events.handleInputBlur);
  //   });
  // },
  // handleInitTextAreas: function handleInitTextAreas() { //forminput
  //   var textareas = Array.prototype.slice.call(document.querySelectorAll('textarea'));
  //   textareas.forEach(function (elem) {
  //     elem.addEventListener('change', events.handleTextareaChange);
  //     elem.addEventListener('cut', events.handleDelayedTextareaChange);
  //     elem.addEventListener('paste', events.handleDelayedTextareaChange);
  //     elem.addEventListener('drop', events.handleDelayedTextareaChange);
  //     elem.addEventListener('keydown', events.handleDelayedTextareaChange);
  //     if (!elem.value.length) {
  //       elem.style.height = '39px';
  //     } else {
  //       elem.style.height = 'auto';
  //       elem.style.height = elem.scrollHeight + 'px';
  //     }
  //   });
  // },
}

export function registerEvents() {
  // events.handleInitTextInputs();
  // events.handleInitTextAreas();

  document.addEventListener('scroll', events.handleBodyScroll);

  if (scrolltopTrigger) {
    scrolltopTrigger.addEventListener('click', events.handleScrolltopTriggerClick);
  }

  // if (menuSearchForm) { //forminput
  //   menuSearchInput.addEventListener('keyup', events.handleMenuSearchInputKeyup);
  //   menuSearchForm.addEventListener('submit', events.handleMenuSearchSubmit);
  // }

}

