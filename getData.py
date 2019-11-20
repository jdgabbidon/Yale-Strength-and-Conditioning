# importing csv module
import csv
  
# csv file name
filename = "data.csv"


lst = []

with open('data.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        if (row[3] == "Day " or row[3] == "Day"):
            print("\n\nWORKING\n\n")
            continue
        lst.append((row[1], row[2], row[3]))
            ## print(row[0])
            ##print(row[0],row[1],row[2],)

lst = list(set(lst))

with open('athlete.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    ##quotechar='|', quoting=csv.QUOTE_MINIMAL
    for row in lst:
        writer.writerow([row[0], row[1], row[2]])
        
