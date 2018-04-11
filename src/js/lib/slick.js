function slick() {
  $('.q-slider__slides').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'cubic-bezier(0.345, 0.750, 0.155, 0.650)',
    arrows: true,
    prevArrow: '.q-slider__prev',
    nextArrow: '.q-slider__next',
    responsive: [
      {
        breakpoint: 960,
        settings: {
          arrows: false,
          dots: true,
          appendDots: '.q-slider__dots'
        }
      }
    ]
  });

  // Events checkpoints
  const mql = window.matchMedia('screen and (min-width: 660px)');
  mql.addListener(setup_for_width);
  setup_for_width(mql);

  function setup_for_width(mql) {
    if (mql.matches) {
      // console.log('desk');
      try {
        $('.p-slides').slick('unslick');
      } catch (error) {
      }
    } else {
      // console.log('mob');
      $('.p-slides').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        // infinite: false,
        centerMode: true,
        centerPadding: '20px',
        dots: true,
        appendDots: '.p-slider__dots',
        cssEase: 'cubic-bezier(0.345, 0.750, 0.155, 0.650)'
      });
    }
  }
}
module.exports = slick;
