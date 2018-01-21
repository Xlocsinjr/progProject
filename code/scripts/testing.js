/****

 ****/

// Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var yearIndex = slider.value;




d3.json("../../data/jsons/allData.json", function(error, data) {
  if (error) throw error;

  var bar = barChart.selectAll(".bar")
    .data(dateData)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d, i) { return "translate(" + i * rectGroupWidth + ",0)"; });


  // Gives the bar a rectangle for the minimum temperature
  bar.append("rect")
    // gives the rectangle a proper range and  domain
    .attr("x", 4)
    .attr("y", function(d) { return y(d.minimum); })

    // Set height to the temperature data.
    .attr("height", function(d) {return barHeight - y(d.minimum);})

    // Set width to barWidth - 5 to create space between bars
    .attr("width", (rectGroupWidth / 3) - 5)

    .style("fill", "steelblue")
    .on("mouseover", function(d) {
      tip.html("<div class='tip'>" + d.minimum + " \xB0C </div>")
      tip.show();
    })
    .on("mouseout", tip.hide);


  // ------------------- SLIDER UPDATE -----------------------------------------

  slider.oninput = function() {
    yearIndex = slider.value;
    updateColour(yearIndex);
    updateScatterYear(yearIndex);
  };
});
