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
- Scatterplot can now update with the slider but the dots all seem to be placed near the
bottom of the chart. The chart currently shows all countries that have both GDP and GHG
emission data. UPDATE: Apparently this happened because all countries have a far lower
GHG emission relative to China's emission in 2012, which is the highest GHG emission of
all countries and all years.
- Country colour is still blinking/flashing/flickering if the mouse is hovering over a
country. Not sure where it comes from. Even with all elements commented out except the
map, it still happens.
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
  (bucket) they fall in. laat niet meer zien dan er is in de worldmap: kies de buckets goed zodat je
wel verandering ziet op de kaart.
  - It might also be possible to plot the colours and dots in a log scale. 
