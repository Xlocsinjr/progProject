/****

 ****/

var fakedata = [
  [["USA", 10], ["CHN", 8]],
  [["USA", 8], ["CHN", 7]],
  [["USA", 4], ["CHN", 6]],
  [["USA", 5], ["CHN", 7]],
  [["USA", 7], ["CHN", 8]]
];

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
  .domain([0, 10]);


function updateColour(yearIndex) {
  map.updateChoropleth({
    USA: colour(fakedata[yearIndex][0][1]),
    CHN: colour(fakedata[yearIndex][1][1])
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
