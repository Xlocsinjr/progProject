# Final report
## Description
The page aims to visualise the world's greenhouse gas (GHG) emissions from 1970
to 2012 and how these emissions relate to a country's GDP.

## Design
### Scripts
#### convertCSV2JSON
A script to convert a datasource to json in python.

#### visualisations.js
A script to create the graphs for progProject.html
- The script first initialises the interactive elements and defines some
global variables.
- Functions are then defined.
- Then data is loaded in and the charts are created.
- The "to plot" lists/variables that define what gets shown in the plots are
global variables. These are:
  - yearIndex: index to determine of which year the data is shown.
  - countryPlotList: A list to determine which countries are shown in the
  scatter plot and the bar chart.
  - sectorPlotList: A list to determine which sectors are shown in the bar
  chart.
- Every interactive element, except the scatterplot y axis change, will change a
 "to plot" variable in some way. When these elements are manipulated the
relevant global "to plot" variables are updated, after which the relevant
viualisations are updated.

### Python functions
- function valueTest checks if a given value can be converted to float to ensure
it is a number.
- function getData retrieves all relevant information from allData.json.

### JavaScript functions
- All functions are defined in visualisations.js.
- Every interactive element updates the global "to plot" variables, immediately
thereafter the relevant visualisations are updated.
- Every visualisation has an update function which removes and recreates a chart
based on the global "to plot" variables.


- function minMaxFinder finds the minimum and maximum value of the GDP, the GHG
emissions and the GHG emissions per sector in the data. This function returns
the minima and maxima in a list.
- function changeYearTexts changes the mentions of the year in text to an other
year.
- function updateMap: This function updates the world map's country's colours
and the datamaps data to data of an other year.
- function updateScatter: This function updates the scatter plot to data
of a different year, and for different selections of countries.
- function updateBar updates the bar chart to different selections of year,
countries and sectors.
- function getSectorChecks creates a list of the elements checked in the sector
selection checkbox menu/legend.
- function getBoxCheck checks if a specific box is checked. This function is
used by getSectorChecks.
- function removeDropdownWriter clears the dropdown buttons to remove countries
and remakes the list with a different selection of countries.
- function countryRemove removes a country from the "to plot" list.

## Developments
