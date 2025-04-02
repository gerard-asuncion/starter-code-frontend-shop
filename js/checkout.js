
// Exercise 6
function validate() {
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail"); 
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");
	
	// Validate fields entered by the user: name, phone, password, and email

	let nameNumbers = false;
	let lastNameNumbers = false;
	let phoneNumbers = true;

	for(let i of fName.value){
		if(!isNaN(i)){
			nameNumbers = true;
		}
	}

	for(let i of fLastN.value){
		if(!isNaN(i)){
			lastNameNumbers = true;
		}
	}

	for(let i of fPhone.value){
		if(isNaN(i)){
			phoneNumbers = false;
		}
	}

	const eMail = checkEmail(fEmail.value);
	const charPassword = checkCharacters(fPassword.value);
	const numPassword = checkNumbers(fPassword.value);

	if(fName.value == "" || fName.value.length < 3 || nameNumbers){
		fName.classList.add("is-invalid"); 
		errorName.style.display = "block";
		error++;
	} else {
		fName.classList.remove("is-invalid");
    	fName.classList.add("is-valid");
	}

	if(fEmail.value == "" || fEmail.value.length < 3 || !eMail){
		fEmail.classList.add("is-invalid"); 
		errorEmail.style.display = "block";
		error++;
	} else {
		fEmail.classList.remove("is-invalid");
    	fEmail.classList.add("is-valid");
	}

	if(fAddress.value == "" || fAddress.value.length < 3){
		fAddress.classList.add("is-invalid"); 
		errorAddress.style.display = "block";
		error++;
	} else {
		fAddress.classList.remove("is-invalid");
    	fAddress.classList.add("is-valid");
	}

	if(fLastN.value == "" || fLastN.value.length < 3 || lastNameNumbers){
		fLastN.classList.add("is-invalid"); 
		errorLastN.style.display = "block";
		error++;
	} else {
		fLastN.classList.remove("is-invalid");
    	fLastN.classList.add("is-valid");
	}

	if(fPassword.value == "" || fPassword.length < 3 || !(charPassword && numPassword)){
		fPassword.classList.add("is-invalid"); 
		errorPassword.style.display = "block";
		error++;
	} else {
		fPassword.classList.remove("is-invalid");
    	fPassword.classList.add("is-valid");
	}

	if(fPhone.value == "" || fPhone < 3 || !phoneNumbers){
		fPhone.classList.add("is-invalid"); 
		errorPhone.style.display = "block";
		error++;
	} else {
		fPhone.classList.remove("is-invalid");
    	fPhone.classList.add("is-valid");
	}
	 
	if(error > 0){
		alert("Error");	
	}else{
		alert("OK");
	}

}

function checkCharacters(string){
	const regex = /[a-zA-Z]/
	let result = regex.test(string)
	return result
}

function checkNumbers(string){
	const regex = /\d/
	let result = regex.test(string)
	return result
}

function checkEmail(string){
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	let result = regex.test(string)
	return result
}
