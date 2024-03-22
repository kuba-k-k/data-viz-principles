// init
$("#practice-menu-annotations-details").hide();
$("#practice-menu-scale-details").hide();
$("#practice-menu-value-details").hide();
$("#practice-menu-depth-details").hide();
$("#practice-menu-color-picker").hide();


// gapminder-like tool & clicks
$(document).ready(function() {

  // gapminder-like tool
  const chartContainer = document.getElementById("practice-chart");
  const scatterChart = {
    svg: null,
    chartGroup: null,
    width: chartContainer.clientWidth,
    height: chartContainer.clientHeight,
    x: null,
    y: null,
    rScale: null,
    colorScale: null,
    year: 2023,
    data: null,
    data_filtered: null,
    country_mapping: null,
    init: function() {
      d3.json("data/gapminder_country_map.json").then(country_mapping => {
        this.country_mapping = country_mapping;

        // svg setup
        const margin = {top: 50, right: 60, bottom: 50, left: 60};
        this.width = this.width - margin.left - margin.right;
        this.height = this.height - margin.top - margin.bottom;

        this.svg = d3.select("#practice-chart").append("svg")
          .attr("width", this.width + margin.left + margin.right)
          .attr("height", this.height + margin.top + margin.bottom)

        this.chartGroup = this.svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .style("opacity", 0);

        this.loadData();
      });
    },

    loadData: function() {
      d3.csv("data/gapminder_data.csv").then(data => {
        this.createScatterPlot(data);
      }).catch(error => console.error("Error loading the CSV file: ", error));
    },

    createScatterPlot: function(data) {
      this.data = data;
      const gdpFormat = d3.format(",.0f");
      const lifeExpectancyFormat = d3.format(".1f");

      data.forEach(d => {
        d.region = d.region;
        d.country = this.country_mapping[d.country_code];
        d.gdp_per_capita = +d.gdp_per_capita;
        d.life_expectancy = +d.life_expectancy;
        d.population = +d.population;
      });
      const data_filtered = this.data.filter(d => +d.year == $('#practice-menu-depth-range').val());

      // scales
      this.x = d3.scaleLinear()
        .domain([d3.min(this.data, d => d.gdp_per_capita), d3.max(this.data, d => d.gdp_per_capita*1.025)])
        .range([0, this.width]);

      this.y = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d.life_expectancy*1.1)])
        .range([this.height, 0]);

      // axes
      this.chartGroup.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${this.height})`)
        .call(d3.axisBottom(this.x));

      this.chartGroup.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(this.y))

      this.chartGroup.select(".x-axis").selectAll(".tick").style("opacity", 0);
      this.chartGroup.select(".y-axis").selectAll(".tick").style("opacity", 0);

      // points
      this.chartGroup.selectAll(".point")
        .data(data_filtered)
        .enter().append("text")
        .attr("class", "point")
        .attr("x", d => this.x(d.gdp_per_capita))
        .attr("y", d => this.y(d.life_expectancy))
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text("x")
        .on("mouseover", function(event, d) {
          d3.select("#pointtooltip")
            .style("visibility", "visible")
            .html(`<b>${d.country}</b><br>PKB per capita: $${gdpFormat(d.gdp_per_capita)}<br>Oczekiwana długość życia: ${lifeExpectancyFormat(d.life_expectancy)}`)
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
          d3.select("#pointtooltip").style("visibility", "hidden");
        });

      this.chartGroup
        .transition().duration(1000).style("opacity", 1)

    },

    drawAxisTitles: function() {
      this.chartGroup.append("text")
        .attr("class", "x axis-label")
        .attr("text-anchor", "middle")
        .attr("x", this.width / 2)
        .attr("y", this.height + 40)
        .text("PKB per capita")
        .style("opacity", 0)
        .transition().duration(1000)
        .style("opacity", 1);

      this.chartGroup.append("text")
        .attr("class", "y axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", - this.height / 2)
        .text("Oczekiwana długość życia")
        .style("opacity", 0)
        .transition().duration(1000)
        .style("opacity", 1);
    },

    drawAxisTicks: function() {
      this.chartGroup.select(".x-axis").selectAll(".tick")
        .transition().duration(1000)
        .style("opacity", 1);
      this.chartGroup.select(".y-axis").selectAll(".tick")
        .transition().duration(1000)
        .style("opacity", 1);
    },

    hideAxisTitles: function() {
      this.chartGroup.selectAll(".axis-label")
        .transition().duration(1000)
        .style("opacity", 0)
        .remove();
    },

    hideAxisTicks: function() {
      this.chartGroup.select(".x-axis").selectAll(".tick")
        .transition().duration(1000)
        .style("opacity", 0);
      this.chartGroup.select(".y-axis").selectAll(".tick")
        .transition().duration(1000)
        .style("opacity", 0);
    },

    transitionXPointsToCircles: function() {
      const data_filtered = this.data.filter(d => +d.year == $('#practice-menu-depth-range').val() );

      const gdpFormat = d3.format(",.0f");
      const lifeExpectancyFormat = d3.format(".1f");

      // Fade out text elements
      const fadeOutTransition = this.chartGroup.selectAll(".point")
        .transition()
        .duration(750)
        .style("opacity", 0);
      fadeOutTransition.end().then(() => {
        // Once the fade-out is complete, remove the text elements
        this.chartGroup.selectAll(".point").remove();

        // Now, proceed to add circle elements for each data point
        this.chartGroup.selectAll(".circle-point")
          .data(data_filtered, d => d.country_code) // Assuming you store the filtered 2023 data in the object
          .enter().append("circle") // Append circle elements
            .attr("class", "circle-point")
            .attr("cx", d => this.x(d.gdp_per_capita))
            .attr("cy", d => this.y(d.life_expectancy))
            .attr("r", 0)
            .attr("fill", "black")
            .attr("stroke", "grey")
            .attr("stroke-width", 0.5)
            .on("mouseover", function(event, d) {
              d3.select("#pointtooltip")
                .style("visibility", "visible")
                .html(`<b>${d.country}</b><br>PKB per capita: $${gdpFormat(d.gdp_per_capita)}<br>Oczekiwana długość życia: ${lifeExpectancyFormat(d.life_expectancy)}`)
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
              d3.select("#pointtooltip").style("visibility", "hidden");
            })
            .transition().duration(500)
            .attr("r", 2);

      }).catch(error => console.error("Transition failed", error));
    },

    updatePointColors: function(option) {

      color_ranges = {
        0: ["yellow", "saddlebrown", "pink", "red"], // initial
        1: ["#4d4d4d", "#808080", "#b3b3b3", "#e6e6e6"], // achromatic
        2: ["#4d4d4d", "#808080", "#b3b3b3", "#FF4500"], // accented achromatic
        3: ["#004d99", "#0080ff", "#66b3ff", "#cce6ff"], // monochromatic
        4: ["#1ECBE1", "#1E6AE1", "#1EE196", "#1EE135"], // analogous
        5: ["#1ECBE1", "#1E6AE1", "#1EE196", "#E2501D"], // accented analogous
        6: ["#1ECBE1", "#331EE1", "#E11ECD", "#E1321E"], // clash
        7: ["#32CD32", "#CD32CD", "#CD3232", "#32CDCD"], // complementary
        8: ["#CA35BA", "#35CA45", "#3645C9", "#C9BA36"], // diamond rule
        9: ["#23DCDB", "#24DC23", "#DC2381", "#7E23DC"], // split complementary
        10: ["#F10E6B", "#6BF10E", "#0E6BF1", "#808080"], // triad
        11: ["#07C7F8", "#B107F8", "#F83807", "#4EF807"], // tetrad
      }

      this.colorScale = d3.scaleOrdinal()
        .domain(["asia", "africa", "europe", "americas"])
        .range(color_ranges[option]);

      this.chartGroup.selectAll(".circle-point")
        .transition().duration(500)
        .attr("fill", d => this.colorScale(d.region));

      const legendSpacing = 4;
      const legendRectSize = 12;
      const legendX = 70;
      const legendY = this.height + 10;

      var colorScaleDomainLength = this.colorScale.domain().length;

      this.svg.selectAll('.legend').remove()
      const legend = this.svg.selectAll('.legend')
        .style("opacity", 1)
        .data(this.colorScale.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          const height = legendRectSize + legendSpacing;
          const offset = height * colorScaleDomainLength / 2;
          const horz = legendX;
          const vert = i * height + legendY;
          return `translate(${horz},${vert - offset})`;
        });

      legend.append('rect')
        .attr("class", "legend-box")
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', this.colorScale)
        .style('stroke', this.colorScale)
        .style("opacity", 0)
          .transition().duration(1000)
          .style("opacity", 1);

      legend.append('text')
        .style("opacity", 0)
        .attr("font-size", "10px")
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing + 2)
        .text(d => d.charAt(0).toUpperCase() + d.slice(1))
          .transition().duration(500)
          .style("opacity", 1);
    },

    updatePointRadius: function() {
      this.rScale = d3.scaleSqrt()
        .domain([d3.min(this.data, d => d.population), d3.max(this.data, d => d.population)])
        .range([2, 30]);

      this.chartGroup.selectAll(".circle-point")
        .transition().duration(1000)
        .attr("r", d => this.rScale(d.population));
    },

    removePointRadius: function() {
      this.chartGroup.selectAll(".circle-point")
        .transition().duration(1000)
        .attr("r", 2);
    },

    changeXAxisScale: function(type) {
      const data_filtered = this.data.filter(d => +d.year == $('#practice-menu-depth-range').val());
      if (type=="log"){
        this.x = d3.scaleLog()
            .domain([d3.min(this.data, d => Math.max(1, d.gdp_per_capita)), d3.max(this.data, d => d.gdp_per_capita * 1.025)])
            .range([0, this.width]);
      } else if (type=="line") {
        this.x = d3.scaleLinear()
            .domain([d3.min(this.data, d => Math.max(1, d.gdp_per_capita)), d3.max(this.data, d => d.gdp_per_capita * 1.025)])
            .range([0, this.width]);
      };

      this.svg.selectAll(".x-axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(this.x));

      this.svg.selectAll(".circle-point")
        .transition()
        .duration(1000)
        .attr("cx", d => this.x(d.gdp_per_capita));

      this.chartGroup.select(".x.axis-label")
        .transition()
        .duration(1000)
        .text(() => { return (type=="log") ? "PKB per capita (skala logarytmiczna)" : "PKB per capita" });
    },

    changeYAxisScale: function(type) {
      const data_filtered = this.data.filter(d => +d.year == $('#practice-menu-depth-range').val());
      if (type=="fit") {
        this.y = d3.scaleLinear()
          .domain([d3.min(data_filtered, d => d.life_expectancy)*0.9, d3.max(data_filtered, d => d.life_expectancy*1.1)])
          .range([this.height, 0]);
      } else if (type=="full") {
        this.y = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.life_expectancy*1.1)])
          .range([this.height, 0]);
      }

      this.svg.selectAll(".y-axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(this.y));

      this.svg.selectAll(".circle-point")
        .transition()
        .duration(1000)
        .attr("cy", d => this.y(d.life_expectancy));
    },

    updatePointOpacityAndBorder: function(opacity) {
      this.chartGroup.selectAll(".circle-point")
        .transition().duration(1)
        .style("fill-opacity", opacity / 100);

      this.svg.selectAll("rect.legend-box")
        .transition().duration(1)
        .style("opacity", opacity / 100);
    },

    changeYear: function() {
      const gdpFormat = d3.format(",.0f");
      const lifeExpectancyFormat = d3.format(".1f");
      const data_filtered = this.data.filter(d => +d.year == $('#practice-menu-depth-range').val());

      if ($('#practice-menu-scale-yaxis-button').attr("data-checked")==1) {
        const data_smooth_y_transition = this.data.filter(d => Math.abs(+d.year - $('#practice-menu-depth-range').val()) <= 10);
        this.y = d3.scaleLinear()
          .domain([d3.min(data_smooth_y_transition, d => d.life_expectancy)*0.9, d3.max(data_smooth_y_transition, d => d.life_expectancy*1.1)])
          .range([this.height, 0]);

        this.svg.selectAll(".y-axis")
          .transition()
          .duration(50)
          .call(d3.axisLeft(this.y));
      };

      const circlePoints = this.svg.selectAll(".circle-point")
        .data(data_filtered, d => d.country_code);

      circlePoints.enter().append("circle")
        .attr("class", "circle-point")
        .attr("r", 0)
        .attr("fill", d => this.colorScale(d.region))
        .attr("cx", d => this.x(d.gdp_per_capita))
        .attr("cy", d => this.y(d.life_expectancy))
        .transition().duration(50)
        .attr("r", d => this.rScale(d.population))
        .attr("stroke", "grey")
        .attr("stroke-width", 0.5)
        .on("mouseover", function(event, d) {
          d3.select("#pointtooltip")
            .style("visibility", "visible")
            .html(`<b>${d.country}</b><br>PKB per capita: $${gdpFormat(d.gdp_per_capita)}<br>Oczekiwana długość życia: ${lifeExpectancyFormat(d.life_expectancy)}`)
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
          d3.select("#pointtooltip").style("visibility", "hidden");
        });

      circlePoints.transition().duration(50)
        .attr("r", d => this.rScale(d.population))
        .attr("cx", d => this.x(d.gdp_per_capita))
        .attr("cy", d => this.y(d.life_expectancy));

      circlePoints.exit()
        .transition().duration(50)
        .attr("r", 0)
        .remove();
    },

    selectPoland: function() {
      this.svg.selectAll(".circle-point")
        .transition().duration(1000)
        .style("fill-opacity", function(d) { return d.country_code === 'pol' ? 1.0 : 0.25; })
        .style("stroke", function(d) { return d.country_code === 'pol' ? "red" : "grey"; })
        .style("stroke-width", function(d) { return d.country_code === 'pol' ? 2 : 0.5; });
    },

    unselectPoland: function() {
      this.svg.selectAll(".circle-point")
        .transition().duration(1000)
        .style("fill-opacity", 0.7)
        .style("stroke", "grey")
        .style("stroke-width", 0.5);
    },

  };


  // click paths
  $('#practice-menu-start').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      scatterChart.init();
    }
  });

  $('#practice-menu-annotations').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $("#practice-menu-annotations-details").slideDown();
    }
  });

  $('#practice-menu-annotations-axes-button').on('click', function() {
    if ($(this).attr("data-checked")==0) {
      scatterChart.drawAxisTitles();
      $(this).attr("data-checked", "1");
      $(this).removeClass("bg-light").addClass("bg-success").removeClass("text-secondary").addClass("text-white");
    } else {
      scatterChart.hideAxisTitles();
      $(this).attr("data-checked", "0");
      $(this).removeClass("bg-success").addClass("bg-light").removeClass("text-white").addClass("text-secondary");
    }
  });

  $('#practice-menu-annotations-ticks-button').on('click', function() {
    if ($(this).attr("data-checked")==0) {
      scatterChart.drawAxisTicks();
      $(this).attr("data-checked", "1");
      $(this).removeClass("bg-light").addClass("bg-success").removeClass("text-secondary").addClass("text-white");
    } else {
      scatterChart.hideAxisTicks();
      $(this).attr("data-checked", "0");
      $(this).removeClass("bg-success").addClass("bg-light").removeClass("text-white").addClass("text-secondary");
    }
  });

  $('#practice-menu-shape').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      scatterChart.transitionXPointsToCircles();
    }
  });

  $('#practice-menu-color').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $("#practice-menu-color-picker").slideDown();
      scatterChart.updatePointColors(0);
    }
  });

  $('#practice-menu-color-select').change(function(){
    scatterChart.updatePointColors(parseInt($(this).val()));
  });

  $('#practice-menu-scale').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $("#practice-menu-scale-details").slideDown();
    }
  });

  $('#practice-menu-scale-points-button').on('click', function() {
    if ($(this).attr("data-checked")==0) {
      scatterChart.updatePointRadius();
      $(this).attr("data-checked", "1");
      $(this).removeClass("bg-light").addClass("bg-success").removeClass("text-secondary").addClass("text-white");
    } else {
      scatterChart.removePointRadius();
      $(this).attr("data-checked", "0");
      $(this).removeClass("bg-success").addClass("bg-light").removeClass("text-white").addClass("text-secondary");
    }
  });

  $('#practice-menu-scale-xaxis-button').on('click', function() {
    if ($(this).attr("data-checked")==0) {
      scatterChart.changeXAxisScale("log");
      $(this).attr("data-checked", "1");
      $(this).removeClass("bg-light").addClass("bg-success").removeClass("text-secondary").addClass("text-white");
    } else {
      scatterChart.changeXAxisScale("line");
      $(this).attr("data-checked", "0");
      $(this).removeClass("bg-success").addClass("bg-light").removeClass("text-white").addClass("text-secondary");
    }
  });

  $('#practice-menu-scale-yaxis-button').on('click', function() {
    if ($(this).attr("data-checked")==0) {
      scatterChart.changeYAxisScale("fit");
      $(this).attr("data-checked", "1");
      $(this).removeClass("bg-light").addClass("bg-success").removeClass("text-secondary").addClass("text-white");
    } else {
      scatterChart.changeYAxisScale("full");
      $(this).attr("data-checked", "0");
      $(this).removeClass("bg-success").addClass("bg-light").removeClass("text-white").addClass("text-secondary");
    }
  });

  $('#practice-menu-value').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $("#practice-menu-value-details").slideDown();
    }
  });

  $('#practice-menu-value-range').on('input', function() {
    scatterChart.updatePointOpacityAndBorder($(this).val());
  });

  $('#practice-menu-depth').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $(this).attr('disabled', 'disabled');
      $("#practice-menu-depth-details").slideDown();
    }
  });

  $('#practice-menu-depth-range').on('input', function() {
    $("#practice-menu-depth-year").html($(this).val());
    scatterChart.changeYear();
  });

  $('#practice-menu-dominance').on('click', function() {
    if ($(this).is(':checked:not(:disabled)')) {
      $("#practice-menu-value-range").val(25);
      scatterChart.selectPoland();
    } else {
      $("#practice-menu-value-range").val(70);
      scatterChart.unselectPoland();
    }
  });

  $('#practice-menu-depth-play').click(function() {
      var $range = $('#practice-menu-depth-range');
      var maxVal = parseInt($range.attr('max'), 10);

      var currentValue = 1799;
      function moveRangeAYear() {
          if (currentValue < maxVal) {
              currentValue++;
              $range.val(currentValue).trigger('input');
              setTimeout(moveRangeAYear, 50);
          }
      }
      moveRangeAYear();
  });

});
