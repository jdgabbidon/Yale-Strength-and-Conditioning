
//populate arr by connecting to PostGress Database
const pg = require('pg');

const cs = 'postgres://seunomonije:password@localhost:5432/gainz';

const client = new pg.Client(cs);
client.connect();


const athleteObj = {
	'id': "",
	'firstName': "",
	'lastName': ""
};

var athleteArray = [];
function populateArr(){
	client.query('SELECT * FROM athlete').then(res => {

    const data = res.rows;
    data.forEach(row => {
        //console.log(row);
        athleteObj.id = row.athlete_id;
        athleteObj.firstName = row.first_name;
        athleteObj.lastName = row.last_name;

        //doesn't work
        athleteArray.push(athleteObj);

        //works..i think query functions act independently from the rest of the program
        console.log(athleteObj);

    })
}).finally(() => {
    client.end()
});
}
populateArr();

//prints empty array
console.log(athleteArray);
