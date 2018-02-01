# Readme
## Link
https://xlocsinjr.github.io/progProject/code/HTML/progProject.html
## Problem
Relate the greenhouse gas emissions of the world by emission source and country
GDP.

## Solution
Visualisation for greenhouse gas emission by country over time, greenhouse gas
emission by source, and the greenhouse gas emission for a country's GDP.

#### Features
- Chart 1: The greenhouse gas emission by country over time. This can be
visualized by a map chart coloring the countries by either their
total greenhouse gas emission, the greenhouse gas emission per capita or the
greenhouse gas emission per GDP.

- Chart 2: The greenhouse gas emission by source (economic sector).
This can be visualised by a grouped bar chart.

- Chart 3: A scatterplot relating a country's GDP to its GHG emissions. This
chart shows GDP on the x-axis and GHG emission or GHG emission per GDP on the
y-axis. Each dot will be labeled with the country's name.

- The time element of the charts is made interactive by having the user have
control over a slider that determines which data of a year will be shown.

- In chart 1 (world map), a tooltip will show a country's true data value.
This will allow the user to get to know the exact data value of emission for a
country instead of having to guess it off the colour in the legend.

- Via an interactive element the user could switch the y axis between total
GHG emission and GHG emission per GDP in chart 3 (scatterplot).

- Clicking countries on the world map will show data for those
countries in the other charts. In a menu to the side, these countries can
be removed from the charts. This menu can also be a dropdown menu.

- (optional) Via a bullet-point selection the user can choose which continent
is shown in chart 1. The user will then have the option to "zoom in" to
a particular continent.

- (optional) Via checkboxes the user can choose which of the sectors will be
shown in chart 2 (grouped barchart). This will make comparing a sector from
different countries easier.



#### Screenshot
![](doc/finalProjectScreenshot.png)

## Prerequisites
#### Data sources links
- http://edgar.jrc.ec.europa.eu/overview.php?v=CO2ts1990-2015#
- http://di.unfccc.int/time_series
 (multiple data sources. Can be used for emission per sector)
- https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions#emissions-by-sector
- https://data.worldbank.org/indicator/NY.GDP.MKTP.CD

#### External components
- All visualisations are created by a javascript script. This script is loaded in
by the html.
- Datamaps is used for the world map: http://datamaps.github.io/
- All visualisations are created with d3.
  - d3: https://d3js.org/d3.v3.min.js
  - d3-tip: https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js
  - d3 topojson: https://d3js.org/topojson.v1.min.js

&copy 2018 Xander Locsin
