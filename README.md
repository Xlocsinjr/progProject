# progProject

## Problem
Relate the greenhouse gas emissions of the world by source and type of gas.

## Solution
Visualization for greenhouse gas emission by country over time, greenhouse gas
emission by source, and the fractions of greenhouse gasses emitted from the
total greenhouse gas emission.

#### Features
- The greenhouse gas emission by country over time can be visualized by a map
chart coloring the countries by either their total greenhouse gas emission
or the greenhouse gas emission per capita.

- Chart 1: The time element of the greenhouse gas emission by country over time
 visualization can be interactive, by having the user have control over a
range slider or a scroll bar that determines which data of a year will be
shown.

- Chart 2: The greenhouse gas emission by source can be visualized by a bar chart.

- Chart 3: The fractions of greenhouse gasses emitted from the total greenhouse gas
 emission can be visualized by a pie chart.

- (optional) If sources for chart 2 and 3 have data for individual countries,
clicking a country in chart 1 could change for which country chart 2 and 3
are plotted.

## Prerequisites
#### Possible sources
- http://unfccc.int/ghg_data/ghg_data_unfccc/items/4146.php
- https://www.epa.gov/ghgemissions/global-greenhouse-gas-emissions-data
- http://edgar.jrc.ec.europa.eu/overview.php?v=CO2ts1990-2015#

#### External components
Most, if not all, visualizations will be made in JavaScript using d3. These
scripts will then be loaded in by a html page.
