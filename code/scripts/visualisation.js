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
// Looks for the slider in the document.
var slider = document.getElementById("myRange");


// From: https://www.w3schools.com/howto/howto_js_dropdown.asp
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownToggle() {
    document.getElementById("myDropdown").classList.toggle("show");
}


// Get interactive element values.
var yearIndex = slider.value;
var sectorPlotList = getSectorChecks();
var countryPlotList = ["NLD", "USA", "CHN", "DEU", "RUS"];
var YChecked = document.getElementById("YCheck").checked;

// Generate world map.
var map = new Datamap({
  element: document.getElementById('worldMap'),
  fills: {
    defaultFill: "#ABDDA4",
  }
});



// Defines the tooltip for the map. The tooltip shows GHG emission data.
map.options.geographyConfig.popupTemplate = function(geo) {
  return ['<div class="hoverinfo"><strong>',
    geo.properties.name,
    "</strong><br>",
    map.options.data[geo.id]["GHG"] + " kT CO2 equivalent",
    "<br>",
    "</div>"].join('');
};


// Colour definition of the sectors.
var sectorColour = {
  "InternationalBunkers": "#a6cee3",
  "Waste": "#1f78b4",
  "Industry": "#b2df8a",
  "Agriculture": "#33a02c",
  "ResidentialAndCommercial": "#fb9a99",
  "Transport": "#e31a1c",
  "Forestry": "#fdbf6f",
  "LandUseSources": "#ff7f00",
  "Energy": "#cab2d6",
  "Other": "#6a3d9a"
};




function main() {
  d3.json("../../data/jsons/allData.json", function(error, data) {
    if (error) throw error;

    // Find minimum and maximum values of GHG emission, GDP and Sector emission.
    var minMaxList = minMaxFinder(data);
    var minGHG = minMaxList[0];
    var maxGHG = minMaxList[1];
    var minGDP = minMaxList[2];
    var maxGDP = minMaxList[3];
    var minSector = minMaxList[4];
    var maxSector = minMaxList[5];

    // ------------------- MAP -------------------------------------------------

    // Colour range.
    var colourRange = d3.scale.log()
      .range(["#ABDDA4", "red"])
      .domain([1000, maxGHG]);

    // Initial colouring.
    updateMap(yearIndex, data, colourRange);

    var mapLegendWidth = 20;
    var mapLegendHeight = 200;

    // Legend colour range.
    var legendColourRange = d3.scale.linear()
      .range(["#ABDDA4", "red"])
      .domain([0, mapLegendHeight]);

    // Creates an inner g element (as to create margins).
    var mapLegend = d3.select("#mapLegend").append("svg")
        .attr("id", "mapLegendSVG")
      .append("g")
        .attr("id", "mapLegendInner")
        .attr("transform", "translate(5, 0)");

    // Create a g element for the colour gradient bar.
    var mapLegendPixelWidth = d3.select("#mapLegend").select("#mapLegendInner")
      .append("g")
        .attr("id", "mapLegendPixelWidth");

    // Create a colour gradient by stacking 2px height rectangles.
    for (var i = 0; i < mapLegendHeight; i++) {
      mapLegendPixelWidth.append("rect")
        .attr("width", mapLegendWidth)
        .attr("height", 2)
        .attr("y", mapLegendHeight - i - 2)
        .style("fill", legendColourRange(i));
    };

    // Defines scale and axis for the legend.
    var mapLegendScale = d3.scale.log()
      .domain([1000, maxGHG])
      .range([mapLegendHeight, 0]);

    var mapLegendAxis = d3.svg.axis()
      .scale(mapLegendScale)
      .orient("right");

    // Creates a g element for the legend axis.
    mapLegend.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(20, 0)")
        .call(mapLegendAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 35)
        .attr("dy", ".71em")
        .style("font", "11px sans-serif")
        .style("text-anchor", "end")
        .text("GHG emission (kt CO2 equivalent)");


    // ------------------- SCATTERPLOT -----------------------------------------

    // Sets the margins for the chart and sets the width and height.
    var margin = {top: 30, right: 40, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;

    // Sets x-axis scale for GDP.
    var x = d3.scale.log()
        .domain([minGDP, maxGDP])
        .range([0, width]);

    // Defines the x-axis. Placed at the bottom.
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Selects the chart in the html and gives it width, height and margins.
    var scatterPlot = d3.select(".scatterPlot")
        .attr("id", "theScatterPlot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("id", "scatterTransform")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Adds a g element for an X axis
    scatterPlot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "axisLabel")
        .attr("x", width)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text("GDP (USD)");

    updateScatter(yearIndex, data, height, minGHG, maxGHG, x, countryPlotList, YChecked);

    // ------------------- BAR CHART -------------------------------------------

    // Sets the margins for the bar chart and sets the width and height
    var barMargin = {top: 30, right: 20, bottom: 100, left: 50},
      barChartWidth = 820 - barMargin.left - barMargin.right,
      barChartHeight = 350 - barMargin.top - barMargin.bottom;

    // Selects the chart in the html and gives it width, height and margins.
    var barChart = d3.select(".barChart")
        .attr("width", barChartWidth + barMargin.left + barMargin.right)
        .attr("height", barChartHeight + barMargin.top + barMargin.bottom)
      .append("g")
        .attr("class", "barChartTransform")
        .attr("transform", "translate(" + barMargin.left + "," + barMargin.top + ")");

    updateBar(yearIndex, data, barChartWidth, barChartHeight, maxSector, countryPlotList, sectorPlotList);

    // ------------------- SLIDER UPDATE ---------------------------------------

    // Initial year display.
    changeYearTexts(yearIndex);


    slider.oninput = function() {
      // Update global variable yearIndex.
      yearIndex = slider.value;

      // Update all visualisations.
      updateMap(yearIndex, data, colourRange);
      updateScatter(yearIndex, data, height, minGHG, maxGHG, x, countryPlotList, YChecked);
      updateBar(yearIndex, data, barChartWidth, barChartHeight, maxSector, countryPlotList, sectorPlotList);

      // Update year indicators in the html.
      changeYearTexts(yearIndex);
    };

    // ------------------- SECTOR CHECKBOXES -----------------------------------

    // Adds a listener for change on all sector check boxes.
    d3.selectAll(".sectorCheck").on("change", function() {
      // Update global variable sectorPlotList.
      sectorPlotList = getSectorChecks();

      //Update barchart.
      updateBar(yearIndex, data, barChartWidth, barChartHeight, maxSector, countryPlotList, sectorPlotList);
    });

    // Add coloured boxes to the legend / checkbox list.
    var boxes = document.getElementsByClassName("legendBox");
    var sectorKeys = Object.keys(sectorColour);

    // Applies the correct background color for the boxes for the legend.
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      box.style["background-color"] = sectorColour[sectorKeys[i]];
    }



    // ------------------- REMOVE COUNTRY DROPDOWN -----------------------------

    // Form the dropdown buttons.
    removeDropdownWriter(countryPlotList, data);

    // Adds a recursive listener for buttons in the country removal dropdown.
    function recursiveListener() {
      d3.selectAll(".removalButton").on("click", function() {
        // Recreate the dropdown list elements.
        removeDropdownWriter(countryPlotList, data);

        // Apply the listener to the new buttons.
        recursiveListener();

        // Update scatterplot and barchart.
        updateScatter(yearIndex, data, height, minGHG, maxGHG, x, countryPlotList, YChecked);
        updateBar(yearIndex, data, barChartWidth, barChartHeight, maxSector, countryPlotList, sectorPlotList);
      });
    };
    recursiveListener();


    // ------------------- ADD COUNTRY MAP CLICK -------------------------------

    // Adds a listener for clicking to the countries in the map.
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
      updateScatter(yearIndex, data, height, minGHG, maxGHG, x, countryPlotList, YChecked);
      updateBar(yearIndex, data, barChartWidth, barChartHeight, maxSector, countryPlotList, sectorPlotList);
    });


    // ------------------- SCATTER PLOT Y AXIS CHANGE --------------------------

    // Adds a listener for clicking that changes the y axis of the scatter plot.
    document.getElementById("YCheck").onclick = function () {
      // Update the global variable that tracks if the checkbox is checked.
      YChecked = document.getElementById("YCheck").checked;

      // Updates the scatterplot.
      updateScatter(yearIndex, data, height, minGHG, maxGHG, x, countryPlotList, YChecked);
    };
  });

};








// ------------------- FUNCTIONS -----------------------------------------------

/**
 * Finds the minimum and maximum value of the GDP, the GHG emissions and from
 * the GHG emissions of all sectors.
 */
function minMaxFinder(data){
  var minGDP = 100000000000000;
  var maxGDP = 0;
  var minGHG = 100000000000000;
  var maxGHG = 0;
  var minSector = 100000000000000;
  var maxSector = 0;

  for (var i = 0; i < data.length; i++) {
    var yearData = data[i];
    var yearKeys = Object.keys(yearData);

    // Iterate through all keys of year data.
    for (var j = 0; j < yearKeys.length; j++) {
      var key = yearKeys[j];

      // Only check key if continuing to country data.
      if (key != "year") {
        var countryData = yearData[key];
        var countryKeys = Object.keys(countryData);

        // Iterate through all keys of country data.
        for (var k = 0; k < countryKeys.length; k++) {
          var countryKey = countryKeys[k];

          // Only check if continuing to datavalues.
          if (countryKey != "Name") {
            var dataValue = countryData[countryKey];

            // Only continue if data is available.
            if (dataValue != "NAV") {

              // Check min and max for GHG emissions.
              if (countryKey == "GHG") {
                if (dataValue < minGHG) {
                  minGHG = dataValue;
                };
                if (dataValue > maxGHG) {
                  maxGHG = dataValue;
                };
              }

              // Check min and max for GDP.
              else if (countryKey == "GDP") {
                if (dataValue < minGDP) {
                  minGDP = dataValue;
                };
                if (dataValue > maxGDP) {
                  maxGDP = dataValue;
                };
              }

              // Check min and max for sector GHG emissions.
              else {
                if (Math.abs(dataValue) < minSector) {
                  minSector = Math.abs(dataValue);
                };
                if (Math.abs(dataValue) > maxSector) {
                  maxSector = Math.abs(dataValue);
                };
              }
            };
          };
        };
      };
    };
  };
  var resultList = [minGHG, maxGHG, minGDP, maxGDP, minSector, maxSector];
  return resultList;
};


/**
 * Changes text mentions of the year the data is showing to the correct year.
 */
function changeYearTexts(yearIndex) {
  var yearTexts = d3.selectAll(".yearText")
  for (var i = 0; i < yearTexts[0].length; i++) {
    yearTexts[0][i].innerHTML = parseInt(yearIndex) + 1970;
  };
};



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
function updateScatter(yearIndex, data, height, min, max, xScale, countryPlotList, YChecked) {
  // Magic number to convert Megaton to Kilogram.
  var ktToKg = 1000000;

  var scatterPlot = d3.select("#theScatterPlot").select("#scatterTransform");

  // Form data dictionary.
  var plotData = [];
  for (var i = 0; i < countryPlotList.length; i++) {
    var valuesDict = {};
    key = countryPlotList[i];

    var GDPval = data[yearIndex][key]["GDP"];
    var GHGval = data[yearIndex][key]["GHG"];

    valuesDict["GDP"] = GDPval;
    valuesDict["GHG"] = GHGval;
    valuesDict["Name"] = data[yearIndex][key]["Name"];

    // Only register if both GDP and GHG data is available.
    if ((isNaN(GDPval) != true) && (isNaN(GHGval) != true)){
      plotData.push(valuesDict);
    };
  };

  // Remove all dots, the y axis and the title.
  d3.select("#theScatterPlot").selectAll(".scatterDotCircle").remove();
  d3.select("#theScatterPlot").selectAll(".scatterDotText").remove();
  d3.select("#theScatterPlot").select("#scatterYAxis").remove();
  d3.select("#theScatterPlot").select("#scatterTitle").remove();

  // Create chart title.
  var scatterTitle = scatterPlot.append("text")
    .attr("class", "title")
    .attr("id", "scatterTitle")
    .attr("x", 20)
    .attr("y", -10);

  // Different title depending on if the y axis change checkbox is checked.
  if (YChecked == false) {
    scatterTitle.text(
      "GHG emissions and GDP of countries in the year "
      + (parseInt(yearIndex) + 1970)
    );
  };
  if (YChecked == true) {
    scatterTitle.text(
      "GHG per GDP and GDP of countries in the year "
      + (parseInt(yearIndex) + 1970)
    );
  };

  // Define and call the tooltip.
  var scatterTip = d3.tip()
    .attr("class", "chartToolTip");
  scatterPlot.call(scatterTip);

  var yScale;
  var yAxis;

  // Define y axis scale and axis depending on if the checkbox was checked.
  if (YChecked == false) {
    yScale = d3.scale.log()
      .domain([min, max])
      .range([height, 0]);

    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
  };
  if (YChecked == true) {
    yScale = d3.scale.log()
      .domain([0.001, 1000])
      .range([height, 0]);

    yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");
  };


  // Adds a dot for every country.
  scatterPlot.selectAll(".scatterDot")
  .data(plotData)
  .enter()
  .append("circle")
    .attr("class", "scatterDotCircle")
    .attr("cx", function(d) { return xScale(d["GDP"]); })
    .attr("cy", function(d) {
      if (YChecked == true) { return (yScale((d["GHG"] / d["GDP"])* ktToKg) ); };
      if (YChecked == false) { return (yScale(d["GHG"])); };
    })
    .attr("r", 4)

    // Shows and hides the tooltip.
    .on("mouseover", function(d) {
      if (YChecked == true) {
        scatterTip.html(
          "<div class='chartToolTipText'>"
          + "<span class='tipTitle'>" + d["Name"] + "</span><br>"
          + "emission/GDP: " + (d["GHG"] / d["GDP"]) * ktToKg
          + " Kg CO2 equivalent / USD) <br>"
          + "GDP: " + d["GDP"] + " USD </div>"
        );
      };
      if (YChecked == false) {
        scatterTip.html(
          "<div class='chartToolTipText'>"
          + "<span class='tipTitle'>" + d["Name"] + "</span><br>"
          + "GHG emission: " + d["GHG"]
          + " kt CO2 equivalent <br>"
          + "GDP: " + d["GDP"] + " USD </div>"
        );
      };
      scatterTip.show();
    })
    .on("mouseout", scatterTip.hide);


  // Adds a dot for every country.
  scatterPlot.selectAll(".scatterDotText")
  .data(plotData)
  .enter()
  .append("text")
    .attr("class", "scatterDotText")
    .attr("x", function(d) { return xScale(d["GDP"]) + 3; })
    .attr("y", function(d) {
      if (YChecked == true) {
        return (yScale((d["GHG"] / d["GDP"]) * ktToKg) ) + 8;
       };
      if (YChecked == false) {
        return (yScale(d["GHG"]) + 8);
      };
    })
    .style("font", "8px sans-serif")
    .text(function(d) { return d["Name"];});;

  // Adds a g element for a Y axis
  var yAxisElement = scatterPlot.append("g")
      .attr("id", "scatterYAxis")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("id", "yAxisLabelText")
      .attr("y", -45)
      .attr("dy", ".71em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end");

  // Different y axis label depending on if the checkbox is checked.
  if (YChecked == false) {
    d3.select("#yAxisLabelText")
      .text("total GHG emission (kt CO2 equivalent)");
  };
  if (YChecked == true) {
    d3.select("#yAxisLabelText")
      .text("GHG emission per GDP (Kg CO2 equivalent / USD)");
  };
};


/**
 * Recreates the bar chart with a selection of sectors to plot, a selection of
 * countries to plot and on a specific year.
 */
function updateBar(yearIndex, data, barChartWidth, barChartHeight, YUpper, countryPlotList, sectorPlotList) {
  var keysList = Object.keys(data[yearIndex]);
  var countriesCount = countryPlotList.length;
  var sectorBarsCount = sectorPlotList.length;


  // Form data dictionary and a list of country names.
  var plotData = [];
  var countryNames = [];
  for (var i = 0; i < countryPlotList.length; i++) {
    key = countryPlotList[i];

    var countryName = data[yearIndex][key]["Name"];

    countryNames.push(countryName);

    for (var j = 0; j < sectorPlotList.length; j++) {
      var sectorKey = sectorPlotList[j];

      var valuesDict = {};
      valuesDict["country"] = countryName;
      valuesDict["sectorKey"] = sectorKey;
      valuesDict["sectorEmission"] = data[yearIndex][key][sectorKey];
      valuesDict["countryIndex"] = i;
      valuesDict["sectorIndex"] = j;

      plotData.push(valuesDict);
    };
  };

  // Initialise tooltip.
  var barTip = d3.tip()
    .attr("class", "chartToolTip");

  var barChart = d3.select(".barChartTransform");

  barChart.call(barTip);


  // Ordinal scale for the x-axis to display country names.
  var barXScale = d3.scale.ordinal()
    .domain(countryNames)
    .rangeRoundBands([0, barChartWidth], .1);

  // Linear scale to properly set the length of the bars.
  var barYScale = d3.scale.log()
    .domain([0.001, YUpper])
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



  /**
   * Padding value definitions.
   * groupPadding defines the space before and after a group of bars.
   * rectPadding defines the space between individual bars.
   */
  var groupPadding = 2 + 5 * (6./countriesCount);
  var rectPadding = 1;

  // Set width of a group of bars to chart width divided by number of countries.
  var rectGroupWidth = barChartWidth / countriesCount;
  var rectWidth = (rectGroupWidth - 2 * groupPadding) / sectorBarsCount;

  barChart.selectAll(".barRect")
    .data(plotData)
    .enter()
    .append("rect")
      .attr("class", "barRect")

      // Sets x based on which country and sector is plotted.
      .attr("x", function(d) {
        return (d["countryIndex"] * rectGroupWidth + groupPadding) + d["sectorIndex"] * rectWidth;
      })

      // Sets y based on the GHG emission. Set to 0 if emission is 0 or NaN.
      .attr("y", function(d) {
        // Plot by scale if not 0, else set y to 0.
        var value = Math.abs(d["sectorEmission"]);
        if (value != 0 && isNaN(value) != true) {
          return barChartHeight - barYScale(value);
        }
        else { return 0; }
      })

      // Sets height based on which country and sector is plotted.
      .attr("height", function(d) {

        // Plot by scale if not 0 or NaN, else set height to 0.
        var value = Math.abs(d["sectorEmission"]);
        if (value != 0 && isNaN(value) != true) { return barYScale(value); }
        else { return 0; }
      })

      .attr("width", rectWidth - rectPadding)
      .style("fill", function(d) { return sectorColour[d["sectorKey"]]; })

      // Shows and hides the tooltip.
      .on("mouseover", function(d) {
        barTip.html(
          "<div class='chartToolTipText'>"
          + "<span class='tipTitle'>" + d["country"] + "</span><br>"
          + "Sector: " + d["sectorKey"] + "<br>"
          + "GHG emission: " + d["sectorEmission"] + " kt CO2 equivalent </div>"
        )
        barTip.show();
      })
      .on("mouseout", barTip.hide);


  // Adds a g element for an X axis
  d3.select(".barChartTransform").append("g")
      .attr("class", "barAxis")
      .attr("id", "barXAxis")
      .attr("transform", "translate(0," + barChartHeight + ")")
      .call(barXAxis)
    .append("text")
      .attr("class", "axisLabel")
      .attr("x", barChartWidth)
      .attr("y", 30)
      .style("font", "11px sans-serif")
      .style("text-anchor", "start")
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
      .text("GHG emission (kt CO2 equivalent)");

  d3.select(".barChartTransform").select("#barXAxis").selectAll("text").style("text-anchor", "start");
};


/**
 * Checks all boxes related to the sector selection for the bar chart and
 * forms a "to plot" list to be used by the bar chart.
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
 * Checks if a specific box is checked and adds it to the "to plot" list if it
 * is.
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
 * Renews the menu from the dropdown to the show removal buttons for a new
 * selection of countries.
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
