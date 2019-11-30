

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

function populate(){

	//will be query function

	/* athlete */
	var min = 12,
    max = 100,
    select = document.getElementById('athleteName');

	for (var i = min; i<=max; i++){
	    var opt = document.createElement('option');
	    opt.value = i;
	    opt.innerHTML = i;
	    select.appendChild(opt);
	}


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

