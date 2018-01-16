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


def getData():
    # Opens a json file for writing.
    jsonFileName = "data/jsons/mapData.json"
    jsonFilePath = os.path.join(scriptDir, jsonFileName)
    jsonFile = open(jsonFilePath, "w+")
    jsonFile.write("[")

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
            new_row = row.split(",")

            # Gather relevant entries.
            countryName = new_row[0]
            countryCode = new_row[1]
            GHGstring = new_row[2 + yearIndex]
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
            new_row = row.split(",")

            # Gather relevant data.
            countryName = new_row[0]
            countryCode = new_row[1]
            GDPstring = new_row[2 + yearIndex]

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


    # # Finds the data source file and opens it for reading.
    # GDPcsvFileName = "data/worldGDP.csv"
    # GDPcsvFilePath = os.path.join(scriptDir, GDPcsvFileName)
    # GDPcsvFile = open(GDPcsvFilePath, "r")

    # Overwrites last "," with a closing bracket
    jsonFile.write("]")

if __name__ == '__main__':
    getData()
