# convertCSV2JSON.py
#
# converts a csv file into a json file
#
# Xander Locsin 10722432
# ------------------------------------------
import csv
import json
import os

# Finds the path to the directory above the directory this file is in.
scriptDir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

def valueTest(value):
    try:
        float(value)
    except:
        return "NAV"
    return value


def getMapData():
    # Opens a json file for writing.
    jsonFileName = "data/jsons/mapData.json"
    jsonFilePath = os.path.join(scriptDir, jsonFileName)
    jsonFile = open(jsonFilePath, "w+")
    jsonFile.write("[")

    #---------------- GHG V GDP ------------------------------------------------

    firstRow = True
    for yearIndex in range(43):
        yearDict = {}

        yearDict["year"] = 1970 + yearIndex

        # ------------------- GHG EMISSION DATA --------------------------------
        # Finds the GHG data source file and opens it for reading.
        GHGcsvFileName = "data/GHG/worldGHG.csv"
        GHGcsvFilePath = os.path.join(scriptDir, GHGcsvFileName)
        GHGcsvFile = open(GHGcsvFilePath, "r")

        # Start reading the file from the beginning. Iterate through rows.
        GHGcsvFile.seek(0)
        for row in GHGcsvFile:
            countryDict = {}
            splitRow = row.split(",")

            # Gather relevant entries.
            countryName = splitRow[0]
            countryCode = splitRow[1]
            GHGstring = splitRow[2 + yearIndex]
            GHG = float(GHGstring)

            # Create entries in countryDict.
            countryDict["Name"] = countryName
            countryDict["GHG"] = GHG
            # Create entry for GDP but will be overwritten later.
            countryDict["GDP"] = "NAV"

            # Add countryDict to yearDict
            yearDict[countryCode] = countryDict

        # ------------------- GDP DATA -----------------------------------------
        # Finds the GHG data source file and opens it for reading.
        GDPcsvFileName = "data/worldGDP.csv"
        GDPcsvFilePath = os.path.join(scriptDir, GDPcsvFileName)
        GDPcsvFile = open(GDPcsvFilePath, "r")

        # Start reading the file from the beginning
        GDPcsvFile.seek(0)
        for row in GDPcsvFile:
            splitRow = row.split(",")

            # Gather relevant data.
            countryName = splitRow[0]
            countryCode = splitRow[1]
            GDPstring = splitRow[2 + yearIndex]

            # Makes sure value is float. If no entry: set to "NAV".
            try:
                GDP = float(GDPstring)
            except:
                GDP = "NAV"

            # Adds GDP to the already existing dictionary.
            try:
                yearDict[countryCode]["GDP"] = GDP
            except:
                # Create new entries for a country if it not yet already exists
                yearDict[countryCode] = {}
                yearDict[countryCode]["Name"] = countryName
                yearDict[countryCode]["GDP"] = GDP

                # Set GHG to NAV if a new dict had to be created: This means
                # there was no data for this country for GHG emission.
                yearDict[countryCode]["GHG"] = "NAV"

        # Write comma if not the first row
        if not firstRow:
            jsonFile.write(",")

        # Dumps the dictionary as a row in the json
        json.dump(yearDict, jsonFile)
        firstRow = False

    # Overwrites last "," with a closing bracket
    jsonFile.write("]")




def getSectorData():
    # Opens a json file for writing.
    jsonFileName = "data/jsons/sectorData.json"
    jsonFilePath = os.path.join(scriptDir, jsonFileName)
    jsonFile = open(jsonFilePath, "w+")

    # ------------------- SECTOR DATA -----------------------------------------
    # Finds the GHG per sector data source file and opens it for reading.
    sectorcsvFileName = "data/perSector/perSector3b.csv"
    sectorcsvFilePath = os.path.join(scriptDir, sectorcsvFileName)
    sectorcsvFile = open(sectorcsvFilePath, "r")

    # Initialises the json structure.
    dataList = []
    for i in range(43):
        dataList.append({"year": 1970 + i})

    # Start reading the file from the beginning.
    sectorcsvFile.seek(0)
    for row in sectorcsvFile:
        splitRow = row.split(",")
        # Check data year and get countrycode.
        dataYear = int(splitRow[2])
        countryCode = splitRow[1]

        # Ignore data from before 1970 and later than 2012
        if dataYear >= 1970 and dataYear <= 2012:
            indexYear = dataYear - 1970

            # Gather relevant data into a dictionary.
            countrySectorDict = {
                "Name": splitRow[0],
                "Other": valueTest(splitRow[3]),
                "internationalBunkers": valueTest(splitRow[4]),
                "waste": valueTest(splitRow[5]),
                "industry": valueTest(splitRow[6]),
                "residentialAndCommercial": valueTest(splitRow[7]),
                "transport": valueTest(splitRow[8]),
                "agriculture": valueTest(splitRow[9]),
                "forrestry": valueTest(splitRow[10]),
                "landUseSources": valueTest(splitRow[11]),
                "energy": valueTest(splitRow[12])
            }

            dataList[indexYear][countryCode] = countrySectorDict

    # Dumps the dictionary as a row in the json
    jsonFile.write("[")
    firstEntry = True
    for entry in dataList:
        json.dump(entry, jsonFile)
        # Write comma if not the first entry
        if not firstEntry:
            jsonFile.write(",")
        firstEntry = False
    jsonFile.write("]")


if __name__ == '__main__':
    #getMapData()
    getSectorData()
