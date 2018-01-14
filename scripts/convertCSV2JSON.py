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
    GDPcsvFileName = "data/worldGDP.csv"
    GDPcsvFilePath = os.path.join(scriptDir, GDPcsvFileName)
    GDPcsvFile = open(GDPcsvFilePath, "r")

    # Starts jsonfile with opening bracket, then iterate through every row in csv.
    jsonFileName = "data/jsons/mapData.json"
    jsonFilePath = os.path.join(scriptDir, jsonFileName)
    jsonFile = open(jsonFilePath, "w+")
    jsonFile.write("[")

    firstRow = True

    for yearIndex in range(43):
        yearDict = {}

        yearDict["year"] = 1970 + yearIndex

        for row in GDPcsvFile:
            countryDict = {}

            new_row = row.split(",")


            countryName = new_row[0]
            countryCode = new_row[1]
            GDP = new_row[2 + yearIndex]

            countryDict["Name"] = countryName
            countryDict["GDP"] = GDP


            yearDict[countryCode] = countryDict

            if not firstRow:
                jsonFile.write(",")

        # Dumps the dictionary as a row in the json
        json.dump(yearDict, jsonFile)
        firstRow = False

    # Overwrites last "," with a closing bracket
    jsonFile.write("]")

if __name__ == '__main__':
    getData()
