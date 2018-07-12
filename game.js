const cardsColor = ["red","red", "yellow","yellow", "blue","blue","brown","brown","gray","gray","cadetblue","cadetblue","violet","violet","lightgreen","lightgreen","green","green"];
//pobieramy nasze wszystkie divy
let cards = document.querySelectorAll("div");
//w konsoli wyswietli nam sie lista ktora musimy przerobic na tablice 
//console.log(cards);
//przerabiamy liste na tablice
cards = [...cards];
//console.log(cards);
//sprawdzamy w konsoli czy nasze cards rzeczywiscie sa instancja tablicy czyli array
//console.log(cards instanceof Array);


//chcemy by po starcie gry zaczelo sie naliczanie czasu za pomoca metody getTime
const startTime = new Date().getTime();
let activeCard = "";
const activeCards = [];

const gamePairs = cards.lenght/2;
let gameResult = 0;

const clickCard = function(){
//console.log("klikanie dziala");
activeCard = this;
activeCard.classList.remove("hidden");

if(activeCards.length === 0){
    activeCards[0] = activeCard;
    return;
}
else {
    cards.forEach(card => card.removeEventListener("click",clickCard))
    activeCards[1]= activeCard;
    setTimeout(function(){  
    if(activeCards[0].className === activeCards[1].className){
       console.log("Wygrana")
       activeCards.forEach(card => card.classList.add("off"))
    
       gameResult++;
       if ( gameResult == gamePairs){
           console.log("WYGRANA")
       }
    }
    else{
        console.log("Przegrana")
        activeCards.forEach(card => card.classList.add("hidden"))
    }
    
    activeCard = "";
    activeCards.length = 0;
    cards.forEach(card => card.addEventListener("click", clickCard))
},1000)
}
}




// nadajemy kolory naszej tablice ktore beda losowe,musimy wylosowac kolory
const init = function () {
    //cards.forEach(function (card) zapis ES5
    cards.forEach(card => {
    //losujemy pozycje z tablicy
        const position = Math.floor(Math.random()*
        cardsColor.length);
        //przypisanie wylosowanej klasy do elementu
        card.classList.add(cardsColor[position]);
        //musimy usnac element ktory wylosowalismy metoda splice
        cardsColor.splice(position, 1);
   })
   //po czasie chcemy ukryc elementy na 2sek
   setTimeout(function(){
       cards.forEach(card => {
           card.classList.add("hidden")
           //ustawiamy nasluchiwanie na klikniecie zeby mozna bylo kliknac w element
           card.addEventListener("click",clickCard)
       })
   },2000)
}

init()