'use strict';

seamore = seamore || {};

seamore.allCoinsCollected = (function ($) {
  function init() {
    $('.screen-one--button').on('click', (e) => {
      e.preventDefault();
      $('#all-coins-collected').fadeOut();
    });

    $('.download--button').on('click', (e) => {
      e.preventDefault();
      $('#all-coins-collected').fadeOut();
    });
  }

  return {
    init,
  };
}(jQuery));

// eslint-disable-next-line no-unused-vars
jQuery(($) => {
  seamore.allCoinsCollected.init();
});
