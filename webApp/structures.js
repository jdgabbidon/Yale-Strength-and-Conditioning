

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

app.get("/getExerciseDates", async (request, response) => {
    let id = request.query.athleteId;
    let name = request.query.exerciseName;
    response.send(await pullExerciseDates(id, name))
})

app.get("/getExercises", async (request, response) => {
    console.log(request.query.athleteId);
    response.send(await pullExercises(request.query.athleteId));
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

//for getting 70% max of an exercise on a date
app.get("/get80Max", async (request, response) => {

    let id = request.query.athleteId;
    let exerciseName = request.query.exerciseName;
    let date = request.query.date;
    response.send(await get80Max(id, exerciseName, date));

});


app.get("/", async (request, response) => {

    response.sendFile(__dirname + "/webApp.html");

});



app.get("/js/scripts.js", async (request, response) => {

    response.sendFile(__dirname + "/js/scripts.js");

});


//server running
app.listen(8080, () => {
    console.log("express is running");
});



const pg = require('pg');
const cs = 'postgres://seunomonije:password@localhost:5432/gainz3';

async function populateArrAthlete() {

    const client = new pg.Client(cs);
    client.connect();

    let arr = [];
    var res = await client.query('SELECT * FROM athlete ORDER BY first_name');
    const data = res.rows;
    //console.log(data);

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

async function populateArrExercises() {

    const client = new pg.Client(cs);
    client.connect();

    let arr = [];
    var res = await client.query('SELECT DISTINCT exercise_name FROM exercise_day WHERE athlete_id=\'' + athlete_id + '\' ORDER BY exercise_name')
    let data = res.rows;

    data.forEach(row => {
        var exerciseObj = {
            'exerciseName': row.exercise_name
        };

        //pushing Objects
        arr.push(exerciseObj);

    })


    client.end();
    return arr;
}

async function populateArrDates(athleteId) {
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

async function populateArrExerciseDates(athleteId, exerciseName) {
    const client = new pg.Client(cs);
    client.connect();

    var arr = [];
    var res = await client.query('SELECT DISTINCT date FROM exercise_day WHERE athlete_id=\'' + athleteId + '\' AND exercise_day.exercise_name=\'' + exerciseName.replace('\'', '\'\'') + '\' ORDER BY date DESC');
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



async function populateArrExercises(athleteId) {

    const client = new pg.Client(cs);
    client.connect();

    var arr = [];
    var res = await client.query('SELECT DISTINCT exercise_name FROM exercise_day WHERE athlete_id=\'' + athleteId + '\' ORDER BY exercise_name');
    let data = res.rows;

    data.forEach(row => {
        arr.push(row);
    });


    client.end();

    return { 'exercise': arr };

}

    //objects
async function pushValues() {
    return {
        athletes: await populateArrAthlete(),
    }
}

async function pullDates(athleteId) {
    return {
        dates: await populateArrDates(athleteId)
    }
}

async function pullExerciseDates(athleteId, exerciseName){
    return {
        dates: await populateArrExerciseDates(athleteId, exerciseName)
    }
}

async function pullExercises(athleteId) {
    return await populateArrExercises(athleteId);
}
    //end objects


async function getWorkoutHistory(athleteId, date) {
    const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT * FROM exercise_day WHERE exercise_day.athlete_id=\'' + athleteId + '\' AND exercise_day.date=\'' + date + '\'');
    let data = res.rows;

    client.end();
    return data;
}

async function getAllWorkouts(athleteId, exerciseName) {
    const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT * FROM exercise_day WHERE exercise_day.athlete_id=\'' + athleteId + '\' AND exercise_day.exercise_name=\'' + exerciseName.replace('\'', '\'\'') + '\' ORDER BY date DESC');
    let data = res.rows;

    client.end();
    return data;
}

async function get80Max(athleteId, exerciseName, date){ //CURRENTLY RUNNING WITH 70% MAX
    const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT SUM(exercise_set.reps)/2 FROM exercise_set,exercise_max WHERE exercise_set.athlete_id=\'' + athleteId 
        + '\' AND exercise_set.athlete_id=exercise_max.athlete_id AND exercise_set.exercise_name=\'' + exerciseName.replace('\'', '\'\'') 
        + '\' AND exercise_set.exercise_name=exercise_max.exercise_name AND exercise_set.date=\'' + date 
        + '\' AND exercise_max.date=exercise_set.date AND exercise_set.weight >= 0.7*exercise_max.weight');
    let data = res.rows;

    client.end();
    return data;
}

async function getSingleDayWorkout(athleteId, date) {
    const client = new pg.Client(cs);
    client.connect();

    var res = await client.query('SELECT * FROM exercise_day WHERE athlete_id=\'' + athleteId + '\' AND date=\'' + date + '\'');
    let data = res.rows;

    console.log(data);

    client.end();
    return data;


}


