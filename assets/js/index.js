    // the character search form
const searchFormEl = document.querySelector('#search-form');
    // the input field where the user enters the city name
const characterNameEl = document.querySelector("#character-name");
    // the element the city name and date are displayed with current conditions
const alternateRealityEl = document.querySelector("#alternate-reality");
    // displays current temperature element 
const mirrorUniversEl = document.querySelector("#mirror-universe");
    // displays current wind spped element


// performs the 2nd fetch to get the current conditions and 5-day forecast
// calls addToSavedCities to save the city name for display with the other
// previously searched cities 
function getTrekCharacter(characterName, mirrorUniverse, alternateReality) {
    var apiURL = "http://stapi.co/api/v1/rest/character/search?name=" + characterName;
    if (!mirrorUniverse) {
        apiURL += '&mirror=false';
    }
    if (!alternateReality) {
        apiURL += '&alternateReality=false'
    }

    console.log("apiURL= " + apiURL);

    fetch(apiURL, { method: "POST" })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather API for Forecast');
        console.log(error);
    });
};


// --------------------------------------------------------------------


// called when a new search is initiated.
var searchFormHandler = function(event) {
    event.preventDefault();
    let characterName = characterNameEl.value.trim();
    let alternateReality = alternateRealityEl.checked;
    let mirrorUniverse = mirrorUniversEl.checked;
    if (characterName) {
        getTrekCharacter(characterName, alternateReality, mirrorUniverse);
        characterNameEl.value = '';
        mirrorUniversEl.checked = false;
        alternateRealityEl.checked = false;
    } else {
        alert('Please enter a Star Trek character name');
    }
};


// --------------------------------------------------------------------


// Event listener that fires when a search for a character is entered
// and the form is submitted (clicking the search button or hitting return)
searchFormEl.addEventListener('submit', searchFormHandler);
