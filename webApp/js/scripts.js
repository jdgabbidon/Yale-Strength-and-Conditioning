

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

async function populate(){

	//fetching
	let response = await fetch("http://localhost:8080/getValues");
	

	let obj = await response.json();
	//console.log(data);
	let athleteData = obj.athletes;
	let workoutData = obj.workouts;


	/* athlete */
    select = document.getElementById('athleteName');

    athleteData.forEach(object => {
    	let opt = document.createElement('option');
    	opt.value = object.id;
    	opt.innerHTML = object.firstName + " " + object.lastName;
    	select.appendChild(opt);
    });


	/*exercises */
    select = document.getElementById('exerciseName');

    workoutData.forEach(object => {
    	let opt = document.createElement('option');
    	opt.value = object.exerciseName;
    	opt.innerHTML = object.exerciseName;
    	select.appendChild(opt);
    })





}

//to convert dates
function dateConverter(excelDate){
    return new Date((excelDate - (25567 + 2))*86400*1000);
}

    

//this creates the data filed
async function getTotalPerExercise(){

	let athleteId = document.getElementById('athleteName').value;
	let exerciseName = document.getElementById('exerciseName').value;

	console.log(athleteId);

	let response = await fetch("http://localhost:8080/getTotalHistory?athleteId=" + athleteId + "&exerciseName=" + exerciseName);

	/* other */
    let select = document.getElementById('dates');
    let tonage = document.getElementById("tonage");
    select.innerHTML = "";
	select.addEventListener("change", () => {
    	tonage.innerHTML = select.value;
	});


    let exerciseSetData = await response.json();

    exerciseSetData.forEach(object => {
    	let opt = document.createElement('option');
    	opt.value = object.total_tonage;
    	var newDate = object.date.replace(/[, ]+/g, "").trim();
    	console.log(newDate);
    	opt.innerHTML = dateConverter(parseInt(newDate)).toDateString();
    	select.appendChild(opt);
    });
    tonage.innerHTML = select.value;
}
