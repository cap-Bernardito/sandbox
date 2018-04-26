const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
const content = document.querySelector('.js-content');
const scrolltopTrigger = document.querySelector('.to-top');

export const VARS = {
  supportPageOffset: window.pageXOffset !== undefined,
  // page: document.querySelector('.js-page').getAttribute('data-page'),
  scrollbarWidth: window.innerWidth - document.body.clientWidth,
  isWindows: navigator.userAgent.indexOf('Windows') > -1,
  overSubmenu: false,
  overTimeout: null,

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
  },

  handleAnchorClick: function handleAnchorClick(e) {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    if (target) {
      if (VARS.isMobile) {
        window.scroll({ top: target.offsetTop, left: 0, behavior: 'smooth' });
      } else {
        window.scroll({ top: target.offsetTop + 80, left: 0, behavior: 'smooth' });
      }
    }
  },

  handleSubmenuTriggerMouseover: function handleSubmenuTriggerMouseover(e) {
    clearTimeout(VARS.overTimeout);
    const target = e.target.getAttribute('data-submenu-target');
    Array.prototype.slice.call(document.querySelectorAll('.nav__submenu')).forEach(function (elem) {
      elem.classList.remove('active');
    });
    document.querySelector('.nav__submenu[data-submenu-id="' + target + '"]').classList.add('active');
  },
  handleSubmenuTriggerMouseout: function handleSubmenuTriggerMouseout(e) {
    VARS.overTimeout = setTimeout(() => {
      if (!VARS.overSubmenu) {
        const target = e.target.getAttribute('data-submenu-target');
        document.querySelector('.nav__submenu[data-submenu-id="' + target + '"]').classList.remove('active');
      }
    }, 300);
  },
  handleSubmenuMouseenter: function handleSubmenuMouseenter(e) {
    if (!document.body.classList.contains('sticky')) {
      VARS.overSubmenu = true;
      e.target.classList.add('active');
    }
  },
  handleSubmenuMouseleave: function handleSubmenuMouseleave(e) {
    VARS.overSubmenu = false;
    e.target.classList.remove('active');
  },

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

  handleModalButtons: function handleDataTargetButtons(event, fn) {
    const buttons = Array.prototype.slice.call(document.querySelectorAll('.js-modal-trigger[data-modal-target]'));
    buttons.forEach( button => {
      button.addEventListener(event, fn);
    });
  },
  handleModalOpen: function handleModalOpen(e) {
    const target = e.target.dataset.modalTarget;
    const targetModal = document.querySelector('.modal[data-modal-id=' + target + ']');

    targetModal.querySelector('.js-modal-close').addEventListener('click', events.hundleModalClose);
    targetModal.addEventListener('click', events.hundleModalClose);
    document.body.addEventListener('keydown', events.hundleModalCloseKeydown);
    targetModal.querySelector('.modal__inner').addEventListener('click', events.hundleModalInnerClose);

    targetModal.classList.add('active');
    document.body.classList.add('modal--open');
    document.body.style.paddingRight = VARS.scrollbarWidth + 'px';
  },
  hundleModalClose: function hundleModalClose(e) {
    e.target.closest('.modal').classList.remove('active');
    document.body.classList.remove('modal--open');
    document.body.style.paddingRight = '';
  },
  hundleModalInnerClose: function hundleModalInnerClose(e) {
    e.stopPropagation();
  },
  hundleModalCloseKeydown: function hundleModalCloseKeydown(e) {
    if (e.keyCode === 27) {
      const activeModal = document.querySelector('.modal.active');
      activeModal.addEventListener('click', events.hundleModalClose);
      activeModal.click();
      activeModal.removeEventListener('click', events.hundleModalClose);
      document.body.removeEventListener('keydown', events.hundleModalCloseKeydown);
    }
  },

}



function initDesktopSubmenu() {
  const menuLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__item > a'));
  const menuWithSubmenuLinks = menuLinks.filter( elem => {
    return elem.getAttribute('data-submenu-target');
  });
  const submenus = Array.prototype.slice.call(document.querySelectorAll('.nav__submenu[data-submenu-id]'));

  menuWithSubmenuLinks.forEach( elem => {
    elem.addEventListener('mouseover', events.handleSubmenuTriggerMouseover);
    elem.addEventListener('mouseout', events.handleSubmenuTriggerMouseout);
  });
  submenus.forEach( elem => {
    elem.addEventListener('mouseenter', events.handleSubmenuMouseenter);
    elem.addEventListener('mouseleave', events.handleSubmenuMouseleave);
  });
}

function initAnchors() {
  const anchors = Array.prototype.slice.call(document.querySelectorAll('.js-anchor'));
  anchors.forEach( elem => {
    elem.addEventListener('click', events.handleAnchorClick);
  });
}







export function registerEvents() {
  // events.handleInitTextInputs();
  // events.handleInitTextAreas();

  document.addEventListener('scroll', events.handleBodyScroll);
  initDesktopSubmenu();
  initAnchors();
  events.handleModalButtons('click', events.handleModalOpen);

  if (scrolltopTrigger) {
    scrolltopTrigger.addEventListener('click', events.handleScrolltopTriggerClick);
  }

  // if (menuSearchForm) { //forminput
  //   menuSearchInput.addEventListener('keyup', events.handleMenuSearchInputKeyup);
  //   menuSearchForm.addEventListener('submit', events.handleMenuSearchSubmit);
  // }

}
