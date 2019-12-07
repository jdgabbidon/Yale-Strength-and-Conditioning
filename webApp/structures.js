

//server
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());




//for population of select elements
app.get("/getValues", async (request, response) => {

    response.send(await pushValues());
    
});

app.get("/getDates", async (request, response) => {

    console.log(request.query.athleteId);
    response.send(await pullDates(request.query.athleteId));
    
});

//for sending selected element back
app.get("/getTotalHistory", async (request, response) => {

    let id = request.query.athleteId; 
    let name = request.query.exerciseName;
    response.send(await getTotalHistory(id, name));
    
});

app.get("/getWorkoutHistory", async (request, response) => {

    let id = request.query.athleteId; 
    let date = request.query.date;
    response.send(await getWorkoutHistory(id, date));
    
});

//for gettingAllWorkouts
app.get("/getAllWorkouts", async (request, response) => {

    let id = request.query.athleteId; 
    let name = request.query.exerciseName;
    response.send(await getAllWorkouts(id, name));
    
});

//getting a single exercise
app.get("/getSingleDayWorkout", async (request, response) => {

    let id = request.query.athleteId; 
    let date = request.query.date;
    response.send(await getSingleDayWorkout(id, date));
    
});


app.get("/", async (request, response) => {

    response.sendFile(__dirname + "/webApp.html");
    
});



app.get("/js/scripts.js", async (request, response) => {

    response.sendFile(__dirname + "/js/scripts.js");
    
});


//server running
app.listen(8080,() =>{
    console.log("express is running");
});



const pg = require('pg');
const cs = 'postgres://jalengabbidon:password@localhost:5432/YSC';

async function populateArrAthlete(){

    const client = new pg.Client(cs);
    client.connect();

    let arr = [];
	var res = await client.query('SELECT * FROM athlete')
    const data = res.rows;
    //console.log(data);

    //sorting
    data.sort((a,b) => {
  
        return a.first_name.localeCompare(b.first_name)
    });


    data.forEach(row => {
        var athleteObj = {
            'id': row.athlete_id,
            'firstName': row.first_name,
            'lastName': row.last_name
        };

        //pushing Objects
        arr.push(athleteObj);

    })
    client.end();
    return arr;
}

async function populateArrExercises(){

    const client = new pg.Client(cs);
    client.connect();

    let arr = [];
    var res = await client.query('SELECT * FROM workout')
    let data = res.rows;
    
    //sorting
    data.sort((a,b) => {
  
        return a.exercise_name.localeCompare(b.exercise_name)
    });

  

    data.forEach(row => {
        var exerciseObj = {
            'exerciseName': row.exercise_name
        };

        //pushing Objects
        arr.push(exerciseObj);

    })

    jsonObject = arr.map(JSON.stringify);

    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    client.end();
    return uniqueArray;
}

async function populateArrDates(athleteId){
    const client = new pg.Client(cs);
    client.connect();

    var arr = [];
    var res = await client.query('SELECT DISTINCT date FROM exercise_day WHERE athlete_id=\'' + athleteId + '\' ORDER BY date DESC');
    let data = res.rows;

    data.forEach(row => {
        var dateObj = {
            'date': row
        }

        arr.push(dateObj);
    });

    
    client.end();

    return arr;
}
async function pushValues() {
    return {
        athletes: await populateArrAthlete(),
        workouts: await populateArrExercises(),
    }
}

async function pullDates(athleteId){
    return {
        dates: await populateArrDates(athleteId)
    }
}  

async function getWorkoutHistory(athleteId, date){
    const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT * FROM exercise_day WHERE exercise_day.athlete_id=\'' + athleteId + '\' AND exercise_day.date=\'' + date + '\'');
    let data = res.rows;

    client.end();
    return data;
}

async function getAllWorkouts(athleteId, exerciseName){
    const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT * FROM exercise_day WHERE exercise_day.athlete_id=\'' + athleteId + '\' AND exercise_day.exercise_name=\'' + exerciseName.replace('\'', '\'\'') + '\' ORDER BY date DESC');
    let data = res.rows;

    client.end();
    return data;
}

async function getSingleDayWorkout(athleteId, date){
     const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT * FROM exercise_day WHERE athlete_id=\'' + athleteId + '\' AND date=\'' + date + '\'');
    let data = res.rows;

    console.log(data);

    client.end();
    return data;


}


