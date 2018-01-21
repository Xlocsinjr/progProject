/****

 ****/


// Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var yearIndex = slider.value;


function main(){
  d3.json("../../data/jsons/allData.json", function(error, data) {
    if (error) throw error;

    // ------------------- MAP ---------------------------------------------------
    var map = new Datamap({
      element: document.getElementById('worldMap'),
      fills: {
        defaultFill: "#ABDDA4",
      },
    });


    // Colour range
    var colour = d3.scale.linear()
      .range(["#ABDDA4", "red"])
      .domain([0, 12500000]);
      // 12500000 : China 2012 GHG emission

    function updateColour(yearIndex) {
      updateDict = {};
      keysList = Object.keys(data[yearIndex]);
      for (i in keysList) {
        key = keysList[i];
        if (key != "year") {
          val = data[yearIndex][key]["GHG"];
          updateDict[key] = colour(val);
        };
      };
      map.updateChoropleth(updateDict);
    };

    // ------------------- SCATTERPLOT -------------------------------------------
    // From example: https://bost.ocks.org/mike/bar/3/

    // Sets the margins for the chart and sets the width and height.
    var margin = {top: 20, right: 30, bottom: 40, left: 40},
        width = 900 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // Sets x-axis scale for GDP.
    var x = d3.scale.linear()
        .domain([0, 16200000.])  // World GDP 2012
        .range([0, width]);

    // Sets y-axis scale for GHG emissions.
    var y = d3.scale.linear()
      .domain([0, 12500])  // China GHG 2012
      .range([height, 0]);

    // Defines the x-axis. Placed at the bottom.
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Defines the y-axis. Placed on the left.
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // Selects the chart in the html and gives it width and height including margins
    var scatterPlot = d3.select(".scatterPlot")
        .attr("id", "theScatterPlot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dots = scatterPlot.append("g")
      .attr("id", "allDots");

    updateScatterYear(yearIndex, data, x, y);


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


    // ------------------- SLIDER UPDATE -----------------------------------------
    updateColour(yearIndex);

    slider.oninput = function() {
      yearIndex = slider.value;
      updateColour(yearIndex);
      updateScatterYear(yearIndex, data, x, y);
    };
  });
};

// ------------------- Functions -----------------------------------------

// Updates the Scatterplot to different data.
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



// ------------------- WHEN LOADED -----------------------------------------
window.onload = function(){
  main();
}
