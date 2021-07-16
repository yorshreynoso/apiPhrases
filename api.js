const API_KEY       = '5AUDyEWbhCnpLMLTLCi8D4gT9ANFkw';
const END_POINT     = 'https://friends-quotes-api.herokuapp.com/quotes/2';
const END_POINT2    = 'https://type.fit/api/quotes';
var count           = 1;
var numberQuotesMax = 5;            //number quotes maximum to show on screen

const fetchData     = document.getElementById('fetchData');
const divOfPhrases  = document.getElementById('phrasesDiv');
const refreshData   = document.getElementById('refreshData');
const classesPhr    = document.getElementsByClassName('phrases');
const deleteClass   = document.getElementById('deleteClass');

deleteClass.addEventListener('click', () => {
    while(classesPhr.length > 0){
        classesPhr[0].parentNode.removeChild(classesPhr[0]);
    }
});

fetchData.addEventListener('click', getPhrases);
refreshData.addEventListener('click', refreshPhrases);

/**
 * this function is used to refresh the number of quotes and wiil show the next quotes
 */
function refreshPhrases() {
    count++;
    callApi()
        .then(data      => data.json())
        // .then(dataJson => console.log(dataJson))
        .then(dataJson  => processQuotes(dataJson, count))
        .catch(err      => console.log(`sorry, we couldn't access the API ${err}`));
}

/**
 * show the first quotes on screen, getting from the api
 */
function getPhrases() {
    callApi()
        .then(data      => data.json()) //tamien requiere tiempo para procesar
        .then(dataJson  => processQuotes(dataJson, 1))
        .catch(err      => console.log(`sorry, we couldn't access the API ${err}`));
}

/**
 * 
 * @param {array} quotes    //receive the api  
 * @param {number} count    //counter to show number of quotes on screen
 */
function processQuotes(quotes, count = 1) {
    const max = numberQuotesMax * count ; // 5
    const min = max - numberQuotesMax;    // 0

    deletePhrases();

    for(const [index, prop] of quotes.entries()) {
        if(index >= min && index <= max) {
            showPhrases(index, prop);
        }
        if(index == max) {
            break;
        }
    }
}

function deletePhrases() {
    while(classesPhr.length > 0){
        classesPhr[0].parentNode.removeChild(classesPhr[0]);
    }
}

function showPhrases(index, phrase) {
    const phrasesDiv = `
    <div class='phrases'>
        <div id='${index}'>
            <h1>Phrase #${index}</h1>
            <p>${phrase.text}</p><br>
            <p>Author: ${phrase.author}</p>
        </div>
    </div>
    `;

   divOfPhrases.insertAdjacentHTML('beforeend', phrasesDiv);
}

function callApi() {
    var myHeaders = new Headers();
    const url = `${END_POINT2}`;

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode:   'cors',
        cache:  'default' 
    };

    var myRequest = new Request(url, myInit);
    return new Promise((resolve, reject) => {
        let phrasesRaw = fetch(myRequest);
       
        resolve(phrasesRaw);
    });
}