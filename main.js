const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById("search-field")
searchButton.addEventListener('click', logMouse);
searchContainer.addEventListener('keyup', logKey);
const infoContainer = document.getElementById("country-info");
let itemG = 0;

function logKey(e) {
    //console.log(e);
    //console.log(e.value);
    let text = document.getElementById("search-field").value;
    //console.log("text = " + text);
    if (text && e.keyCode === 13) {
        console.log("enter");
        console.log("text = " + text);
        searchCountry(text);
        document.getElementById('search-field').value = '';
    }
}

function logMouse(e){
    //console.log(e)
    let text = document.getElementById("search-field").value;
    //console.log("text = " + text);
    if (text) {
        console.log("click");
        console.log("text = " + text);
        searchCountry(text);
        document.getElementById('search-field').value = '';
    }
}

async function searchCountry(text) {
    try {
            const urlString = "https://restcountries.eu/rest/v2/name/" + text + "?fullText=true";
            console.log(urlString);
            const result = await axios.get(urlString);
            console.log("text in try = " + text);
            console.log(urlString);
            console.log(result);
            createCountryInfoField(result);
    }
    catch (e) {
        if (itemG>0){
            console.log(itemG + "hoi in if");
            const elmnt = document.createElement("p");
            const textNode = document.createTextNode("Nogmaals error")
            elmnt.appendChild(textNode);

            const item = document.getElementById("error-message");
            item.replaceChild(elmnt,item.childNodes[0]);
        }
        else {
            console.log("error in else");
            const idError = document.getElementById("error-message")
            const errorMessage = document.createElement("p");
            errorMessage.textContent = ("Country doesn't exist");
            idError.appendChild(errorMessage);
            itemG++;
            console.log(itemG);
            //const textnode = document.createTextNode("Country doesn't exist");
            //const id = document.getElementById("country-info");
            //errorMessage.textContent = "Country doesn't exist.";
            //infoContainer.replaceChild(errorMessage,id.childNodes[0]);
            return (e);
        }
    }
}
// function createInfoContainer(infoCountry,infoCapitel,infoCurrency,infoLanguages){
//
//     return infoCountry + "\n" + infoCapitel + infoCurrency + "\n" + infoLanguages;
//
//
// }
function createCountryInfoField(result){
    console.log("country");
    // infoContainer.removeChild(landName);
    // infoContainer.removeChild(landNameSubregionPopulation);
    // infoContainer.removeChild(landCapitalCurrency);
    // infoContainer.removeChild(landLanguages);
    // infoContainer.removeChild(flagImage);
    const flagImage = document.createElement("IMG");
    flagImage.src = result.data[0].flag;
    infoContainer.appendChild(flagImage);
    console.log("Hoi2");
    const landName = document.createElement("h1");
    landName.textContent = (result.data[0].name);
    infoContainer.appendChild(landName);

    const landNameSubregionPopulation = document.createElement("p");
    landNameSubregionPopulation.textContent = (createLandPopulationString(result.data[0]));
    infoContainer.appendChild(landNameSubregionPopulation);

    const landCapitalCurrency = document.createElement("p");
    landCapitalCurrency.textContent = (`The capital is ${result.data[0].capital}`) + (createCurrencyString(result.data[0].currencies));
    infoContainer.appendChild(landCapitalCurrency);

    const landLanguages = document.createElement("p");
    landLanguages.textContent = (createLanguageString(result.data[0].languages));
    infoContainer.appendChild(landLanguages);
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


// sla referentie naar de container op