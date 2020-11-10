const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', logMouse);

const searchContainer = document.getElementById("search-field")
searchContainer.addEventListener('keyup', logKey);

const infoContainer = document.getElementById("country-info");
const backGround = document.getElementById("body-index");




// Fake een event
const elem = document.getElementById('search-button');
let click = 0;

elem.addEventListener('click', function(e) {
    if(click === 0) {
        searchCountry("Nederland");
        console.log("fake event 2");
    }
});

setTimeout(function() {
    console.log("fake event 1");
    elem.dispatchEvent(new Event('click'));
    click++
}, 100);



function logKey(e) {
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
function removeOldData(oldDataCheck,nodeToBeRomoved){
    // const oldDataCheck2 = document.getElementById("container-back-ground");
    if(oldDataCheck){
        nodeToBeRomoved.removeChild(oldDataCheck);
    }
}

async function searchCountry(text) {

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    const oldDataCheck = document.getElementById("country");
    const oldDataCheckBackGround = document.getElementById("container-back-ground");


    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${text}`);
        console.log("text in try = " + text);
        console.log(result);
        removeOldData(oldDataCheck,infoContainer);
        removeOldData(oldDataCheckBackGround,backGround);
        createCountryInfoField(result);
    }
    catch (e) {
        console.error(e);
        errorMessage.textContent = "Country doesn't exist.";
        }

}

function createCountryInfoField(result){

    const country = document.createElement("div");
    country.setAttribute("id","country");

    const backGroundText = document.createElement( "div");
    backGroundText.setAttribute("id", "container-back-ground");
    backGroundText.textContent = (backGroundNames(result.data[0].translations));
    console.log("--> " + backGroundNames(result.data[0].translations));
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
    landCapitalCurrency.textContent = (`The capital is ${result.data[0].capital}`) + createStringFromObject((result.data[0].currencies), " and you can pay with ");
    country.appendChild(landCapitalCurrency);

    const landLanguages = document.createElement("p");
    //landLanguages.textContent = (createLanguageString(result.data[0].languages));
    landLanguages.textContent = createStringFromObject((result.data[0].languages), "They speak ");
    country.appendChild(landLanguages);

    infoContainer.appendChild(country);

}


function createLandPopulationString(land){
    return (`${land.name} is situated in ${land.subregion}. It has a population of ${land.population} people.`);
}


function backGroundNames(names){
    let namesString = "";
    let i = ""
    for (let a = 0; a < 5 ;a++) {
        for (i in names) {
            namesString += names[i]+ "  ";
        }
    }
    return namesString;
}

function createStringFromObject(array,beginString) {

    //console.log("csfo--> ", array, array.length);
    let stringCreated = beginString;
    //console.log("cstring2--> ", stringCreated , beginString);
    let languagesArray = [];
    for (let i =0; i <array.length;i++){
        //console.log("arrayinfor--> ", array[i].name);
        languagesArray[i] = array[i].name;
    }
    //console.log("arrayna--> ", languagesArray);
    for (let i = 0; i < languagesArray.length; i++) {
        if (languagesArray.length === 1) {
            stringCreated += languagesArray[i] + ".";
            //console.log("cstring--> ", stringCreated);
            return stringCreated;
        }
        if (i === languagesArray.length - 2) {
            stringCreated += languagesArray[languagesArray.length - 2] + " and " + languagesArray[languagesArray.length - 1] + ".";
            //console.log("cstring--> ", stringCreated);
            return stringCreated;
        } else {
            stringCreated += array[i] + ", ";
        }
    }
}

//Onnodige functies na samenvoeging
// function createCurrencyString(currency){
//     let currencyArray = [];
//     for (let i =0; i <currency.length;i++){
//         currencyArray[i] = currency[i].name+ "'s";
//     }
//     return createStringFromArray(currencyArray," and you can pay with ");
// }
// function createLanguageString(language){
//     let languagesArray = [];
//     for (let i =0; i <language.length;i++){
//         languagesArray[i] = language[i].name;
//     }
//     return createStringFromArray(languagesArray,"They speak  ");
// }
// function createStringFromArray(array,beginString) {
//     let stringCreated = beginString;
//     for (let i = 0; i < array.length; i++) {
//         if (array.length === 1) {
//             stringCreated += array[i] + ".";
//             return stringCreated;
//         }
//         if (i === array.length - 2) {
//             stringCreated += array[array.length - 2] + " and " + array[array.length - 1] + ".";
//             return stringCreated;
//         } else {
//             stringCreated += array[i] + ", ";
//         }
//     }
// }
