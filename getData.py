# importing csv module
import csv
  
# csv file name
filename = "data.csv"

#Data structures to store the info
athlete = []
workout = []
exercise_set = []
exercise_day= []
exercise_max = []

#Filling each array
with open('data.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        if row[4].isdigit():
            athlete.append((row[1], row[2], row[3])) #First Name, Last Name, User ID from sheet
            workout.append((row[4], row[6])) #Workout ID, Exercise Name
            exercise_day.append((row[4], row[3], row[6], row[36], row[35], row[8] ))#Workout ID, User ID, Exercise name, Rep count, Opt out reason, Completed date  
            exercise_max.append((row[3], row[6], row[8], row[34]))
            for i in range(13, 31, 2):
                exercise_set.append((row[4], row[3], row[6], row[i] if (row[i].isdigit()) else 0, row[i+1] if (row[i+1].isdigit()) else 0, row[8] ))#Workout ID, Exercise name, Vol Load, Weight, Reps, Completed date  
        
            
##Converting each array to list to eliminate duplicates
athlete = list(set(athlete))
workout = list(set(workout))
exercise_day = list(set(exercise_day))
exercise_max = list(set(exercise_max))

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
        if row[0].isdigit():
            writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5].replace(',', '')])
        
##Writing athlete_max.csv
with open('exercise_day.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for row in exercise_day:
        if row[0].isdigit():
            writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5].replace(',', '')])

##Writing athlete_max.csv
with open('exercise_max.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    for row in exercise_max:
        if row[0].isdigit():
            writer.writerow([row[0], row[1], row[2].replace(',',''), '0' if row[3] == '' else row[3]])
