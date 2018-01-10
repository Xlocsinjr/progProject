# Design  

#### Data sources
- http://di.unfccc.int/time_series.
From this link all relevant data can be found but only for the UN nations.
Time series data for every type of greenhouse gas and emissions per sector
for UN countries can be found here.

- http://edgar.jrc.ec.europa.eu/overview.php?v=42FT2012
This link leads to data for GHG emissions in a larger number of countries but
only includes the time series for CO2, CH4, N2O and F-gasses but no information
on emission source. The same datasets are also available with emission per
capita and per GDP for every country.


The data for GHG emissions is given in excel files (.xls).
For CO2 the data is given in kilotons (kt) and for the other gasses
in equivalent kilotons of CO2 (kt CO2 equivalent).

The data for the GDP is a csv, which can be directly read by d3, but could first
be converted to a json.

#### Scripts and functions
##### Scripts
- Script(s) to convert a datasource to json in python.
- A script for the graphs in JavaScript
##### Functions
- every graph will have its own function
- every interactive element will have its own update function

##### Design diagram
![](doc/designSketch.png)

##### Possible required plugins
- python
- D3
- D3 tooltip
