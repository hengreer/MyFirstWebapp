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

const textarea = document.getElementById("message");
textarea.addEventListener("input", function() {
    let total_length = this.value.length;
    document.getElementById("char-length").innerText = total_length;
});

form.addEventListener('reset', function(){
     document.getElementById("char-length").innerText = "0";
});

        async function getMeal() {

            const sections = document.getElementsByClassName("meal");
            const contents = document.getElementsByClassName("mealId");

            // Clear previous meal
            for (let content of contents) {
                content.innerHTML = "";
            }

            // Show meal sections
            for (let section of sections) {
                section.style.display = "block";
            }

            const urlAddress =
                "https://api.freeapi.app/api/v1/public/meals/meal/random";

            const response = await fetch(urlAddress);

            const meal = await response.json();

            const array = Object.keys(meal.data);

            let j = 1;

            for (let i = 0; i < array.length; i++) {

                const key = array[i];
                const value = meal.data[key];
                //const displayKey = key.replace(/^str/, "");

                if (value !== null && value !== undefined && value !== "") {

                    if (key === "strMeal") {
                        document.getElementById("dish").innerHTML += value + "<br>";
                    }

                    else if (key === "strCategory") {
                        document.getElementById("category").innerHTML += value + "<br>";
                    }

                    else if (key === "strArea") {
                        document.getElementById("area").innerHTML += value + "<br>";
                    }

                    else if (key.includes("Ingredient")) {

                        const measureKey = key.replace("Ingredient", "Measure");

                        displayAnswer(
                            `${j} : ${value}: ${meal.data[measureKey]}`
                        );

                        j++;
                    }

                    else if (key === "strInstructions") {
                        document.getElementById("instructions").innerHTML += value + "<br>";
                    }

                    else if (key === "strSource") {
                        const link = document.createElement("a");

                    link.className = "text-link";
                    link.href = value;
                    link.textContent = value;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";

                    document.getElementById("source").appendChild(link);
                    }

                    else if (key === "strMealThumb") {
                        const image = document.createElement("img");
                        image.src = value;
                        image.alt = "Meal Image";
                        document.getElementById("thumb").appendChild(image);
                    }

                    else if (key === "strYoutube") {
                        const link = document.createElement("a");

                        link.href = value;
                        link.textContent = "YouTube Receipe Link";
                        link.target = "_blank";

                        document.getElementById("youtube").appendChild(link);
                    }

                    console.log(key);
                }
            }

            function displayAnswer(text) {
                document.getElementById("ingredients").innerHTML +=
                    "<br>" + text + "<br>";
            }
        }

//https://www.w3schools.com/js/js_validation.asp - Add in javascript validation for the form
