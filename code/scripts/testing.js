/****

 ****/


// Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
var slider = document.getElementById("myRange");
var yearIndex = slider.value;


// From https://stackoverflow.com/questions/16455194/how-to-store-a-json-object-loaded-from-a-file
// Use d3.json synchronously.
var dataSet;
$.ajax({
  dataType: "json",
  url: "../../data/jsons/mapData.json",
  async: false,
  success: function(data){dataSet = data}
});


// var dataSet;
// d3.json("../../data/jsons/mapData.json", function(error, data) {
//   if (error) throw error;
//   dataSet = data;
// });


console.log(dataSet);



function main(data) {
  // ------------------- MAP ---------------------------------------------------
  var map = new Datamap({
    element: document.getElementById('worldMap'),
  });


  // Colour range
  var colour = d3.scale.linear()
    .range(["#ABDDA4", "red"])
    .domain([0, 12500000]);
    // 12500000 : China 2012 GHG emission
};

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

// ------------------- SLIDER UPDATE -----------------------------------------
updateColour(yearIndex);

slider.oninput = function() {
  yearIndex = slider.value;
  updateColour(yearIndex);
  updateScatterYear(yearIndex);
};


window.onload = function() {
  main(dataStore);
};
