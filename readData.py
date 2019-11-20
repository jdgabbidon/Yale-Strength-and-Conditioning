
import csv

name = input("Enter the player's first name:" )

with open('athlete.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    #NOT EFFICIENT, ITERATES THROUGH EVERY VALUE O(n)
    #If 2 have the same first name they put
    for row in reader:
        if row[0] == name:
            print (','.join(row))
        #print(', '.join(row)) ##prints out all the rows
