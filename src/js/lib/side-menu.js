export default function() {

  const events = {

    handleMenuOpenClick: function handleMenuOpenClick(e) {
      e.preventDefault();
      document.body.classList.add('menu-open');
    },

    handleMenuCloseClick: function handleMenuCloseClick(e) {
      e.preventDefault();
      document.body.classList.remove('menu-open');
    },

    handleMenuClick: function handleMenuClick(e) {
      document.body.classList.remove('menu-open');
    },

    handleMenuInnerClick: function handleMenuInnerClick(e) {
      e.stopPropagation();
    },

  }

  document.querySelector('.js-menu-open').addEventListener('click', events.handleMenuOpenClick);
  document.querySelector('.js-menu-close').addEventListener('click', events.handleMenuCloseClick);
  document.querySelector('.side-menu').addEventListener('click', events.handleMenuClick);
  document.querySelector('.side-menu__container').addEventListener('click', events.handleMenuInnerClick);


}
