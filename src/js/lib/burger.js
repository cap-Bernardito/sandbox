export default function() {
  document.addEventListener(
    'DOMContentLoaded',

    function() {
      function $$(selector, context) {
        context = context || document;
        const elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);
      }

      const burgers = $$('.burger');

      for (let i = 0; i < burgers.length; i++) {
        const burger = burgers[i];
        burger.addEventListener('click', showBurgerTarget);

        function showBurgerTarget() {
          const targetId = this.getAttribute('data-target-id');
          const targetIdNav = targetId + '-nav';
          const targetNav = document.getElementById(targetIdNav);
          const header = document.querySelector('.header');

          if (targetId && targetIdNav) {
            this.classList.toggle('burger--close');
            targetNav.classList.toggle('js-nav-is-open');
            header.classList.toggle('menu-open');
          }
        }
      }
    }
  );
}
