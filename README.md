# Yale Strength and Conditioning Web App. PLEASE READ!!!

Make sure to git pull/git fetch before pushing.

## Required software:
- node.js
- homebrew (for psql)

### TODO:
- create executable for easy use.
- allow for easy import of new csv files for conversion to database
    
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
