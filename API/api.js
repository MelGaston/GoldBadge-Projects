var baseURL= "https://images-api.nasa.gov/search";
// var key="0P0nPA7mzrOvH6lDLiMFDOozBG2SAVOYNOBgqP3N"
var url;

var spaceSearch = document.querySelector('.spaceSearch');
var searchForm = document.querySelector('form');
var submitBtn = document.querySelector('.submit');
var nav = document.querySelector('nav');
var section = document.querySelector('section');
var cardImg1 = document.querySelector('#pic1');
var cardImg2 = document.querySelector('#pic2');
var cardImg3 = document.querySelector('#pic3');
var cardDesc1 = document.querySelector('#text1');
var cardDesc2 = document.querySelector('#text2');
var cardDesc3 = document.querySelector('#text3');

nav.style.display = 'none';
section.style.display = 'none';

searchForm.addEventListener('submit', submitSearch);

function submitSearch(e){
    fetchResults(e);
}

function fetchResults(e) {
    e.preventDefault();
    
    if(spaceSearch.value !== '') {
        url = baseURL + '?q=' + spaceSearch.value + "&media_type=image";
    };

    fetch(url) 
    .then(function(result) {
        return result.json();
    })
    .then(function(json) {
        displayResults(json);
    });
}

function displayResults(json) {
    let pics = json.collection.items;
    var imageHolder = [];
    var descHolder = [];

    var rando = Math.floor(Math.random() * (pics.length-3));
    
    imageHolder.push(pics[rando].links[0].href);
    imageHolder.push(pics[rando+1].links[0].href);
    imageHolder.push(pics[rando+2].links[0].href);
    descHolder.push(pics[rando].data[0].title);
    descHolder.push(pics[rando+1].data[0].title);
    descHolder.push(pics[rando+2].data[0].title);

    for(i=0;i<imageHolder.length;i+=3) {
        cardImg1.src = imageHolder[i];
        cardImg2.src = imageHolder[i+1];
        cardImg3.src = imageHolder[i+2];
        cardDesc1.innerHTML = descHolder[i];
        cardDesc2.innerHTML = descHolder[i+1];
        cardDesc3.innerHTML = descHolder[i+2];
    }

    if(cardImg1.src != "") {
        section.style.display = 'flex';
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
}

function resetResults () {
    cardImg1.src = "";
    cardImg2.src = "";
    cardImg3.src = "";
    cardDesc1.innerHTML = "";
    cardDesc2.innerHTML = "";
    cardDesc3.innerHTML = "";
    searchForm.reset();
    imageHolder = [];
    descHolder = [];

    nav.style.display = 'none';
    section.style.display = 'none';
}