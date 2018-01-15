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
scriptDir = os.path.dirname(os.path.dirname(__file__))


def getData():
    # Opens a json file for writing.
    jsonFileName = "data/jsons/mapData.json"
    jsonFilePath = os.path.join(scriptDir, jsonFileName)
    jsonFile = open(jsonFilePath, "w+")
    jsonFile.write("[")

    # Finds the data source file and opens it for reading.
    GHGcsvFileName = "data/GHG/worldGHG.csv"
    GHGcsvFilePath = os.path.join(scriptDir, GHGcsvFileName)
    GHGcsvFile = open(GHGcsvFilePath, "r")

    firstRow = True

    for yearIndex in range(43):
        yearDict = {}

        yearDict["year"] = 1970 + yearIndex

        # Start reading the file from the beginning
        GHGcsvFile.seek(0)
        for row in GHGcsvFile:
            countryDict = {}

            new_row = row.split(",")


            countryName = new_row[0]
            countryCode = new_row[1]
            GHGstring = new_row[2 + yearIndex]
            GHG = float(GHGstring)


            countryDict["Name"] = countryName
            countryDict["GHG"] = GHG


            yearDict[countryCode] = countryDict

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
