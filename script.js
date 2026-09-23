const form = document.getElementById('contact_form');
const emailError = document.getElementById('email-error');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function(event){

    event.preventDefault();

    let formName = document.forms["contact_form"]["name"].value;
    let formEmail = document.forms["contact_form"]["email"].value;
    let formMessage = document.forms["contact_form"]["message"].value;
    let formHoliday = document.forms["contact_form"]["holiday"].value;
    let formDesertTopping = document.forms["contact_form"]["Desert Topping"].value;
    let formTerms = document.forms["contact_form"]["terms"].checked;



    if (formName == "") {
        alert("Name must be filled out");
        return;
    }

    if (!emailPattern.test(formEmail)) {
        emailError.style.display = 'block';
        return;
    }

     emailError.style.display = 'none';

    if (formDesertTopping == "custard"){
        alert("No one likes custard, try again.");
        return;
    }

    if (formHoliday == ""){
        alert("You must select a holiday location");
        return;
    }

    if (formTerms == false){        
        alert("You must agree to the terms");
        return;
    }

    if (formMessage == ""){
        alert("You must enter a message");
        return;
    }

    form.style.display = 'none';

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    });

    document.getElementById('thank-you-message').style.display = 'block';
   
});


//https://www.w3schools.com/js/js_validation.asp - Add in javascript validation for the form
