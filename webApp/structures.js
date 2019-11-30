

//server
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get("/getValues", async (request, response) => {

    response.send(await pushValues());
    
});

app.get("/", async (request, response) => {

    response.sendFile(__dirname + "/webApp.html");
    
});

app.get("/js/scripts.js", async (request, response) => {

    response.sendFile(__dirname + "/js/scripts.js");
    
});


app.listen(8080,() =>{
    console.log("express is running");
});


//populate arr by connecting to PostGress Database
const pg = require('pg');

const cs = 'postgres://seunomonije:password@localhost:5432/gainz';




var athleteArray = [];
async function populateArr(){

    const client = new pg.Client(cs);
    client.connect();

    let arr = [];
	var res = await client.query('SELECT * FROM athlete')
    const data = res.rows;
    //console.log(data);

    data.forEach(row => {
        var athleteObj = {
            'id': row.athlete_id,
            'firstName': row.first_name,
            'lastName': row.last_name
        };

        //doesn't work
        arr.push(athleteObj);


        //setValue(row.athlete_id);
        //works..i think query functions act independently from the rest of the program
        //console.log(athleteObj);
    })
    client.end();
    return arr;
}

async function pushValues() {
    return {
        vals: await populateArr()
    }
    //console.log(athleteArray);
}
// const vals;
// pushValues().then(arr => {
//     vals = arr;
//     console.log(vals);
// });
//prints empty at
