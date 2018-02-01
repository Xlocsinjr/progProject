# Design  

### Data
##### Data sources
- http://di.unfccc.int/time_series.
From this link all relevant data can be found but only for the UN nations.
Time series data for every type of greenhouse gas and emissions per sector
for UN countries can be found here.

- http://edgar.jrc.ec.europa.eu/overview.php?v=42FT2012
This link leads to data for GHG emissions in a larger number of countries but
only includes the time series for CO2, CH4, N2O and F-gasses but no information
on emission source. The same datasets are also available with emission per
capita and per GDP for every country.

- https://data.worldbank.org/indicator/NY.GDP.MKTP.CD
From this link, time series data for GDP for countries over the years can be
found.

- https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions#emissions-by-sector
At emissions by sector. Here a data file can be found for GHG emission for
countries mostly in the years 1990 to 2010. Some countries do have data for
years outside this range but then it is only for certain sectors.

##### Data reworking
The data for GHG emissions is given in excel files (.xlsx).
For CO2 the data is given in kilotons (kt) and for the other gasses
in equivalent kilotons of CO2 (kt CO2 equivalent).

The data for the GDP is a csv, which can be directly read by d3, but could first
be converted to a json.

All data sources should be trimmed to only contain the relevant data. Then the
data files can be saved as .csv after which a script can create usable jsons for
the visualisations.

All relevant data will be collected into a single json file: allData.json.

##### json structure
```
[
  {
    year: 1970,
    countryCode:  
    {
      Name: Country name
      GDP: value USD,
      GHG: value kt CO2 equivalent
      sector1: value kt CO2 equivalent,
      sector2: value kt CO2 equivalent,
      ... other sectors ...
    },
    countryCode:
    {
      Name: Country name
      GDP: value USD,
      GHG: value kt CO2 equivalent
      sector1: value kt CO2 equivalent,
      sector2: value kt CO2 equivalent,
      ... other sectors ...
    }
  }
 {
   {
     year: 1971,
     countryCode:  
     {
       Name: Country name
       GDP: value USD,
       GHG: value kt CO2 equivalent
       sector1: value kt CO2 equivalent,
       sector2: value kt CO2 equivalent,
       ... other sectors ...
     },
     countryCode:
     {
       Name: Country name
       GDP: value USD,
       GHG: value kt CO2 equivalent
       sector1: value kt CO2 equivalent,
       sector2: value kt CO2 equivalent,
       ... other sectors ...
     }
   }
 }
... etc
]
```

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


### Design diagram
![](doc/designSketch.png)

### Possible required plugins
- python
- D3
- D3 tooltip
- topojson
- datamaps
