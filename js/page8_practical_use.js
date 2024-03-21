// init
$("#practice-menu-annotations-details").hide()
$("#practice-menu-scale-details").hide()
$("#practice-menu-value-details").hide()


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
      const data2023 = this.data.filter(d => +d.year === 2023);

      // scales
      this.x = d3.scaleLinear()
        //.domain([d3.min(data2023, d => d.gdp_per_capita), d3.max(data2023, d => d.gdp_per_capita*1.025)])
        .domain([d3.min(this.data, d => d.gdp_per_capita), d3.max(this.data, d => d.gdp_per_capita*1.025)])
        .range([0, this.width]);

      this.y = d3.scaleLinear()
        .domain([d3.min(this.data, d => d.life_expectancy), d3.max(this.data, d => d.life_expectancy*1.1)])
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
        .data(data2023)
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
            .html(`<b>${d.country}</b><br>PKB na mieszkańca: $${gdpFormat(d.gdp_per_capita)}<br>Oczekiwana długość życia: ${lifeExpectancyFormat(d.life_expectancy)}`)
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
        .attr("text-anchor", "end")
        .attr("x", this.width / 2 + 60)
        .attr("y", this.height + 40)
        .text("PKB na mieszkańca")
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
      const data2023 = this.data.filter(d => +d.year === 2023);

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
          .data(data2023) // Assuming you store the filtered 2023 data in the object
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
                .html(`<b>${d.country}</b><br>PKB na mieszkańca: $${gdpFormat(d.gdp_per_capita)}<br>Oczekiwana długość życia: ${lifeExpectancyFormat(d.life_expectancy)}`)
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

    updatePointColors: function() {
      const regionColors = d3.scaleOrdinal()
        .domain(["asia", "africa", "europe", "americas"])
        .range(["#1f77b4", "brown", "#ff7f0e", "#2ca02c"]);

      this.chartGroup.selectAll(".circle-point")
        .transition().duration(500)
        .attr("fill", d =>regionColors(d.region));


      const legendSpacing = 4; // Spacing between legend entries
      const legendRectSize = 12; // The size of the legend color box
      const legendX = 70; // Positioning the legend on the right
      const legendY = this.height + 10; // Starting position of the legend

      const legend = this.svg.selectAll('.legend') // Select all legend elements
        .style("opacity", 1)
        .data(regionColors.domain()) // Bind domain data
        .enter() // For each data point in the domain
        .append('g') // Append a 'g' element
        .attr('class', 'legend') // With class 'legend'
        .attr('transform', function(d, i) {
          const height = legendRectSize + legendSpacing;
          const offset = height * regionColors.domain().length / 2;
          const horz = legendX; // horizontal position
          const vert = i * height + legendY;
          return `translate(${horz},${vert - offset})`; // vertical position, centered
        });

      legend.append('rect') // Append a rectangle
        .attr("class", "legend-box")
        .attr('width', legendRectSize) // Width of the rectangle
        .attr('height', legendRectSize) // Height of the rectangle
        .style('fill', regionColors) // Fill using the regionColors scale
        .style('stroke', regionColors) // Border using the same color
        .style("opacity", 0)
          .transition().duration(1000)
          .style("opacity", 1);

      legend.append('text') // Append a text element
        .style("opacity", 0)
        .attr("font-size", "10px")
        .attr('x', legendRectSize + legendSpacing) // X position to the right of the square
        .attr('y', legendRectSize - legendSpacing) // Y position
        .text(d => d.charAt(0).toUpperCase() + d.slice(1)) // Capitalize the first letter
          .transition().duration(500)
          .style("opacity", 1);
    },

    updatePointRadius: function() {
      const populationRadiusScale = d3.scaleSqrt()
        .domain([d3.min(this.data, d => d.population), d3.max(this.data, d => d.population)])
        .range([2, 30]);

      this.chartGroup.selectAll(".circle-point")
        .transition().duration(1000)
        .attr("r", d => populationRadiusScale(d.population)); // Update the radius based on the population
    },

    removePointRadius: function() {
      this.chartGroup.selectAll(".circle-point")
        .transition().duration(1000)
        .attr("r", 2);
    },

    changeXAxisToLog: function() {
      const data2023 = this.data.filter(d => +d.year === 2023);
      this.x = d3.scaleLog()
          .domain([d3.min(this.data, d => Math.max(1, d.gdp_per_capita)), d3.max(this.data, d => d.gdp_per_capita * 1.025)])
          .range([0, this.width]);

      this.svg.selectAll(".x-axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(this.x));

      this.svg.selectAll(".circle-point")
        .transition()
        .duration(1000)
        .attr("cx", d => this.x(d.gdp_per_capita));
    },

    changeXAxisToLine: function() {
      const data2023 = this.data.filter(d => +d.year === 2023);
      this.x = d3.scaleLinear()
          .domain([d3.min(this.data, d => Math.max(1, d.gdp_per_capita)), d3.max(this.data, d => d.gdp_per_capita * 1.025)])
          .range([0, this.width]);

      this.svg.selectAll(".x-axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(this.x));

      this.svg.selectAll(".circle-point")
        .transition()
        .duration(1000)
        .attr("cx", d => this.x(d.gdp_per_capita));
    },

    updatePointOpacityAndBorder: function(opacity) {
      this.chartGroup.selectAll(".circle-point")
        .transition().duration(1)
        .style("fill-opacity", opacity / 100);

      this.svg.selectAll("rect.legend-box")
        .transition().duration(1)
        .style("opacity", opacity / 100);
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
      scatterChart.updatePointColors();
    }
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
      scatterChart.changeXAxisToLog();
      $(this).attr("data-checked", "1");
      $(this).removeClass("bg-light").addClass("bg-success").removeClass("text-secondary").addClass("text-white");
      $(this).html("X (log)");
    } else {
      scatterChart.changeXAxisToLine();
      $(this).attr("data-checked", "0");
      $(this).removeClass("bg-success").addClass("bg-light").removeClass("text-white").addClass("text-secondary");
      $(this).html("X (liniowa)");
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

});
