
import csv

filelist = ["athlete.csv", "athlete_max.csv", "exercise_set.csv", "workout.csv"]

print("List of possible files:")
for filename in filelist:
    print(filename)

def determineFile():
    file = input("Enter the file name here:")
    if (file in filelist):
        return file
    else:
        print("invalid input, enter one of the choices given")
        determineFile()

def determineColumn(arr):
    column = input("Enter the column name:")
    if (column in arr):
        return column
    else:
        print("invalid input, enter one of the choices given")
        determineColumn(arr)
        
athleteCols = ["First Name", "Last Name", "User ID"]
workoutCols = ["Workout ID", "Exercise Name"]
exercise_setCols = ["Workout ID", "User ID", "Volume Load", "Rep Count", "Opt out reason", "Completed date"]
athlete_maxCols = ["Workout ID", "User ID", "Highest Max"]

wantedFile = determineFile()
print("List of possible columns:")
if (wantedFile == "athlete.csv"):
    for col in athleteCols:
        print(col)
    name = determineColumn(athleteCols)
elif (wantedFile == "athlete_max.csv"):
    for col in athlete_maxCols:
        print(col)
    name = determineColumn(athlete_maxCols)
elif (wantedFile == "exercise_set.csv"):
    for col in exercise_setCols:
        print(col)
    name = determineColumn(exercise_setCols)
elif (wantedFile == "workout.csv"):
    for col in workoutCols:
        print(col)
    name = determineColumn(workoutCols)


with open("athlete.csv", newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    #NOT EFFICIENT, ITERATES THROUGH EVERY VALUE O(n)
    #If 2 have the same first name they put
    for row in reader:
        if row[0] == name:
            print (','.join(row))
       # print(', '.join(row)) ##prints out all the rows
