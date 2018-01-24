#### 08-01-2018    week1 - monday
- Set up first project proposal

#### 09-01-2018    week1 - tuesday
- Worked on project proposal
- Failed to propose a good project.
The pie chart does not tie in well with the overall story the rest of the charts
are meant to tell.

#### 10-01-2018    week1 - wednesday
- Revising the project proposal.
Replace pie chart with scatterplot relating a country's GDP to its GHG emission
- Working on the design document.

#### 11-01-2018    week1 - thursday
- Daily standup:
UN countries data. Country removal via dropdown. Possible issues with country
names in different datasets.
- Trying to figure out how datamaps plugin works.

#### 12-01-2018    week1 - friday
- Trying to figure out how datamaps plugin works.
- Presentations:
get index.html link in github.
Arrange dataset on year first then country.
Next step: get data sorted out. (This should have been the first step.)

#### 14-01-2018    week1 - sunday
- convert datasources to csv
- convert the csv to json: json per visualisation?
- been able to create a json (though not correct) holding only the names and GDP
of every country of every year from the GDP data. Next step is to add the GHG
emissions.
- Tried to change the json to hold GHG emission data but the script reads the
values in scientific notation (ex: 1.31E+01) as a string. This must be converted
to float or int first.

#### 15-01-2018    week2 - monday
- Changed log to process.md
- Daily standup: Made a start in creating a usable json. By the end of this week
all data should be usable and at least the world map and scatterplot should
work.
- Got the world map working with real data.
- Note: Still have to add GDP tot the json
- Somehow 2012 data isn't added to the json
- World map data is (seems?) correct now, with GDP and GHG emission data from
1970 to 2012 available in json format.

#### 16-01-2018    week2 - tuesday
- Tried copying over the scatterplot from Data processing homework 4.
- Scatterplot can now update with the slider but the dots all seem to be placed
near the bottom of the chart. The chart currently shows all countries that have
both GDP and GHG emission data. UPDATE: Apparently this happened because all
countries have a far lower GHG emission relative to China's emission in 2012,
which is the highest GHG emission of all countries and all years.
- Country colour is still blinking/flashing/flickering if the mouse is hovering
over a country. Not sure where it comes from. Even with all elements commented
out except the map, it still happens.
- Found new data source for GHG emission per sector.
- In the earlier years, all the dots will be at the left side of the scatterplot.
Perhaps the x-axis' range should change depending on the highest GDP of the countries
that will be plotted in the chart.
- The world map and the scatter plot now can show data. The next
step will be to create a json for the data for GHG emission per sector and to create
a first version of the grouped bar chart.

#### 17-01-2018    week2 - wednesday
- New optional idea for the grouped bar chart: Via checkboxes the user can
choose which sectors the chart will show.
- Today: Get the GHG emission per sector data in a usable json file.

#### 18-01-2018    week2 - thursday
- Tried getting the GHG emission per sector data in a usable json file.
- For the Sector data: Yugoslav SFR had no country code. The country code was
manually corrected to Yugoslavia, YUG. Though, this may not change anything in
the final product as Yugoslavia is not a country anymore.
- Managed to get all data into a single json. All sector data for country codes
that didn't already have entries made from the GDP and GHG data was neglected
for now. Most of this data is data for larger regions or regions within
countries so there shouldn't be any data loss on individual countries.

#### 19-01-2018    week2 - friday
- Presentation feedback:
  - quantize scale will allow colouring the countries based on in what range
  (bucket) they fall in. Don't show more than there is: Choose the buckets well
  so change in emission over the years is still visible even though the colour
  is based on the buckets.
  - It might also be possible to plot the colours and dots in a log scale.

#### 21-01-2018   week2 - sunday
- Tried to store the json data in a variable in javascript. The data is not
fully loaded after calling d3.json because it is asynchronous. It is best to
just run all functions inside d3.json.
- Investigated the colour flickering tooltip in the worldmap. It has definitely
something to do with the slider in the html. Commenting the slider out in the
html fixes the problem. Perhaps the slider causes the map to constantly reload?
UPDATE: Apparently this issue can also be fixed by putting the slider after the
world map in the html, which is a quick and easy fix.
- Separated the function updateScatterYear from the main function.
- Separated the function updateColour from the main function.
- New idea: Which year and which countries are plotted could be specified within
a global object variable. The charts can then retrieve a list or some other
object which specify which countries should be shown.

#### 22-01-2018   week3 - monday
- Changed the scale for the x and y axis of the scatterplot to a log-log scale.
The domain of both axes were changed to 0.001 since log(0) is not a number.
- First version of the bar chart has been implemented though it does not yet
show any bars.
- The bar chart now shows bars for countries showing real data. The Y-axis does
not show ticks which means that the bars do not give any indication to its
value. Since the function updateBar already works with a "to plot" list, the
functionality of adding countries to the bar chart via the world map should not
be too difficult to add. As of now, the "to plot" list only contain the
Netherlands, the United States and China.
- Bar chart has range set in log scale. World map has linear range set for
the colours. Currently, the boundaries of these ranges cannot be justified
except for the reason that it "shows up nicely" in the charts.
- It would be best if the world map colour scale was quantised, assigning a
colour for certain ranges of values.
- The bar chart is now a grouped bar chart showing real data for 3 countries and
4 sectors.

#### 23-01-2018   week3 - tuesday
- New idea: Implement a dropdown menu for adding countries to the scatterplot
and barchart as well. Then there will be a dropdown for both adding and removing
countries.
- Scatterplot x-axis range lower boundary to 1. Since it is a log scale, having
0.001 as the lower bound makes the x-axis range too large.
- Barchart forestry data has a negative value. This makes the log scale
impossible to use. Either a linear scale has to be used or the absolute value
can be taken. If the absolute value is taken, the user should be informed
somewhere that the value the user will read in the chart for forestry should be
read as a negative. For nor the absolute value is shown.
- Removed unnecessary files in the repository. Mostly unused data files.
- Fixed the axes on the bar chart. The bar chart now also shows data on all
sectors if available.
- Scatterplot now also works with a "to plot" list. The dots are labeled with
their country name.
- New idea: Be able to switch between log-log and linear scatterplot.
- Next step: It would be best to get the layout of the page in order before
putting any interactive elements on the page. Might be useful to check
bootstrap.

#### 24-01-2018   week3 - wednesday
- Looked up bootstrap. Seems like too much work figuring out how it works.
All visualisations should be visible on the screen and no bootstrap template is
needed.
- Started on the page layout. The different divs in the html have temporarily
been given a 1px border.
