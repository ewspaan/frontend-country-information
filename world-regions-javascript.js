const countryList = document.getElementById("country-list");

const listEvent = document.getElementById('country-list');
listEvent.addEventListener('click', whichElement);

let countryPopulation;


getAllData();


async function getAllData(){
    try{
        const result = await axios.get(`https://restcountries.eu/rest/v2/all`);
        console.log(result);
        const { data } = result;
        console.log(data);
        console.log(data.length);
        data.sort((a,b) => { return a.population - b.population });

        data.map(({name,flag,region}) => {
            //console.log("name--> " , name);
            // console.log("flag--> " , flag);
            // console.log("region--> ", region);
            const countryListElement = document.createElement("li");

            //vlag toevoegen
            const flagImage = document.createElement("img");
            flagImage.setAttribute('src', flag);
            flagImage.setAttribute('width' , "20px");
            countryListElement.appendChild(flagImage);
            //tekst toevoegen
            const countryTextElement = document.createElement("span");
            countryTextElement.setAttribute('id', name);
            countryTextElement.textContent = name;
            function setColorCountry (region){
                switch (region){
                    case("Africa"):
                        countryTextElement.style.color= "#5575C1";
                        break;
                    case("Americas"):
                        countryTextElement.style.color= "#4C824B";
                        break;
                    case("Asia"):
                        countryTextElement.style.color= "#D14E5B";
                        break;
                    case("Europe"):
                        countryTextElement.style.color= "#FFD435";
                        break;
                    case("Oceania"):
                        countryTextElement.style.color= "#A653BA";
                        break;
                    default:
                        countryTextElement.style.color= "#000000";
                        break;
                }
            }
            setColorCountry(region);
            countryListElement.appendChild(countryTextElement);
            countryList.appendChild(countryListElement);
        });
        countryPopulation = data.map(({name,population}) => {
            //console.log("name--> ", data.length);
            // console.log("pop--> ", population);
            return  {name:name, population:population};
            //console.log(countryPopulation[data.index]);
        });

    }
    catch (e){
        console.error(e);
    }
}


function whichElement(e) {
    let targ;
    console.log(e);
    if (e.target && e.srcElement.localName === "span") {
        targ = e.target.id;
        console.log("id1", targ);
        showPopulationCountry(targ);
    }
}

function showPopulationCountry (name){
    let population = 0;

    const populationCountryNode = document.getElementById(name);
    // console.log("c-->",populationCountryNode);
    // console.log("c-->",populationCountryNode.firstChild);
    // console.log("c-->",populationCountryNode.firstChild.firstChild);
    const populationElement = document.createElement("p");
    populationElement.setAttribute("id",name+"a");
    const currentPopulationText = document.getElementById(name+"a");
    if (currentPopulationText == null) {
        for (let i = 0; i < countryPopulation.length; i++) {
            // console.log("c-->",name);
            // console.log("cp-->",countryPopulation[i]);
            if (countryPopulation[i].name === name) {
                population = countryPopulation[i].population;
            }
        }
        populationElement.textContent = `Has a population of ${population} persons`;
        populationCountryNode.appendChild(populationElement);
    }
    else{
       populationCountryNode.removeChild(currentPopulationText);
    }


    console.log("pop-->",population);
    // populationCountry.textContent;

}

