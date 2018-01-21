/****

 ****/
 var map = new Datamap({
 element: document.getElementById('worldMap'),
 fills: {
   defaultFill: "#ABDDA4",
 },
});


// // Copied from https://www.w3schools.com/howto/howto_js_rangeslider.asp
// var slider = document.getElementById("myRange");
// var yearIndex = slider.value;
//
//
// d3.json("../../data/jsons/mapData.json", function(error, data) {
//   if (error) throw error;
//
//   // ------------------- MAP ---------------------------------------------------
//   var map = new Datamap({
//     element: document.getElementById('worldMap'),
//     fills: {
//       defaultFill: "#ABDDA4",
//     },
//   });
//
//
//   // Colour range
//   var colour = d3.scale.linear()
//     .range(["#ABDDA4", "red"])
//     .domain([0, 12500000]);
//     // 12500000 : China 2012 GHG emission
//
//   function updateColour(yearIndex) {
//     updateDict = {};
//     keysList = Object.keys(data[yearIndex]);
//     for (i in keysList) {
//       key = keysList[i];
//       if (key != "year") {
//         val = data[yearIndex][key]["GHG"];
//         updateDict[key] = colour(val);
//       };
//     };
//     map.updateChoropleth(updateDict);
//   };
//
//   // ------------------- SLIDER UPDATE -----------------------------------------
//   updateColour(yearIndex);
//
//   slider.oninput = function() {
//     yearIndex = slider.value;
//     updateColour(yearIndex);
//     updateScatterYear(yearIndex);
//   };
// });
