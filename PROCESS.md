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
emission data.
- Country colour is still blinking/flashing/flickering if the mouse is hovering over a
country. Not sure where it comes from.
