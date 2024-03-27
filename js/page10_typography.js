// init


// clicks
$(document).ready(function() {

  $('#typography-menu-serif').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $(".typography-p-empty").removeClass("typography-p-empty").addClass("typography-p-serif");
    }
  });

  $('#typography-menu-sansserif').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(".typography-p-serif").removeClass("typography-p-serif").addClass("typography-p");
    } else {
      $(".typography-p").removeClass("typography-p").addClass("typography-p-serif");
    }
  });

  $('#typography-menu-script').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(".typography-script-empty").removeClass("typography-script-empty").addClass("typography-script");
      $(".typography-image-overlay-center-empty").removeClass("typography-image-overlay-center-empty").addClass("typography-image-overlay-center");
    } else {
      $(".typography-script").removeClass("typography-script").addClass("typography-script-empty");
      $(".typography-image-overlay-center").removeClass("typography-image-overlay-center").addClass("typography-image-overlay-center-empty");
    }
  });

  $('#typography-menu-allcaps').on('click', function() {
    if ($(this).is(':checked')) {
      $(".typography-image-overlay-top-empty").removeClass("typography-image-overlay-top-empty").addClass("typography-image-overlay-top");
    } else {
      $(".typography-image-overlay-top").removeClass("typography-image-overlay-top").addClass("typography-image-overlay-top-empty");
    }
  });

  $('#typography-menu-smallcaps').on('click', function() {
    if ($(this).is(':checked')) {
      $(".typography-title-empty").removeClass("typography-title-empty").addClass("typography-title");
    } else {
      $(".typography-title").removeClass("typography-title").addClass("typography-title-empty");
    }
  });

  $('#typography-menu-bold').on('click', function() {
    if ($(this).is(':checked')) {
      $(".typography-strong-empty").removeClass("typography-strong-empty").addClass("typography-strong");
    } else {
      $(".typography-strong").removeClass("typography-strong").addClass("typography-strong-empty");
    }
  });

  $('#typography-menu-italic').on('click', function() {
    if ($(this).is(':checked')) {
      $(".typography-em-empty").removeClass("typography-em-empty").addClass("typography-em");
    } else {
      $(".typography-em").removeClass("typography-em").addClass("typography-em-empty");
    }
  });

});
