const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', logMouse);

const searchContainer = document.getElementById("search-field")
searchContainer.addEventListener('keyup', logKey);

const infoContainer = document.getElementById("country-info");
const backGround = document.getElementById("body");




// Fake een event
const elem = document.getElementById('search-button');

elem.addEventListener('click', function(e) {
    searchCountry("Nederland");

});
setTimeout(function() {
    console.log("fake event");
    elem.dispatchEvent(new Event('click'));
}, 0);



function logKey(e) {
    console.log(e);
    console.log(e.value);
    let text = document.getElementById("search-field").value;
    //console.log("text = " + text);
    if (text && e.keyCode === 13) {
        console.log("enter");
        console.log("text = " + text);
        searchCountry(text);
        searchContainer.value = '';
    }
}

function logMouse(e){
    console.log(e)
    console.log(e.value);
    let text = document.getElementById("search-field").value;
    console.log("text = " + text);
    if (text) {
        console.log("click");
        console.log("text = " + text);
        searchCountry(text);
        searchContainer.value = '';
    }
}

async function searchCountry(text) {

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    const oldDataCheck = document.getElementById("country");
    console.log(oldDataCheck);



    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${text}`);
        console.log("text in try = " + text);
        console.log(result);

        if(oldDataCheck){
            infoContainer.removeChild(oldDataCheck);
        }
            createCountryInfoField(result);
    }
    catch (e) {
        console.error(e);
        errorMessage.textContent = "Country doesn't exist.";
        return e;
        }

}

function createCountryInfoField(result){
    const country = document.createElement("div");
    country.setAttribute("id","country");

    const backGroundText = document.createElement( "div");
    backGroundText.setAttribute("id", "container-back-ground");
    backGroundText.textContent = (backGroundNames(result.data[0].translations));
    console.log(backGroundText);
    backGround.appendChild(backGroundText);

    const flagImage = document.createElement("IMG");
    flagImage.src = result.data[0].flag;
    country.appendChild(flagImage);


    const landName = document.createElement("h1");
    landName.textContent = (result.data[0].name);
    country.appendChild(landName);

    const landNameSubregionPopulation = document.createElement("p");
    landNameSubregionPopulation.textContent = (createLandPopulationString(result.data[0]));
    country.appendChild(landNameSubregionPopulation);

    const landCapitalCurrency = document.createElement("p");
    landCapitalCurrency.textContent = (`The capital is ${result.data[0].capital}`) + (createCurrencyString(result.data[0].currencies));
    country.appendChild(landCapitalCurrency);

    const landLanguages = document.createElement("p");
    landLanguages.textContent = (createLanguageString(result.data[0].languages));
    country.appendChild(landLanguages);

    infoContainer.appendChild(country);



}
function createLandPopulationString(land){
     return (`${land.name} is situated in ${land.subregion}. It has a population of ${land.population} people.`);
}


function createCurrencyString(currency){
    //console.log(currency.length);
    let currencyArray = [];
    for (let i =0; i <currency.length;i++){
        currencyArray[i] = currency[i].name+ "'s";
    }
    return createStringFromArray(currencyArray," and you can pay with ");
}
function createLanguageString(language){
    //console.log(language.length);
    let languagesArray = [];
    for (let i =0; i <language.length;i++){
        languagesArray[i] = language[i].name;
    }
    return createStringFromArray(languagesArray,"They speak  ");
}



function createStringFromArray(array,beginString) {
    let stringCreated = beginString;
    for (let i = 0; i < array.length; i++) {
        if (array.length === 1) {
            stringCreated += array[i] + ".";
            return stringCreated;
        }
        if (i === array.length - 2) {
            stringCreated += array[array.length - 2] + " and " + array[array.length - 1] + ".";
            return stringCreated;
        } else {
            stringCreated += array[i] + ", ";
        }
    }
}

function backGroundNames(names){

    let namesString = "";
    let i = ""
    for (let a = 0; a < 10 ;a++) {
        for (i in names) {
            //console.log("Names --> " + names[i]);
            namesString += names[i] + "                       ";
        }
    }
    console.log("namesString -->" + namesString);
    return namesString;
}
