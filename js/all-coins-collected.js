// Creates overlay when user has collected all coins on the canvas
// ______________________________________________________________________________________________
window.allCoinsCollected = (function ($) {
  function init() {
    $('.treasure-hunt').on('click', () => {
      if ($('#counter').html() === '5/5') {
        $('#all-coins-collected').fadeIn();
      }
    });

    $('.screen-one--button').on('click', (e) => {
      e.preventDefault();
      $('#all-coins-collected').fadeOut();
    });

    $('.download--button').on('click', () => {
      $('#all-coins-collected').fadeOut();
    });
  }

  return {
    init,
  };
}(jQuery));

// eslint-disable-next-line no-unused-vars
jQuery(($) => {
  allCoinsCollected.init();
});
