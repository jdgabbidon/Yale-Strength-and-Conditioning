# importing csv module
import csv
  
# csv file name
filename = "data.csv"


athlete = []
workout = []
exercise_set = []
athlete_max = []

with open('data.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        if row[3].isdigit():
            athlete.append((row[1], row[2], row[3]))
            workout.append((row[4], row[6]))
            exercise_set.append((row[4], row[3], row[36], row[35], row[39], row[8]))
            athlete_max.append((row[4], row[3], row[34]))
        else:
            print('\n\nWorking\n\n');

            ##print(row[0],row[1],row[2],)

athlete = list(set(athlete))
workout = list(set(workout))
exercise_set = list(set(exercise_set))
athlete_max = list(set(athlete_max))

with open('athlete.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    ##quotechar='|', quoting=csv.QUOTE_MINIMAL
    for row in athlete:
        writer.writerow([row[0], row[1], row[2]])
with open('workout.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    ##quotechar='|', quoting=csv.QUOTE_MINIMAL
    for row in workout:
        writer.writerow([row[0], row[1]])
with open('exercise_set.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    ##quotechar='|', quoting=csv.QUOTE_MINIMAL
    for row in exercise_set:
        writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5]])
with open('athlete_max.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    ##quotechar='|', quoting=csv.QUOTE_MINIMAL
    for row in athlete_max:
        writer.writerow([row[0], row[1], row[2]])
