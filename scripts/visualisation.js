/****

 ****/


 // Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
 var slider = document.getElementById("myRange");
 var yearIndex = slider.value;


d3.json("../data/jsons/mapData.json", function(error, data) {
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
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var dots = scatterPlot.append("g");

  // Updates the Scatterplot to different data.
  function updateScatterYear(yearIndex){
    scatterPlot.selectAll(".scatterDot").remove();
    /* Iterates through all the keys (except "year") in a year and adds a dot
     * for every country */
    keysList = Object.keys(data[yearIndex]);
    for (i in keysList) {
      key = keysList[i];

      // If the key is for country data: add dot at position based on GDP and GHG.
      if (key != "year") {
        var GDPval = data[yearIndex][key]["GDP"];
        var GHGval = data[yearIndex][key]["GHG"];
        console.log(GDPval, GHGval);

        // Only place dot if both data is available.
        if ((isNaN(GDPval) != true) && (isNaN(GHGval) != true)){
          dots.append("circle")
            .attr("class", "scatterDot")
            .attr("cx", x(GDPval / 1000000.))
            .attr("cy", y(GHGval / 1000.))
            .attr("r", 2);
        };
      };
    };
  };

  updateScatterYear(yearIndex);


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

  // Adds a canvas for the Legend to the chart
  // var legend_x = 90;
  // var legend_y = height - 260;
  // var legend = scatterPlot.append("g")
  //   .append("rect")
  //   //<rect id="canvas" x="1.8" y="1.8" class="st0" width="175.1" height="291.4"/>
  //     .attr("class", "legend")
  //     .attr("x", legend_x)
  //     .attr("y", legend_y)
  //     .attr("width", 130)
  //     .attr("height", 250);
  //
  // // Adds coloured boxes to the legend
  // var legend_count = 0;
  // scatterPlot.selectAll("legend_colour")
  //   .data(data)
  //   .enter()
  //     .append("rect")
  //       .attr("class", "legend_element")
  //       .attr("x", legend_x + 10)
  //       .attr("y", function () { y_val = legend_y + 10 + 30 * legend_count;
  //         legend_count++
  //         return y_val;})
  //       .attr("width", 20)
  //       .attr("height", 20)
  //       .style("fill", function (d) {
  //         legend_count++;
  //         return q(d[0]); })
  //
  // // Adds text to the legend
  // var legend_count = 0;
  // scatterPlot.selectAll("legend_text")
  //   .data(data)
  //   .enter()
  //     .append("text")
  //       .attr("class", "legend_text")
  //       .attr("x", legend_x + 40)
  //       .attr("y", function () { y_val = legend_y + 20 + 30 * legend_count;
  //         legend_count++
  //         return y_val;})
  //       .style("text-anchor", "start")
  //       .text( function (d) {return s(d[0]); } );


  // ------------------- SLIDER UPDATE -----------------------------------------
  updateColour(yearIndex);

  slider.oninput = function() {
    yearIndex = slider.value;
    updateColour(yearIndex);
    updateScatterYear(yearIndex);
  };
});
