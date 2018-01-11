/****

 ****/

var fakedata = {
  {USA: [20, 2, 4, 6, 8, 75]},
  {JPN: [15, 5, 2, 2, 6, 70]},
  {DEU: [10, 2, 4, 2, 2, 70]},
  {AUS: [10, 4, 4, 1, 1, 60]}
};

function colorCoder(dataset){
  var coder = {};
  dataset.forEach(function (d){
    var country = d.
  });
};

var map = new Datamap({
  element: document.getElementById('worldMap'),
  fills: {
    defaultFill: "#ABDDA4",
    10: "#FF0E0F",
    9: "FF2E2D",
    8: "FF4847",
    7:: "FF6464",
  },
  data: fakedata,

});
