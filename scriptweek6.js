//////////////Meal Get script details////////////
/////////////////////////////////////////////

        async function getMeal6() {

            try {

            // const sections = document.getElementsByClassName("meal");
            // const contents = document.getElementsByClassName("mealId");

            // // Clear previous meal
            // for (let content of contents) {
            //     content.innerHTML = "";
            // }

            $(".mealId").html("");
            $("#dish").html("");
            $(".meal").hide();

            document.getElementById("mealError").style.display = "none"



            const urlAddress =
                "https://api.freeapi.app/api/v1/public/meals/meal/random";

            const response = await fetch(urlAddress);

            if (!response.ok){
                throw new Error("Unable to fetch Meal")
            }

            //Show meal sections

            // for (let section of sections) {
            //     section.style.display = "block";
            // }

            $(".meal").fadeIn(1500);

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
        catch (error) {
            console.log(error);
            document.getElementById("mealError").style.display ="block"
        }

        }


/////JQuery for toggle/////

$(document).ready(function(){
    $("#ingredients-panel").click(function(){
        $("#ingredients").slideToggle("slow");
    });

    $("#dish").click(function(){
        $("#thumb").slideToggle("slow");
    });

    $("#instructions-panel").click(function(){
        $("#instructions").slideToggle("slow");
    });
});