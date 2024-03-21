// init state
$("#principle-gestalt").hide();
$("[for='principle-gestalt']").hide();
$("#principle-hierarchy").hide();
$("[for='principle-hierarchy']").hide();
$("#principle-balance").hide();
$("[for='principle-balance']").hide();
$("#principle-contrast").hide();
$("[for='principle-contrast']").hide();
$("#principle-scale").hide();
$("[for='principle-scale']").hide();
$("#principle-dominance").hide();
$("[for='principle-dominance']").hide();
$("#principle-again").hide();


// functions
function showBlocks() {
  const svg = d3.select("#sandbox svg")
                 .attr("width", 800)
                 .attr("height", 400)
                 .style("opacity", 0);

  const shape_group = svg.append("g").attr("class", "shape-group")

  shapes = [
    {shape: "rect", id: "b1", x: 170, y: 44, w: 300, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
    {shape: "rect", id: "b2", x: 180, y: 74, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
    {shape: "rect", id: "b3", x: 240, y: 115, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
    {shape: "rect", id: "b4", x: 210, y: 140, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
    {shape: "rect", id: "b5", x: 100, y: 170, w: 600, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
    {shape: "rect", id: "b6", x: 90, y: 293, w: 600, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
    {shape: "rect", id: "b7", x: 270, y: 360, w: 500, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
  ];

  shapes.forEach((shape) => {
    shape_group.append(shape["shape"])
      .attr("id", shape["id"])
      .attr("x", shape["x"]).attr("y", shape["y"])
      .attr("width", shape["w"]).attr("height", shape["h"]).attr("fill", shape["c"])
      .attr("stroke", shape["stroke"]).attr("stroke-width", 2);
  });

  svg.transition().duration(1000).style("opacity", 1);
};

function moveBlocks(shapes){
  const svg = d3.select("#sandbox svg")
  svg.selectAll("text")
    .transition().duration(500).style("opacity", 0).remove()

  shapes.forEach((shape) => {
    svg.select("#" + shape["id"])
      .transition()
      .duration(1000)
      .attr("x", shape["x"])
      .attr("y", shape["y"])
      .attr("width", shape["w"])
      .attr("height", shape["h"])
      .attr("fill", shape["c"])
      .attr("stroke", shape["stroke"])
      .attr("stroke-dasharray", shape["stroke-dasharray"]);
  });

};

function showText() {
  const svg = d3.select("#sandbox svg")

  svg.append("text")
    .attr("x", 400)
    .attr("y", 50)
    .attr("font-size", 32)
    .attr("text-anchor", "middle")
    .text("Duży tekst jest ważny, przeczytasz go najpierw")
    .style("opacity", 0)
    .transition().duration(1000).delay(500).style("opacity", 1);

  svg.append("text")
    .attr("x", 400)
    .attr("y", 80)
    .attr("font-size", 18)
    .attr("text-anchor", "middle")
    .text("Mniejszy tekst jest mniej ważny, przeczytasz go jako drugi")
    .style("opacity", 0)
    .transition().duration(1000).delay(500).style("opacity", 1);
}

function removeBlocks() {
  const svg = d3.select("#sandbox svg")
  svg.selectAll("text")
    .transition().duration(500).style("opacity", 0).remove();
  svg.selectAll("rect")
    .transition().duration(500).style("opacity", 0).remove();
};

// clicks
$(document).ready(function() {
  showBlocks();

  $('#principle-unity').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 250, y: 50, w: 300, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b2", x: 200, y: 80, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 200, y: 110, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 200, y: 140, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 100, y: 170, w: 600, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b6", x: 100, y: 280, w: 600, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 100, y: 310, w: 500, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      $("#principle-gestalt").slideDown();
      $("[for='principle-gestalt']").slideDown();
    }
  });

  $('#principle-gestalt').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 230, y: 50, w: 340, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b2", x: 200, y: 75, w: 400, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 170, y: 100, w: 460, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 140, y: 125, w: 530, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 100, y: 150, w: 600, h: 200, c: "white", "stroke-dasharray": "0,0", "stroke": "lightgrey"},
        {shape: "rect", id: "b6", x: 150, y: 200, w: 70, h: 70, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 580, y: 200, w: 70, h: 70, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      $("#principle-hierarchy").slideDown();
      $("[for='principle-hierarchy']").slideDown();
    }
  });

  $('#principle-hierarchy').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 120, y: 200, w: 100, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b2", x: 240, y: 220, w: 80, h: 80, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 340, y: 230, w: 70, h: 70, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 430, y: 240, w: 60, h: 60, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 510, y: 250, w: 50, h: 50, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b6", x: 580, y: 260, w: 40, h: 40, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 640, y: 270, w: 30, h: 30, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      showText();
      $("#principle-balance").slideDown();
      $("[for='principle-balance']").slideDown();
    }
  });

  $('#principle-balance').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 170, y: 50, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b2", x: 170, y: 210, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 330, y: 50, w: 100, h: 105, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 330, y: 155, w: 100, h: 105, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 330, y: 260, w: 100, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b6", x: 440, y: 50, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 440, y: 210, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      $("#principle-contrast").slideDown();
      $("[for='principle-contrast']").slideDown();
    }
  });

  $('#principle-contrast').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 170, y: 50, w: 150, h: 150, c: "magenta", "stroke-dasharray": "0,0", "stroke": "magenta"},
        {shape: "rect", id: "b2", x: 170, y: 210, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 330, y: 50, w: 100, h: 105, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 330, y: 155, w: 100, h: 105, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 330, y: 260, w: 100, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b6", x: 440, y: 50, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 440, y: 210, w: 150, h: 150, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      $("#principle-scale").slideDown();
      $("[for='principle-scale']").slideDown();
    }
  });

  $('#principle-scale').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 350, y: 150, w: 100, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b2", x: 310, y: 190, w: 20, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 310, y: 190, w: 20, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 310, y: 190, w: 20, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 310, y: 190, w: 20, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b6", x: 310, y: 190, w: 20, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 310, y: 190, w: 20, h: 20, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      $("#principle-dominance").slideDown();
      $("[for='principle-dominance']").slideDown();
    }
  });

  $('#principle-dominance').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      shapes = [
        {shape: "rect", id: "b1", x: 350, y: 150, w: 100, h: 100, c: "grey", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b2", x: 310, y: 190, w: 20, h: 20, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b3", x: 270, y: 190, w: 20, h: 20, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b4", x: 230, y: 190, w: 20, h: 20, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b5", x: 470, y: 190, w: 20, h: 20, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b6", x: 510, y: 190, w: 20, h: 20, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
        {shape: "rect", id: "b7", x: 550, y: 190, w: 20, h: 20, c: "white", "stroke-dasharray": "0,0", "stroke": "grey"},
      ];
      moveBlocks(shapes);
      $("#principle-again").slideDown();
    }
  });

  $('#principle-again').on('click', function() {
    removeBlocks();
    $("#principle-again").slideUp("fast").promise().done(function() {
      $("[for='principle-dominance'], #principle-dominance, [for='principle-scale'], #principle-scale, [for='principle-contrast'], #principle-contrast, [for='principle-balance'], #principle-balance, [for='principle-hierarchy'], #principle-hierarchy, [for='principle-gestalt'], #principle-gestalt")
        .slideUp("fast").last().promise().done(function() {
          $("input[id^='principle-']").removeAttr('disabled').prop('checked', false);
          showBlocks();
        });
    });
  });

});
