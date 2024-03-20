// init state
window.onload = () => {
  $("#audience-examples").hide();
  $("#day-trader-chart").hide();
  $("#long-term-investor-chart").hide();
};

// clicks
$(document).ready(function() {
  $("#run-examples").click(function() {
    $("#audience-examples").slideDown("slow");
  });
  $("#run-day-trader-example").click(function() {
    $("#run-day-trader-example").fadeOut("fast", function() {
      $("#day-trader-chart").slideDown("slow");
    });
  });
  $("#run-long-term-investor-example").click(function() {
    $("#run-long-term-investor-example").fadeOut("fast", function() {
      $("#long-term-investor-chart").slideDown("slow");
    });
  });

  $('.figure-img').click(function() {
    var src = $(this).attr('src');
    var alt = $(this).attr('alt');
    var footer_text = $(this).attr('data-footer');
    $('#popupImage').attr('src', src);
    $('#imageModalLabel').html(alt);
    $('#imageModalFooter').html(footer_text);
    var modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  });

});
