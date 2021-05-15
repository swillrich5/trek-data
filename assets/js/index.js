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
    var apiURL = "http://stapi.co/api/v1/rest/character/search";


// data to be sent to the POST request
    let _data = {
        name: characterName,
        mirror: mirrorUniverse, 
        alternateReality: alternateReality
    }
  
    fetch("apiURL", {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => {   
        console.log(response); 
        // return response.json();
    })
    .then(data => {
        if (data.errors) {
        errorEl.textContent = "Missing Information";
        }
    })
    .catch(err => {
        console.log(err);
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
