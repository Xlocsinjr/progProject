/**
 * visualisation.js
 *
 * This script creates a world map and a scatterplot showing data from
 * allData.json in progProject.html.
 *
 * Author: Xander Locsin
 * StudentID: 10722432
 */


var countries = Datamap.prototype.worldTopo.objects.world.geometries;

// ------------------- INITIALISATIONS -----------------------------------------



// Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");



// From: https://www.w3schools.com/howto/howto_js_dropdown.asp
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


// Get interactive element values.
var yearIndex = slider.value;
var sectorPlotList = getSectorChecks();
var countryPlotList = ["NLD", "USA", "CHN", "DEU", "RUS"];

// Generate world map.
var map = new Datamap({
  element: document.getElementById('worldMap'),
  fills: {
    defaultFill: "#ABDDA4",
  }
});


map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
  console.log(countryPlotList);
  // Adds the clicked country to the countryPlotList if not already in it.
  if (countryPlotList.includes(geography.id) == false) {
    countryPlotList.push(geography.id);
  };

})



// Defines the tooltip for the map. The tooltip shows GHG emission data.
map.options.geographyConfig.popupTemplate = function(geo) {
  return ['<div class="hoverinfo"><strong>',
    geo.properties.name,
    "</strong><br>",
    map.options.data[geo.id]["GHG"] + " kT CO2 equivalent",
    "<br>",
    "</div>"].join('');
};


function main() {
  d3.json("../../data/jsons/allData.json", function(error, data) {
    if (error) throw error;

    // ------------------- MAP -------------------------------------------------

    // Colour range
    var colourRange = d3.scale.log()
      .range(["#ABDDA4", "red"])
      .domain([1000, 12500000]);
      // 12500000 : China 2012 GHG emission

    // Initial colouring.
    updateMap(yearIndex, data, colourRange);



    // ------------------- SCATTERPLOT -----------------------------------------
    // From example: https://bost.ocks.org/mike/bar/3/

    // Sets the margins for the chart and sets the width and height.
    var margin = {top: 20, right: 30, bottom: 40, left: 50},
        width = 400 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // Sets x-axis scale for GDP.
    var x = d3.scale.log()
        .domain([1, 16200000.])  // World GDP 2012
        .range([0, width]);

    // Sets y-axis scale for GHG emissions.
    var y = d3.scale.log()
      .domain([1, 12500])  // China GHG 2012
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
        .attr("y", -45)
        .attr("dy", ".71em")
        .style("font", "11px sans-serif")
        .style("text-anchor", "end")
        .text("total GHG emission (Mt CO2 equivalent)");



    updateScatter(yearIndex, data, x, y, countryPlotList);

    // ------------------- BAR CHART -------------------------------------------

    // Sets the margins for the bar chart and sets the width and height
    var barMargin = {top: 20, right: 50, bottom: 40, left: 50},
      barChartWidth = 400 - barMargin.left - barMargin.right,
      barChartHeight = 350 - barMargin.top - barMargin.bottom;

    // Selects the chart in the html and gives it width, height and margins.
    var barChart = d3.select(".barChart")
        .attr("width", barChartWidth + barMargin.left + barMargin.right)
        .attr("height", barChartHeight + barMargin.top + barMargin.bottom)
      .append("g")
        .attr("class", "barChartTransform")
        .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

    updateBar(yearIndex, data, barChartWidth, barChartHeight, countryPlotList, sectorPlotList);


    // ------------------- SLIDER UPDATE ---------------------------------------
    slider.oninput = function() {
      // Update global variable yearIndex.
      yearIndex = slider.value;

      // Update all visualisations.
      updateMap(yearIndex, data, colourRange);
      updateScatter(yearIndex, data, x, y, countryPlotList);
      updateBar(yearIndex, data, barChartWidth, barChartHeight, countryPlotList, sectorPlotList);
    };

    // ------------------- SECTOR CHECKBOXES -----------------------------------
    d3.selectAll(".sectorCheck").on("change", function() {
      // Update global variable sectorPlotList.
      sectorPlotList = getSectorChecks();

      //Update barchart.
      updateBar(yearIndex, data, barChartWidth, barChartHeight, countryPlotList, sectorPlotList);
    });





    // ------------------- REMOVE COUNTRY DROPDOWN -----------------------------
    removeDropdownWriter(countryPlotList, data);

    // Adds a recursive listener for buttons in the country removal dropdown.
    function recursiveListener() {
      d3.selectAll(".removalButton").on("click", function() {
        // Recreate the dropdown list elements.
        removeDropdownWriter(countryPlotList, data);

        // Apply the listener to the new buttons.
        recursiveListener();

        // Update scatterplot and barchart.
        updateScatter(yearIndex, data, x, y, countryPlotList);
        updateBar(yearIndex, data, barChartWidth, barChartHeight, countryPlotList, sectorPlotList);
      });
    };
    recursiveListener();



    // ------------------- ADD COUNTRY MAP CLICK -------------------------------

    map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
      // Adds the clicked country to the countryPlotList if not already in it.
      if (countryPlotList.includes(geography.id) == false) {
        countryPlotList.push(geography.id);
      };

      // Recreate the dropdown list elements.
      removeDropdownWriter(countryPlotList, data);

      // Apply the listener to the new buttons.
      recursiveListener();

      // Update scatterplot and barchart.
      updateScatter(yearIndex, data, x, y, countryPlotList);
      updateBar(yearIndex, data, barChartWidth, barChartHeight, countryPlotList, sectorPlotList);
    });
  });
};








// ------------------- FUNCTIONS -----------------------------------------------



/**
 * Updates the world map country colours to data of a different year.
 * Also changes the data property of the world map so the tooltip can access
 * the GHG emission values.
 */
function updateMap(yearIndex, data, colourScale) {
  updateDict = {};
  map["options"]["data"] = {};

  keysList = Object.keys(data[yearIndex]);
  for (var i = 0; i < keysList.length; i++) {
    key = keysList[i];
    if (key != "year") {
      var val = data[yearIndex][key]["GHG"];
      updateDict[key] = colourScale(val);

      map["options"]["data"][key] = {"GHG": val};
    };
  };

  map.updateChoropleth(updateDict);
};


/**
 * Updates the Scatterplot to data of a different year.
 * Parameters:
 *  yearIndex: index for the year of data (1970 has index 0).
 *  data: data object from which the data is retrieved.
 *  xScale, yScale: data scales to correctly place dots in the chart.
 */
function updateScatter(yearIndex, data, xScale, yScale, countryPlotList) {
  // Remove all dots.
  d3.select("#theScatterPlot").selectAll(".scatterDot").remove();

  // Iterates through all the countries that need to be plotted.
  for (var i = 0; i < countryPlotList.length; i++) {
    key = countryPlotList[i];

    // If the key is for country data: add dot at position based on GDP and GHG.
    var GDPval = data[yearIndex][key]["GDP"];
    var GHGval = data[yearIndex][key]["GHG"];

    // Only place dot if both data is available.
    if ((isNaN(GDPval) != true) && (isNaN(GHGval) != true)){
      var xPos = xScale(GDPval / 1000000.);
      var yPos = yScale(GHGval / 1000.);

      var newDot = d3.select("#allDots").append("g")
          .attr("class", "scatterDot");

      newDot.append("circle")
          .attr("cx", xPos) // million USD
          .attr("cy", yPos) // Mt CO2 eq
          .attr("r", 2);

      newDot.append("text")
          .attr("x", xPos)
          .attr("y", yPos + 8)
          .style("font", "8px sans-serif")
          .text(function() { return data[yearIndex][key]["Name"];});
    };
  };
};



/**
 *
 */
function updateBar(yearIndex, data, barChartWidth, barChartHeight, countryPlotList, sectorPlotList) {
  var keysList = Object.keys(data[yearIndex]);
  var countriesCount = countryPlotList.length;

  // Gather country names.
  var countryNames = [];
  for (var i = 0; i < countriesCount; i++) {
    countryKey = countryPlotList[i];
    countryNames[i] = data[yearIndex][countryKey]["Name"];
  };

  // Ordinal scale for the x-axis to display country names.
  var barXScale = d3.scale.ordinal()
    .domain(countryNames)
    .rangeRoundBands([0, barChartWidth], .1);

  // Linear scale to properly set the length of the bars.
  var barYScale = d3.scale.log()
    .domain([1, 10000000])
    .range([0, barChartHeight]);

  // Defines the x-axis. Placed at the bottom.
  var barXAxis = d3.svg.axis()
    .scale(barXScale)
    .orient("bottom");

  // Defines the y-axis. Placed on the left.
  var barYAxis = d3.svg.axis()
    .scale(barYScale)
    .orient("left");

  // Remove all old bars and the axes.
  d3.selectAll(".barRect").remove();
  d3.selectAll(".barAxis").remove();

  // Set width of a group of bars to chart width divided by number of countries.
  var rectGroupWidth = barChartWidth / countriesCount;

  // Loop through all countries that need to be plotted.
  for (var i = 0; i < countryPlotList.length; i++) {
    plotKey = countryPlotList[i];
    countryData = data[yearIndex][plotKey];

    var barGroup = d3.select(".barChartTransform").append("g")
        .attr("class", "barRect");

    // Colour definition of the sectors.
    var sectorColour = {
      "InternationalBunkers": "808080",
      "Waste": "#606060",
      "Industry": "404040",
      "Agriculture": "orange",
      "ResidentialAndCommercial": "yellow",
      "Transport": "blue",
      "Forestry": "#007f0e",
      "LandUseSources": "#4cff00",
      "Energy": "#0094ff",
      "Other": "c0c0c0"
    };

    /**
     * Padding value definitions.
     * groupPadding is set to 2 + 5./countriesCount. So if more than 5 countries
     * have to be plotted, there'll still be at least 2 pixels to separate the
     * groups.
     */
    var groupPadding = 2 + 5./countriesCount;
    var rectPadding = 1;


    // Loop through all sectors that need to be plotted.
    for (j in sectorPlotList) {
      sectorKey = sectorPlotList[j];
      sectorBarsCount = sectorPlotList.length;

      // Only plot if data is usable.
      if (isNaN(countryData[sectorKey]) == false) {
        var rectWidth = rectGroupWidth / sectorBarsCount;

        d3.select(".barChartTransform").select(".barRect")
          .append("rect")
            .attr("class", "barRect")
            .attr("x", (i * (rectGroupWidth + groupPadding)) + (j * rectWidth) + groupPadding)
            .attr("y", barChartHeight - barYScale(Math.abs(countryData[sectorKey])))
            .attr("height", barYScale(Math.abs(countryData[sectorKey])))
            .attr("width", rectWidth - rectPadding)
            .style("fill", sectorColour[sectorKey]);
      };
    };

  };

  // Adds a g element for an X axis
  d3.select(".barChartTransform").append("g")
      .attr("class", "barAxis")
      .attr("transform", "translate(0," + barChartHeight + ")")
      .call(barXAxis)
    .append("text")
      .attr("class", "axisLabel")
      .attr("x", barChartWidth)
      .attr("y", 30)
      .style("font", "11px sans-serif")
      .style("text-anchor", "end")
      .text("Country");

  // Adds a g element for a Y axis
  d3.select(".barChartTransform").append("g")
      .attr("class", "barAxis")
      .call(barYAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("dy", ".71em")
      .style("font", "11px sans-serif")
      .style("text-anchor", "end")
      .text("GHG emission (Mt CO2 equivalent) (\xB0C)");
};


/**
 *
 */
function getSectorChecks() {
  var plotList = [];
  plotList = getBoxCheck(plotList, "box1");
  plotList = getBoxCheck(plotList, "box2");
  plotList = getBoxCheck(plotList, "box3");
  plotList = getBoxCheck(plotList, "box4");
  plotList = getBoxCheck(plotList, "box5");
  plotList = getBoxCheck(plotList, "box6");
  plotList = getBoxCheck(plotList, "box7");
  plotList = getBoxCheck(plotList, "box8");
  plotList = getBoxCheck(plotList, "box9");
  plotList = getBoxCheck(plotList, "box10");
  return plotList;

};

/**
 *
 */
function getBoxCheck(plotList, id) {
  var pushedPlot = plotList;
  var checkbox = document.getElementById(id);
  if (checkbox.checked == true) {
    pushedPlot.push(checkbox.value);
  };
  return pushedPlot;
};


/**
 *
 */
function removeDropdownWriter(countryPlotList, data) {
  // Clears the div.
  document.getElementById("myDropdown").innerHTML = "";

  // Creates a button for every country in countryPlotList.
  for (var i = 0; i < countryPlotList.length; i++) {
    var countryCode = countryPlotList[i];
    var country = data[0][countryCode]["Name"];

    document.getElementById("myDropdown").innerHTML += (
      "<button type=\"button\""
      + " id=\"removal" + i + "\""
      + " class=\"removalButton\""
      + "onclick=\'countryRemove(\"" + countryCode + "\")\'"
      + " value=\'" + countryCode + "\'>"
      + country
      + "</button>"
      + "<br> \0"
    );
  };
};

/**
 * Removes a countrycode from a countryPlotList by duplicating each element in
 * countryPlotList except the one that had to be removed. Updates global
 * variable countryPlotList.
 * To be used by the buttons in the removal dropdown menu.
 */
function countryRemove(removeCode) {
  var newPlotList = [];
  for (var i = 0; i < countryPlotList.length; i++) {
    var duplicate = countryPlotList[i];
    if (duplicate != removeCode) {
      newPlotList.push(duplicate);
    };
  };
  countryPlotList = newPlotList;
};



// ------------------- WHEN LOADED ---------------------------------------------
window.onload = function() {
  main();
};
