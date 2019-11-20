# importing csv module
import csv
  
# csv file name
filename = "data.csv"

#Data structures to store the info
athlete = []
workout = []
exercise_set = []
athlete_max = []

#Filling each array
with open('data.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        if (row[3] == "Day " or row[3] == "Day"):
            continue #Ignoring Day Off entries
            
        athlete.append((row[1], row[2], row[3])) #First Name, Last Name, User ID from sheet
        workout.append((row[4], row[6])) #Workout ID, Exercise Name
        exercise_set.append((row[4], row[3], row[36], row[35], row[39], row[8]))#Workout ID, User ID, Vol Load, Rep count, Opt out reason, Completed date  
        athlete_max.append((row[4], row[3], row[34])) #Workout ID, User ID, Highest Max
        
        
##Converting each array to list to eliminate duplicates
athlete = list(set(athlete))
workout = list(set(workout))
exercise_set = list(set(exercise_set))
athlete_max = list(set(athlete_max))

##Writing athlete.csv
with open('athlete.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for row in athlete:
        writer.writerow([row[0], row[1], row[2]])
        
##Writing workout.csv
with open('workout.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for row in workout:
        writer.writerow([row[0], row[1]])
        
##Writing exercise_set.csv
with open('exercise_set.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for row in exercise_set:
        writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5]])
        
##Writing athlete_max.csv
with open('athlete_max.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for row in athlete_max:
        writer.writerow([row[0], row[1], row[2]])
