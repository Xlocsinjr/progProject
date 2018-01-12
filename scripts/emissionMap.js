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

var yearIndex = slider.value;

slider.oninput = function() {
  yearIndex = slider.value;
  console.log(data);
};

// Colour range
var colour = d3.scale.linear()
  .range(["white", "blue"])
  .domain([0,10]);


var map = new Datamap({
  element: document.getElementById('worldMap'),
  fills: {
    defaultFill: "#ABDDA4",
  },
  data: {
    USA: { fillKey: 10 },
  },

});


// Colour range
var colour = d3.scale.linear()
  .range(["white", "blue"])
  .domain([0,10]);

window.setInterval(function() {
  map.updateChoropleth({
    USA: colour(Math.random() * 10)
  });
}, 2000);
