Yale Strength and Conditioning Web App

Data Resource:
Hundreds of thousands of rows of workout data placed in a CSV from the TeamBuildr API.  2.5 million+ data points.
Columns include:
First Name
Last Name
Exercise Name
Assigned/Completed Date
Sets
Reps
Results
Notes
Highest Max
Total Rep Count
Complete access to the CSV and TeamBuildr API was given to us by the Yale strength staff.

Database Schema:
Athlete(athlete_id, first_name, last_name)
Workout(workout_id, athlete_id, date)
Exercise(exercise_id, exercise_name)
ExerciseSet(workout_id, exercise_id, weight, rep_count, notes)

User Interface:
Plan to use a web browser, with possibility of Windows and MacOS app if time permits. 
User will be able to select a name and the following options:
All exercises done on a particular day, month, year, or all time
A specific exercise
Can see every instance of exercise daily, weekly, monthly, yearly, or all time

We will also calculate if a user can raise their maximum weight by analyzing past data and using the conditions provided to us by the Strength staff, with the option for the staff to change those conditions on a user to user basis.

Code Structure: Which DBMS will you use to manage data? What languages and frameworks will you use to implement UI and backend? How to connect DBMS with backend? How to store and synchronize your team's code? How to host your server? How to do testing?
For the user interface, we plan to use Javascript in order to filter through the data and present it in a manner that is organized and easy to read. 
We will store and synchronize our team's code using a GitHub Repository. 
We will test 




Division of Work: Describe what part each member will work on. Do not ask one single member to do all the work!



Schedule: Write down some deadlines. When will you finish collecting data? When to deploy code on server? When to test each functionality? And how many iterations you plan to go through?



Current Status (optional): I assume many of you will not start until the last week. But I hope writing this proposal can help you understand how much work needs to be done and motivate you to start early.
