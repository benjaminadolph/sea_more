// Imports
import { gsap, Power4, Power2 } from 'gsap';

window.menu = (function ($) {
  function setCharsToSpan() {
    const $menuElements = $('#nav').find('.menu-item');

    $menuElements.each(function () {
      const textNode = $(this).html();
      $(this).empty();
      for (let i in textNode) {
        $(this).append(`<span class="char">${textNode.charAt(i)}</span>`);
      }
    });
  }

  // Open Menu Animation
  // ________________________________________________________________________________________
  function openNavigation() {
    gsap.to('#nav', { y: 0, ease: Power4.easeInOut, duration: 2 });

    if ($(window).width() >= 650) {
      gsap.to('#wave-path', {
        duration: 3,
        attr: { d: `${$('#wave-path').data('to')}` },
      });
    }

    gsap.to('.shell-content', { x: 0, opacity: 1, delay: 1.2 });
    gsap.to('.footer-links', { opacity: 1, delay: 1.2 });
  }
  // Close Menu Animation
  // ________________________________________________________________________________________
  function closeNavigation() {
    if ($(window).width() >= 650) {
      gsap.to('#wave-path', {
        duration: 2,
        attr: { d: `${$('#wave-path').data('from')}` },
        delay: 0.3,
      });
    }
    gsap.to('#nav', {
      y: '-100vh',
      ease: Power4.easeInOut,
      duration: 3,
      delay: 0.3,
    });
    gsap.to('.shell-content', { x: 200, opacity: 0 });
    gsap.to('.footer-links', { opacity: 0 });
  }

  // Open Menu Animation
  // ________________________________________________________________________________________
  function waveTextAnimation($element) {
    let startPercent = -40;
    $element.parents('ul').addClass('hover');
    $element.parents('a').addClass('active');
    let $prevElement = $element;
    let $nextElement = $element;

    gsap.to($element, { yPercent: startPercent });

    for (let i = 0; i <= 7; i += 1) {
      startPercent += 5;
      $prevElement = $prevElement.prev();
      $nextElement = $nextElement.next();
      if ($prevElement.length) {
        gsap.to($prevElement, { yPercent: startPercent });
      }
      if ($nextElement.length) {
        gsap.to($nextElement, { yPercent: startPercent });
      }
    }
  }

  // Animation of chars in the menu on hover
  // ________________________________________________________________________________________

  function groundWaveAnimation() {
    $('#nav ul').removeClass('hover');
    $('#nav ul a').removeClass('active');
    gsap.to('.char', { yPercent: 0, ease: Power2.easeOut });
  }

  function init() {
    setCharsToSpan();

    $('.menu-button.menu-icon').on('click', () => {
      openNavigation();
    });

    $('.menu-button.close-icon').on('click', () => {
      closeNavigation();
    });

    $('.ocean').on('click', () => {
      $('#infopages').empty();
      closeNavigation();
    });

    const $charElement = $('.char');
    $charElement.on('mouseenter', function () {
      waveTextAnimation($(this));
    });

    $charElement.on('mouseleave', () => {
      groundWaveAnimation();
    });

    // set wave width and height (to work in chrome)
    function resizeMenuWave() {
      const $wave = $('.svg-wave');
      const $waveHeight = (3067 / 2623) * $(window).width();
      $wave.attr({
        width: $(window).width(),
        height: $waveHeight,
      });
    }

    resizeMenuWave();

    $(window).on('resize', () => {
      resizeMenuWave();
    });
  }

  return {
    init,
    closeNavigation,
    openNavigation,
  };
}(jQuery));

jQuery(() => {
  menu.init();
});
