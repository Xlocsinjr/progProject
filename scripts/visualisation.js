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
      NAV: "black"
    }
  });


  // Colour range
  var colour = d3.scale.linear()
    .range(["#ABDDA4", "red"])
    //.domain([0, 12500000]);
    .domain([0, 1000000]);


  console.log(data);

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
