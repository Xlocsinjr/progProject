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
data files can be saves as .csv after which a script can create usable jsons for
the visualisations.

For the world map GHG emissions: China dominates with their high GHG emission
which means all other countries are barely coloured.

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

###### Grouped bar chart
- Bars will be grouped by country


### Scripts and functions
##### Scripts
- convertCSV2JSON: A script to convert a datasource to json in python.
- visualisations.js: A script for the graphs in JavaScript
##### Python functions
- function valueTest checks if a given value can be converted to float to ensure
it is a number.
- function getData retrieves all relevant information from allData.json.
##### JavaScript functions
- NOTE: All functions are defined in visualisations.js.
- NOTE: every interactive element will have its own update function
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
