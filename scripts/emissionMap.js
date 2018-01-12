/****

 ****/

var fakedata = [
  [["USA", 10]],
  [["USA", 8]],
  [["USA", 4]],
  [["USA", 5]],
  [["USA", 7]]
];

console.log(fakedata[0]);

// Colour range
var colour = d3.scale.linear()
  .range(["white", "blue"])
  .domain([0,10]);

var map = new Datamap({
  element: document.getElementById('worldMap'),
  fills: {
    defaultFill: "#ABDDA4",
    // 10: "#FF0E0F",
    // 9: "FF2E2D",
    // 8: "FF4847",
    // 7: "FF6464",
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
