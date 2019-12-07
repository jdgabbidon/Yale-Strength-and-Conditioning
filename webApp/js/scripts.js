

/*

											JQuery Function for dropdowns

*/

//names dropdown
// $(function(){
//     var $select = $(".names");
//     for (i=1;i<=100;i++){
//         $select.append($('<option></option>').val(i).html(i))
//     }
// });
//

// ***************************************************
//
//                      Population of Data            
//
// ***************************************************

async function populate() {
	await populateHelper();
	populateExercises();
	populateDate();
}


async function populateHelper() {

	//fetching
	let response = await fetch("http://localhost:8080/getValues");


	let obj = await response.json();
	//console.log(data);
	let athleteData = obj.athletes;


	/* athlete */
	select = document.getElementById('athleteName');

	athleteData.forEach(object => {
		let opt = document.createElement('option');
		opt.value = object.id;
		opt.innerHTML = object.firstName + " " + object.lastName;
		select.appendChild(opt);
	});
}

async function populateExercises() {
	let autoPop = document.getElementById("athleteName");
	let dateList = document.getElementById("datesWorkedOut");
	console.log('MADE IT')
	populateExercisesHelper();
	autoPop.addEventListener("change", async () => {
		populateExercisesHelper();
	});
}

async function populateExercisesHelper() {
	let autoPop = document.getElementById("athleteName");
	console.log(autoPop.value);
	let response = await fetch("http://localhost:8080/getExercises?athleteId=" + autoPop.value);
	let object = await response.json();
	let exercises = object.exercise;
	console.log(exercises);

	let select = document.getElementById("exerciseName");
	select.innerHTML = "";
	exercises.forEach(obj => {
		let opt = document.createElement('option');
		opt.value = obj.exercise_name;
		opt.innerHTML = obj.exercise_name;
		select.appendChild(opt);
	});
}

async function populateDate() {
	let autoPop = document.getElementById("athleteName");
	let dateList = document.getElementById("datesWorkedOut");
	populateDateHelper();
	autoPop.addEventListener("change", async () => {
		populateDateHelper();

	});

}

async function populateDateHelper() {
	let autoPop = document.getElementById("athleteName");
	console.log(autoPop.value);
	let response = await fetch("http://localhost:8080/getDates?athleteId=" + autoPop.value);
	let object = await response.json();
	let dates = object.dates;

	let select = document.getElementById("datesWorkedOut");
	select.innerHTML = "";
	dates.forEach(obj => {
		let opt = document.createElement('option');
		opt.value = obj.date.date;
		opt.innerHTML = dateConverter(parseInt(obj.date.date)).toDateString();
		select.appendChild(opt);
	});
}


// **************************************************************
//
//                          Conversion Functions               
//
// **************************************************************

//to convert dates
function dateConverter(excelDate) {
	return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
}



// ***************************************************************
//
//                        Presenting Data in Tables               
//
// ***************************************************************

//this creates the data filed
async function getWorkoutHistoryData() {

	let athleteId = document.getElementById('athleteName').value;
	let date = document.getElementById('datesWorkedOut').value;

	console.log(athleteId);

	let response = await fetch("http://localhost:8080/getWorkoutHistory?athleteId=" + athleteId + "&date=" + date);

	let tableRef = document.getElementById("dataTable");

	let exerciseDayData = await response.json();

	console.log(exerciseDayData);
	exerciseDayData.forEach(row => {

		let newRow = tableRef.insertRow(-1); //insert a row at the end of the table
		newRow.className = "temp";
		let cell0 = newRow.insertCell(0); //insert a cell in the row at index 0

		let newText = document.createTextNode(dateConverter(parseInt(row.date)).toDateString()); // append a text node to the cell
		cell0.appendChild(newText);

		cell0 = newRow.insertCell(1); //insert a cell in the row at index 0
		newText = document.createTextNode(row.exercise_name); // append a text node to the cell
		cell0.appendChild(newText);

		cell0 = newRow.insertCell(2); //insert a cell in the row at index 0
		newText = document.createTextNode(row.rep_count); // append a text node to the cell
		cell0.appendChild(newText);

		cell0 = newRow.insertCell(3); //insert a cell in the row at index 0
		newText = document.createTextNode(row.total_tonage); // append a text node to the cell
		cell0.appendChild(newText);

	});
}

//spitting out data in rows
async function addRow() {

	let athleteId = document.getElementById('athleteName').value;
	let exerciseName = document.getElementById('exerciseName').value;

	let response = await fetch("http://localhost:8080/getAllWorkouts?athleteId=" + athleteId + "&exerciseName=" + exerciseName);

	let tableRef = document.getElementById("dataTable");

	let exerciseDayData = await response.json();
	console.log(exerciseDayData);
	exerciseDayData.forEach(row => {

		let newRow = tableRef.insertRow(-1); //insert a row at the end of the table
		newRow.className = "temp";

		let cell0 = newRow.insertCell(0); //insert a cell in the row at index 0
		let newText = document.createTextNode(dateConverter(parseInt(row.date)).toDateString()); // append a text node to the cell
		cell0.appendChild(newText);

		cell0 = newRow.insertCell(1); //insert a cell in the row at index 0
		newText = document.createTextNode(row.exercise_name); // append a text node to the cell
		cell0.appendChild(newText);

		cell0 = newRow.insertCell(2); //insert a cell in the row at index 0
		newText = document.createTextNode(row.rep_count); // append a text node to the cell
		cell0.appendChild(newText);

		cell0 = newRow.insertCell(3); //insert a cell in the row at index 0
		newText = document.createTextNode(row.total_tonage); // append a text node to the cell
		cell0.appendChild(newText);

	});

}

async function singleDayWorkoutViewer() {
	let athleteId = document.getElementById('athleteName').value;
	let date = document.getElementById('datesWorkedOut').value;
}

// ***************************************************************** 
//
//                            Search 
//
//******************************************************************

function showE() {
	document.getElementById("exerciseName").style.display = "inline";
	document.getElementById("datesWorkedOut").style.display = "none";
}

function showD() {
	document.getElementById("datesWorkedOut").style.display = "inline";
	document.getElementById("exerciseName").style.display = "none";
}

function submitChoice() {
	let rows = document.getElementsByClassName("temp");
	console.log(rows);
	let arr = Array.prototype.slice.call(rows);
	console.log(arr);
	if (arr.length != 0) {
		arr.forEach(row => {
			row.remove();
		});
	}


	if (document.getElementById("exerciseName").style.display == "inline") {
		addRow();
	} else {
		getWorkoutHistoryData();
	}
}
