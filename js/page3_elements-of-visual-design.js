$("#element-shape").hide();
$("[for='element-shape']").hide();
$("#element-space").hide();
$("[for='element-space']").hide();
$("#element-value").hide();
$("[for='element-value']").hide();
$("#element-volume").hide();
$("[for='element-volume']").hide();
$("#element-color").hide();
$("[for='element-color']").hide();
$("#element-texture").hide();
$("[for='element-texture']").hide();
$("#element-again").hide();


// functions
function drawEmptyBatman() {
  const svg = d3.select("#batman svg")
                 .attr("width", 600)
                 .attr("height", 400)
                 .style("opacity", 0);
  const batman_group = svg.append("g").attr("class", "batman-group")

  batman_path = "M692.199 102.8l-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3h4l2 .5 2 .5 34 9.5c22.666 6.333 44 13.5 64 21.5s37.267 15.9 51.8 23.7c14.467 7.866 27.6 15.866 39.399 24 11.867 8.2 22.533 16.533 32 25 9.533 8.533 18.134 17.8 25.801 27.8 7.666 10 13.666 19.333 18 28 4.333 8.667 7.5 17.333 9.5 26s2.833 17.333 2.5 26c-.334 8.666-1.834 17.666-4.5 27-2.667 9.334-6.334 18.666-11 28-4.667 9.334-10.5 18.666-17.5 28s-14.4 17.934-22.2 25.8c-7.867 7.8-18.3 16.367-31.3 25.7s-26.667 17.833-41 25.5c-14.334 7.667-30.334 14.833-48 21.5-17.667 6.667-28 10.5-31 11.5s-5.167 1.667-6.5 2l-2 .5-1.5.5-1.5.5-1.5.5-1.5.5-1 .3-1 .2v-2l1-.2 1-.3.199-.3.301-.2.3-.2.2-.3.199-.3.301-.2.3-.2.2-.3.199-.3.301-.2.3-.2.2-.3.199-.3.301-.2.3-.2c.133-.2.6-.733 1.399-1.6.867-.8 5.533-6.267 14-16.4 8.533-10.2 15.533-20.533 21-31 5.533-10.533 9.301-20.467 11.301-29.8 2-9.334 2.666-17.334 2-24-.667-6.666-2.167-12.5-4.5-17.5-2.334-5-5.268-9.1-8.801-12.3-3.467-3.134-7.699-5.7-12.699-7.7s-11.5-3-19.5-3-17 1.666-27 5-20.167 8.166-30.5 14.5c-10.334 6.334-19.834 13.166-28.5 20.5l-13 11-.2.3-.3.2-.301.2-.199.3-1.5.3-1.5.2-.2-1c-.2-.666-2.634-4.334-7.3-11-4.667-6.666-9.233-11.6-13.7-14.8-4.533-3.134-8.967-4.866-13.3-5.2-4.334-.334-9.167.834-14.5 3.5-5.334 2.666-10 6-14 10s-9.667 11.166-17 21.5c-7.334 10.333-17.733 27.934-31.2 52.8L523.5 503l-.5 1-.5 1-.5 1-.5 1-.5 1-.5 1-.5-1-.5-1-.5-1-.5-1-.301-.2-.199-.3-.2-.3-.3-.2-.5-1c-.334-.667-5.334-10.167-15-28.5-9.667-18.333-18.5-34-26.5-47s-15.233-23.1-21.7-30.3c-6.533-7.134-12.134-12.034-16.8-14.7-4.667-2.666-9-4.166-13-4.5s-7-.166-9 .5-5.167 2.666-9.5 6c-4.334 3.334-8.667 8.434-13 15.3L386 410l-1.5-.2-1.5-.3-.2-.3-.3-.2-.301-.2-.199-.3-13-11c-8.667-7.334-18.167-14.166-28.5-20.5-10.334-6.334-19.667-11-28-14-8.334-3-16-4.834-23-5.5s-13.5-.334-19.5 1-10.834 3.1-14.5 5.3c-3.667 2.134-5.5 3.534-5.5 4.2s-.334 1-1 1c-.667 0-2.4 2.5-5.2 7.5-2.867 5-4.8 9.834-5.8 14.5s-1.167 11-.5 19c.666 8 2.666 16.667 6 26 3.333 9.333 8.166 18.833 14.5 28.5 6.333 9.667 12.733 18.1 19.2 25.3 6.533 7.134 9.866 10.8 10 11l.3.2.3.2.2.3.2.3.3.2.3.2.2.3.2.3.3.2.3.2.2.3.2.3.3.2.3.2.2.3 1 .3 1 .2v2l-1-.2-1-.3-1.5-.5-1.5-.5-1.5-.5-1.5-.5-1.5-.5c-1-.333-4.834-1.5-11.5-3.5-6.667-2-18.5-6.5-35.5-13.5s-32.167-14.167-45.5-21.5c-13.334-7.333-25.5-15-36.5-23s-20.434-15.9-28.3-23.7a280.521 280.521 0 0 1-22-25 199.702 199.702 0 0 1-18-28c-5.134-9.866-9.034-19.634-11.7-29.3-2.667-9.666-4.167-19-4.5-28-.334-9 .5-17.667 2.5-26s5.333-17.167 10-26.5c4.666-9.333 10.899-18.934 18.7-28.8 7.866-9.8 16.966-19.2 27.3-28.2 10.333-9 20.833-17.167 31.5-24.5 10.666-7.333 23.5-15 38.5-23s32.666-16 53-24c20.333-8 41.333-15 63-21l32.5-9 2-.5 2-.5h4l-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-10.2 12.3c-6.867 8.134-12.134 15.867-15.8 23.2-3.667 7.333-6.167 13.667-7.5 19-1.334 5.333-1.834 10.833-1.5 16.5.333 5.667 1.732 11.233 4.199 16.7 2.533 5.533 5.301 10.133 8.301 13.8s7.833 7.667 14.5 12c6.666 4.333 14.5 8 23.5 11s19.5 4.5 31.5 4.5 20.333-1.167 25-3.5c4.666-2.333 8.933-5.066 12.8-8.2 3.8-3.2 8.033-8.3 12.7-15.3 4.666-7 8.666-14.833 12-23.5 3.333-8.667 5.833-25.667 7.5-51 1.666-25.333 3.066-40.934 4.199-46.8 1.2-5.8 4.4-3.8 9.601 6 5.133 9.866 8.267 16.633 9.399 20.3 1.2 3.667 4.967 4.9 11.301 3.7 6.333-1.134 14.166-1.534 23.5-1.2 9.333.333 16 .934 20 1.8 4 .8 7.6-2.8 10.8-10.8 3.133-8 6.366-14.833 9.7-20.5 3.333-5.667 6 .833 8 19.5s3.333 34.333 4 47c.666 12.667 2.666 23.333 6 32 3.333 8.667 7.1 16.066 11.3 22.2 4.133 6.2 8.033 11.133 11.7 14.8 3.666 3.667 8.166 6.833 13.5 9.5 5.333 2.667 14 4 26 4s22.5-1.5 31.5-4.5 16.333-6.333 22-10c5.666-3.667 10.566-7.733 14.699-12.2 4.2-4.533 7.467-9.633 9.801-15.3 2.333-5.667 3.5-12 3.5-19s-1.167-13.833-3.5-20.5c-2.334-6.667-5.834-13.667-10.5-21-4.667-7.333-9.167-13.5-13.5-18.5-4.334-5-6.6-7.566-6.801-7.7z"

  ellipse_path = "M44.166,75.062C19.812,75.062,0,61.202,0,44.167C0,27.13,19.812,13.27,44.166,13.27c24.354,0,44.166,13.859,44.166,30.896 C88.332,61.204,68.52,75.062,44.166,75.062z"

  const defs = svg.append("defs")
  const blurFilter = defs.append("filter")
      .attr("id", "blur")
      .append("feGaussianBlur")
      .attr("stdDeviation", 4);

  batman_group.append("path")
    .attr("id", "batman-ellipse")
    .attr("d", ellipse_path)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("stroke-linecap", "round")
    .attr("transform", "scale(6) translate(5.5, -10.5)");

  batman_group.append("path")
    .attr("id", "batman-shadow")
    .attr("d", batman_path)
    .attr("fill", "grey")
    .attr("stroke", "grey")
    .attr("stroke-width", 6)
    .attr("stroke-linecap", "round")
    .attr("filter", "url(#blur)")
    .style("opacity", 0)
    .attr("transform", "scale(0.5) translate(85, 100)");

  batman_group.append("path")
    .attr("id", "batman-logo")
    .attr("d", batman_path)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 6)
    .attr("stroke-linecap", "round")
    .attr("transform", "scale(0.5) translate(75, 90)");

  batman_group.append("rect")
    .attr("class", "cover")
    .attr("x", 70)
    .attr("y", 0)
    .attr("width", 500)
    .attr("height", 400)
    .attr("fill", "white");

  svg.transition().duration(1000).style("opacity", 1);
};

function revealBatman() {
  const svg = d3.select("#batman svg");
  svg.select("rect.cover")
    .transition()
    .duration(1000)
    .attr("x", 600)
    .attr("width", 0).
    remove();
};

function scaleBatman() {
  const svg = d3.select("#batman svg");
  svg.select(".batman-group")
    .transition()
    .duration(1000)
    .attr("transform", "scale(0.75) translate(100, 80)")
};

function blackBatman() {
  const svg = d3.select("#batman svg");
  svg.select("#batman-logo")
    .attr("fill", "white")
    .transition()
    .duration(1000)
    .attr("fill", "#111111")
};

function shadowBatman() {
  const svg = d3.select("#batman svg");
  svg.select("#batman-shadow")
    .transition()
    .duration(1000)
    .style("opacity", 1)
};

function colorBatman() {
  const svg = d3.select("#batman svg");
  svg.select("#batman-ellipse")
    .attr("fill", "white")
    .transition()
    .duration(1000)
    .attr("fill", "#f1f205")
};

function removeBatman() {
  const svg = d3.select("#batman svg");
  svg.select(".batman-group")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove()
};

// clicks
$(document).ready(function() {
  $('#element-line').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      drawEmptyBatman();
      $("#element-shape").slideDown();
      $("[for='element-shape']").slideDown();
    }
  });

  $('#element-shape').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      revealBatman();
      $("#element-space").slideDown();
      $("[for='element-space']").slideDown();
    }
  });

  $('#element-space').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      scaleBatman();
      $("#element-value").slideDown();
      $("[for='element-value']").slideDown();
    }
  });

  $('#element-value').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      blackBatman();
      $("#element-volume").slideDown();
      $("[for='element-volume']").slideDown();
    }
  });

  $('#element-volume').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shadowBatman();
      $("#element-color").slideDown();
      $("[for='element-color']").slideDown();
    }
  });

  $('#element-color').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      colorBatman();
      $("#element-texture").slideDown();
      $("[for='element-texture']").slideDown();
    }
  });

  $('#element-texture').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $("#batman").css({
        'background-image': `url('img/texture.jpg')`,
        'background-size': 'cover',
        'background-position': 'center'
      });
      $("#element-again").slideDown();
    }
  });

  $('#element-again').on('click', function() {
    $("#batman").css('background-image', "none");
    removeBatman();
    $("#element-again, [for='element-texture'], #element-texture, [for='element-color'], #element-color, [for='element-volume'], #element-volume, [for='element-value'], #element-value, [for='element-space'], #element-space, [for='element-shape'], #element-shape")
      .slideUp("fast").promise().done(function() {
        $("input[id^='element-']").removeAttr('disabled').prop('checked', false);
      });
  });
});
