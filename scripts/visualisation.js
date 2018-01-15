/****

 ****/



d3.json("../data/jsons/mapData.json", function(error, data) {
  if (error) throw error;

  // Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
  var slider = document.getElementById("myRange");

  // ------------------- MAP -----------------------------------------------------
  var map = new Datamap({
    element: document.getElementById('worldMap'),
    fills: {
      defaultFill: "#ABDDA4",
    }
  });


  // Colour range
  var colour = d3.scale.linear()
    .range(["white", "red"])
    .domain([0, 12500000]);


  var testjson = data;
  console.log(testjson);

  function updateColour(yearIndex) {
    map.updateChoropleth({
      USA: colour(testjson[yearIndex]["USA"]["GHG"]),
      CHN: colour(testjson[yearIndex]["CHN"]["GHG"])
    });
  };

  // Country mouseover
  // map.svg.selectAll('.datamaps-subunits').on('mouseover', function() {
  //   console.log(ting);
  // });

  var yearIndex = slider.value;
  updateColour(yearIndex);

  slider.oninput = function() {
    yearIndex = slider.value;
    updateColour(yearIndex);
  };

});
