// init


// click paths
$(document).ready(function() {
    // latch table
    var table;
    $.getJSON('data/books.json', function(bookData) {
        function shuffleArray(array) {
                  for (let i = array.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
                  }
              }
        var bookData = bookData.filter(function(book) {
            return book.author !== 'praca zbiorowa';
        });
        shuffleArray(bookData); // Shuffle the book data

        table = $('#latch-table').DataTable({
            data: bookData,
            columns: [
                { data: 'location', name: 'location', visible: false },
                { data: 'genre', name: 'genre' },
                { data: 'title', name: 'title' },
                { data: 'author', name: 'author' },
                { data: 'author_last_name', name: 'author_last_name', visible: false },
                { data: 'price', name: 'price', visible: false, render: function(data) {
                    return data.toFixed(2) + " zł";
                }},
                { data: 'publisher_price', name: 'publisher_price', visible: false, render: function(data) {
                    return data.toFixed(2) + " zł";
                }},
                { data: 'diff', name: 'diff', visible: false },
                { data: 'diff%', name: 'diff%', visible: false, render: function(data) {
                    return (data * 100).toFixed(1) + "%";
                }},
                { data: 'year', name: 'year' },
            ],
            searching: false,
            lengthChange: false,
            order: [],
            pageLength: 10,
            language: {
                "decimal": "",
                "emptyTable": "Brak danych w tabeli",
                "info": "Pokazuję _START_ do _END_ z _TOTAL_ książek",
                "infoEmpty": "Pokazuję 0 do 0 z 0 książek",
                "infoFiltered": "(filtrowane z _MAX_ wszystkich książek)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Pokaż _MENU_ książek",
                "loadingRecords": "Ładowanie...",
                "processing": "Przetwarzanie...",
                "search": "Szukaj:",
                "zeroRecords": "Nie znaleziono pasujących książek",
                "paginate": {
                    "first": "Pierwszy",
                    "last": "Ostatni",
                    "next": "Następny",
                    "previous": "Poprzedni"
                },
                "aria": {
                    "sortAscending": ": aktywuj, aby posortować kolumnę rosnąco",
                    "sortDescending": ": aktywuj, aby posortować kolumnę malejąco"
                }
            }
        });
    });

    function updateDataTableLocation(){
      table.column('location:name').visible(true);
      table.column('genre:name').visible(false);
      table.column('year:name').visible(true);
      table.column('price:name').visible(false);
      table.column('diff%:name').visible(false);
      table.order([[0, 'asc']]).draw();
    }
    function updateDataTableAuthorInitial(){
      table.column('location:name').visible(false);
      table.column('genre:name').visible(true);
      table.column('year:name').visible(true);
      table.column('price:name').visible(false);
      table.column('diff%:name').visible(false);
      table.order([[4, 'asc']]).draw();
    }
    function updateDataTableYear(){
      table.column('location:name').visible(false);
      table.column('genre:name').visible(true);
      table.column('year:name').visible(true);
      table.column('price:name').visible(false);
      table.column('diff%:name').visible(false);
      table.order([[9, 'asc']]).draw();
    }
    function updateDataTableGenre(){
      table.column('location:name').visible(false);
      table.column('genre:name').visible(true);
      table.column('year:name').visible(true);
      table.column('price:name').visible(false);
      table.column('diff%:name').visible(false);
      table.order([[1, 'asc']]).draw();
    }
    function updateDataTablePromo(){
      table.column('location:name').visible(false);
      table.column('genre:name').visible(false);
      table.column('year:name').visible(false);
      table.column('price:name').visible(true);
      table.column('diff%:name').visible(true);
      table.order([[8, 'asc']]).draw();
    }

    //latch chart
    const chartContainer = document.getElementById("latch-chart");
    const columnChart = {
      svg: null,
      chartGroup: null,
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
      margin: {top: 70, right: 30, bottom: 50, left: 40},
      x: null,
      y: null,
      color: null,
      data: null,
      data_filtered: null,
      init: function() {
        // load data
        d3.json("data/books.json").then(data => {
          data.forEach(d => {
            d.year = +d.year;
          });
          this.data = data;
        });
      },

      remove: function() {
        d3.select("#latch-chart").selectAll("*")
          .transition().duration(500).style("opacity", 0).remove()
      },

      draw: function() {
        // svg setup
        this.svg = d3.select("#latch-chart").append("svg")
          .attr("width", 0)
          .attr("height", 0)
        this.svg
          .transition().delay(500)
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)

        this.chartGroup = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`)
            .style("opacity", 1);
      },

      countBooksByLocation: function() {
        const countByLocation = {};
        this.data.forEach(book => {
          if (countByLocation[book.location]) {countByLocation[book.location] += 1;}
          else {countByLocation[book.location] = 1;}
        });
        this.data_filtered = Object.keys(countByLocation).map(key => ({
          x: key,
          count: countByLocation[key]
        })).sort((a, b) => b.count - a.count);
      },

      countBooksByYears: function() {
        const countByYear = {};
        this.data.forEach(book => {
          if (countByYear[book.year]) {countByYear[book.year] += 1;}
          else {countByYear[book.year] = 1;}
        });
        this.data_filtered = Object.keys(countByYear).map(key => ({
          x: key,
          count: countByYear[key]
        })).sort((a, b) => a.x - b.x);
      },

      countBooksByCategory: function() {
        const countByCategory = {};
        this.data.forEach(book => {
          if (countByCategory[book.genre]) {countByCategory[book.genre] += 1;}
          else {countByCategory[book.genre] = 1;}
        });
        this.data_filtered = Object.keys(countByCategory).map(key => ({
          x: key,
          count: countByCategory[key]
        })).sort((a, b) => b.count - a.count);
      },

      countBooksByAuthorInitial: function() {
        const countByInitial = {};
        for(let charCode = 65; charCode <= 90; charCode++) {
          countByInitial[String.fromCharCode(charCode)] = 0;
        }
        this.data.forEach(book => {
          const initial = book.author_last_name.toUpperCase().charAt(0);
          if (countByInitial.hasOwnProperty(initial)) {
            countByInitial[initial] += 1;
          }
        });
        this.data_filtered = Object.keys(countByInitial).map(key => ({
          x: key,
          count: countByInitial[key]
        }));
      },

      countBooksByDiffPercentage: function() {
          const countByDiffCategory = {"30% do 40%": 0, "20% do 30%": 0, "10% do 20%": 0, "0% do 10%": 0,};
          function getDiffCategory(diffPercentage) {
              if (diffPercentage <= 0 && diffPercentage > -0.1) return "0% do 10%";
              if (diffPercentage <= -0.1 && diffPercentage > -0.2) return "10% do 20%";
              if (diffPercentage <= -0.2 && diffPercentage > -0.3) return "20% do 30%";
              if (diffPercentage <= -0.3 && diffPercentage > -0.4) return "30% do 40%";
              return null;
          }
          this.data.forEach(book => {
              const category = getDiffCategory(book["diff%"]);
              if (category) {
                  countByDiffCategory[category] += 1;
              }
          });
          this.data_filtered = Object.entries(countByDiffCategory).map(([key, count]) => ({
              x: key,
              count: count
          }));
      },

      createColumns: function(titleText, rotateLabels) {
        this.x = d3.scaleBand()
          .range([0, this.width - this.margin.left - this.margin.right])
          .padding(0.2)
          .domain(this.data_filtered.map(d => d.x));

        this.y = d3.scaleLinear()
          .range([this.height - this.margin.top - this.margin.bottom, 0])
          .domain([0, d3.max(this.data_filtered, d => d.count)]);

        const xAxisGroup = this.chartGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${this.height - this.margin.top - this.margin.bottom})`)
            .style("opacity", 0);
        xAxisGroup.call(d3.axisBottom(this.x));
        if (rotateLabels===true) {
          xAxisGroup.selectAll(".tick text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.5em")
              .attr("transform", "rotate(-90)");
        }
        xAxisGroup.transition().duration(500).delay(600)
            .style("opacity", 1);

        this.chartGroup.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(this.y))
          .style("opacity", 0)
          .transition().duration(500).delay(600)
          .style("opacity", 1);

        const bars = this.chartGroup.selectAll(".bar")
          .data(this.data_filtered);

        bars.enter().append("rect")
          .attr("class", "bar")
          .attr("fill", "grey")
          .attr("width", this.x.bandwidth())
          .attr("x", d => this.x(d.x))
          .attr("y", this.height - this.margin.top - this.margin.bottom)
          .attr("height", 0)
          .transition().duration(500).delay(1200)
          .attr("y", d => this.y(d.count))
          .attr("height", d => this.height - this.margin.top - this.margin.bottom - this.y(d.count));

        const labels = this.chartGroup.selectAll(".label")
          .data(this.data_filtered);

        labels.enter().append("text")
          .attr("class", "label")
          .attr("x", d => this.x(d.x) + this.x.bandwidth()/2)
          .attr("y", d => this.y(d.count) - 5)
          .style("opacity", 0)
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("text-anchor", "middle")
          .text(d => d.count)
          .transition().duration(500).delay(1200)
          .style("opacity", 1);

        this.chartGroup.append("text")
          .attr("class", "title")
          .style("opacity", 0)
          .attr("font-family", "sans-serif")
          .attr("font-size", "16px")
          .attr("text-anchor", "middle")
          .attr("x", this.width/2 - 35)
          .attr("y", -40)
          .text(titleText)
          .transition().duration(500).delay(1200)
          .style("opacity", 1)
      },
    };

    // initialize
    columnChart.init();


    $('#latch-location').on('click', function() {
      if ($(this).is(':checked:not(:disabled)')) {
        updateDataTableLocation();

        columnChart.remove();
        columnChart.draw();
        columnChart.countBooksByLocation();
        columnChart.createColumns("Liczba książek w pomieszczeniach", false);
      }
    });
    $('#latch-alphabet').on('click', function() {
      if ($(this).is(':checked:not(:disabled)')) {
        updateDataTableAuthorInitial();

        columnChart.remove();
        columnChart.draw();
        columnChart.countBooksByAuthorInitial();
        columnChart.createColumns("Liczba książek / pierwsza litera nazwiska autorów", false);
      }
    });
    $('#latch-time').on('click', function() {
      if ($(this).is(':checked:not(:disabled)')) {
        updateDataTableYear();

        columnChart.remove();
        columnChart.draw();
        columnChart.countBooksByYears();
        columnChart.createColumns("Liczba książek wydanych w latach", true);
      }
    });
    $('#latch-category').on('click', function() {
      if ($(this).is(':checked:not(:disabled)')) {
        updateDataTableGenre();

        columnChart.remove();
        columnChart.draw();
        columnChart.countBooksByCategory();
        columnChart.createColumns("Liczba książek w kategoriach", false);
      }
    });
    $('#latch-hierarchy').on('click', function() {
      if ($(this).is(':checked:not(:disabled)')) {
        updateDataTablePromo();

        columnChart.remove();
        columnChart.draw();
        columnChart.countBooksByDiffPercentage();
        columnChart.createColumns("Liczba książek kupionych w promocji", false);
      }
    });
});
