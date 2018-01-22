/**
 * visualisation.js
 *
 * This script creates a world map and a scatterplot showing data from
 * allData.json in progProject.html.
 *
 * Author: Xander Locsin
 * StudentID: 10722432
 */

// ------------------- INITIALISATIONS -----------------------------------------

// Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var yearIndex = slider.value;

var map = new Datamap({
  element: document.getElementById('worldMap'),
  fills: {
    defaultFill: "#ABDDA4",
  },
});


function main() {
  d3.json("../../data/jsons/allData.json", function(error, data) {
    if (error) throw error;

    // ------------------- MAP -------------------------------------------------

    // Colour range
    var colourRange = d3.scale.linear()
      .range(["#ABDDA4", "red"])
      .domain([0, 12500000]);
      // 12500000 : China 2012 GHG emission

    // Initial colouring.
    updateColour(yearIndex, data, colourRange);

    // ------------------- SCATTERPLOT -----------------------------------------
    // From example: https://bost.ocks.org/mike/bar/3/

    // Sets the margins for the chart and sets the width and height.
    var margin = {top: 20, right: 30, bottom: 40, left: 40},
        width = 400 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // Sets x-axis scale for GDP.
    var x = d3.scale.log()
        .domain([0.001, 16200000.])  // World GDP 2012
        .range([0, width]);

    // Sets y-axis scale for GHG emissions.
    var y = d3.scale.log()
      .domain([0.001, 12500])  // China GHG 2012
      .range([height, 0]);

    // Defines the x-axis. Placed at the bottom.
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Defines the y-axis. Placed on the left.
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // Selects the chart in the html and gives it width, height and margins.
    var scatterPlot = d3.select(".scatterPlot")
        .attr("id", "theScatterPlot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dots = scatterPlot.append("g")
      .attr("id", "allDots");


    // Adds a g element for an X axis
    scatterPlot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "axisLabel")
        .attr("x", width)
        .attr("y", 30)
        .style("font", "11px sans-serif")
        .style("text-anchor", "end")
        .text("GDP (million US$)");

    // Adds a g element for a Y axis
    scatterPlot.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("font", "11px sans-serif")
        .style("text-anchor", "end")
        .text("total GHG emission (Mt CO2 equivalent)");


    updateScatterYear(yearIndex, data, x, y);

    // ------------------- BAR CHART -------------------------------------------

    // Sets the margins for the bar chart and sets the width and height
    var barMargin = {top: 20, right: 30, bottom: 40, left: 60},
      barWidth = 400 - barMargin.left - barMargin.right,
      barHeight = 350 - barMargin.top - barMargin.bottom;

    keysList = Object.keys(data[yearIndex]);
    var countriesCount = keysList.length;

    // Ordinal scale for the x-axis to display station names
    var barXScale = d3.scale.ordinal()
      .domain([0, countriesCount])
      .rangeRoundBands([0, barWidth], .1);

    // Linear scale to properly set the length of the bars
    var barYScale = d3.scale.linear()
      .domain([0, 12500])
      .range([barHeight, 0]);

    // Defines the x-axis. Placed at the bottom.
    var xAxis = d3.svg.axis()
      .scale(barXScale)
      .orient("bottom");

    // Defines the y-axis. Placed on the left.
    var yAxis = d3.svg.axis()
      .scale(barYScale)
      .orient("left");

    // Selects the chart in the html and gives it width, height and margins.
    var barChart = d3.select(".barChart")
        .attr("width", barWidth + barMargin.left + barMargin.right)
        .attr("height", barHeight + barMargin.top + barMargin.bottom)
      .append("g")
        .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

    // Width of bars in the chart set to width divided by number of data entries.
    var rectGroupWidth = barWidth / keysList.length;

    for (i in keysList) {
      key = keysList[i];
      countryData = data[yearIndex][key];

      barChart.selectAll(".bar")
        .append("g")
          .attr("class", "bar")
          .attr("transform", function(d, i) { return "translate(" + i * rectGroupWidth + ",0)"; })
        .append("rect")
          .attr("x", 4)
          .attr("y", countryData["energy"])

          // Set height to the temperature data.
          .attr("height", function(d) {return barHeight - countryData["energy"];})

          // Set width to barWidth - 5 to create space between bars
          .attr("width", rectGroupWidth)

          .style("fill", "steelblue");
    };

    // Adds a g element for an X axis
    barChart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + barHeight + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "axisLabel")
        .attr("x", barWidth)
        .attr("y", 35)
        .style("font", "11px sans-serif")
        .style("text-anchor", "end")
        .text("Country");

    // Adds a g element for a Y axis
    barChart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -45)
        .attr("dy", ".71em")
        .style("font", "11px sans-serif")
        .style("text-anchor", "end")
        .text("GHG emission (Mt CO2 equivalent) (\xB0C)");


    // ------------------- SLIDER UPDATE ---------------------------------------
    slider.oninput = function() {
      yearIndex = slider.value;

      // Update world map country colours.
      updateColour(yearIndex, data, colourRange);

      // Update scatterplot year data.
      updateScatterYear(yearIndex, data, x, y);
    };
  });
};

// ------------------- FUNCTIONS -----------------------------------------------

/**
 * Updates the Scatterplot to data of a different year.
 * Parameters:
 *  yearIndex: index for the year of data (1970 has index 0).
 *  data: data object from which the data is retrieved.
 *  xScale, yScale: data scales to correctly place dots in the chart.
 */
function updateScatterYear(yearIndex, data, xScale, yScale){

  // Remove all dots.
  d3.select("#theScatterPlot").selectAll(".scatterDot").remove();

  /* Iterates through all the keys (except "year") in a year and adds a dot
   * for every country */
  keysList = Object.keys(data[yearIndex]);
  for (i in keysList) {
    key = keysList[i];

    // If the key is for country data: add dot at position based on GDP and GHG.
    if (key != "year") {
      var GDPval = data[yearIndex][key]["GDP"];
      var GHGval = data[yearIndex][key]["GHG"];

      // Only place dot if both data is available.
      if ((isNaN(GDPval) != true) && (isNaN(GHGval) != true)){
        d3.select("#allDots").append("circle")
          .attr("class", "scatterDot")
          .attr("cx", xScale(GDPval / 1000000.)) // million USD
          .attr("cy", yScale(GHGval / 1000.)) // Mt CO2 eq
          .attr("r", 2);
      };
    };
  };
};

/**
 * Updates the  world map country colours to data of a different year.
 * Parameters:
 *  yearIndex: index for the year of data (1970 has index 0).
 *  data: data object from which the data is retrieved.
 */
function updateColour(yearIndex, data, colourScale) {
  updateDict = {};
  keysList = Object.keys(data[yearIndex]);
  for (i in keysList) {
    key = keysList[i];
    if (key != "year") {
      val = data[yearIndex][key]["GHG"];
      updateDict[key] = colourScale(val);
    };
  };
  map.updateChoropleth(updateDict);
};



// ------------------- WHEN LOADED ---------------------------------------------
window.onload = function() {
  main();
};
