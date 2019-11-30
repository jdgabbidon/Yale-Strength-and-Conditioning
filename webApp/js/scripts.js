

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
	//console.log(await data.json());
	//will be query function

	let obj = await response.json();
	//console.log(data);
	let data = obj.vals;

	/* athlete */
	var min = 12,
    max = 100,
    select = document.getElementById('athleteName');

    data.forEach(object => {
    	let opt = document.createElement('option');
    	opt.value = object.id;
    	opt.innerHTML = object.firstName + " " + object.lastName;
    	select.appendChild(opt);
    });


	/*exercise */
	var min = 12,
    max = 100,
    select = document.getElementById('exerciseName');

	for (var i = min; i<=max; i++){
	    var opt = document.createElement('option');
	    opt.value = i;
	    opt.innerHTML = i;
	    select.appendChild(opt);
	}

	/* other */
	var min = 12,
    max = 100,
    select = document.getElementById('otherName');

	for (var i = min; i<=max; i++){
	    var opt = document.createElement('option');
	    opt.value = i;
	    opt.innerHTML = i;
	    select.appendChild(opt);

	}




}

