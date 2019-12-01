# Yale Strength and Conditioning Web App. PLEASE READ!!!

Make sure to git pull/git fetch before pushing.

## Required downloads/Instructions:

### Required downloads
- node.js at https://nodejs.org/en/download/
- homebrew using the command: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
 

    
#### Database Management:
*Tutorial on how to install PostgreSQL on Macintosh here:*
  https://www.robinwieruch.de/postgres-sql-macos-setup
 
##### Command to change dump file into database:
```
  psql dbname < infile
```

#### Web Application:

##### Command to start server (must start before running application): 
```
node structures.js
``` 

##### After starting server, webApp may be accessed at: http://localhost:8080


## TODO:
- create executable for easy use.
- allow for easy import of new csv files for conversion to database
