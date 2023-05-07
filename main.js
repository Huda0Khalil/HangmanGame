//Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//Get array from letters
let lettersArray = Array.from(letters);
//select Letters container
let lettersContainer = document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter => {
    //create span 
    let span = document.createElement("span");
    //create letter text node 
    let theLetter = document.createTextNode(letter);
    //append the letter to span 
    span.appendChild(theLetter);
    //Add class on span
    span.className = "letter-box";
    //append span to the letters container
    lettersContainer.appendChild(span)
});

//object of words + categories
const words = {
    programming: ["php", "JS", "python", "java", "kotlen"],
    movies: ["prestige", "inception", "memento", "parasite"],
    countries: ["syria", "Egypt", "Qatar", "Yemen", "Jordan"],
    computer: ["mouse", "keyboard", "monitor", "laptop", "phone", "printer", "ID Card", "light bulb"]
}

//get random property
let allkeys = Object.keys(words);
//random number depends on keys length
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
//category
let randomPropName = allkeys[randomPropNumber];
console.log(randomPropName);
//category words
let randomPropValue = words[randomPropName];
console.log(randomPropValue);
//random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
console.log(randomValueNumber);
let randomValueValue = randomPropValue[randomValueNumber];
console.log(randomValueValue);

//set category info
document.querySelector(".category span").innerHTML = randomPropName;

//select letters guess element 
let letterGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

//create spans depened on word 
lettersAndSpace.forEach(letter => {
    //create empty span
    let emptySpan = document.createElement("span");
    
    //if letter is space
    if (letter === " "){
        // Add class to span 
        emptySpan.className = "with-space"
    }
    //append span to the letters guess container
    letterGuessContainer.appendChild(emptySpan);
});
// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attempts
let wrongAttempts = 0;
//set correct attempts
let correctAttempts = 0;
//select the draw elements
let draw = document.querySelector(".hangman-draw");

//handle clicking on letters
document.addEventListener("click", (e) => {
     // set the chose status
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
       
        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        //the chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
            //if the clicked letter = to one of the chosen word letter
            if (theClickedLetter == wordLetter){
                
                //set status to correct
                theStatus = true;
                //loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;
                    }
                });
                correctAttempts++;
                console.log(correctAttempts);
            }
            
        });
        //outside loop
        if (theStatus !== true){
            //increase the wrong attempts
            wrongAttempts++;
            //add class wrong on the draw element
            draw.classList.add(`wrong${wrongAttempts}`);
            //play fail sound
            document.getElementById("fail").play(); 
            if (wrongAttempts ===8){
                endGame();
                lettersContainer.classList.add("finished");
            }       
        } else {
            //play success sound
            document.getElementById("success").play();
        } 
        if (correctAttempts === randomValueValue.length){
            succGame();
        }
    }

});

//end game function
function endGame(){
    //create popup div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Game over, the word is ${randomValueValue}`);
    //append text to div
    div.appendChild(divText);
    //add class on div
    div.className = 'popup';
    //append to the body
    document.body.appendChild(div); 
}
function succGame(){
    let div = document.createElement("div");
    let divText;
    if (wrongAttempts <= 1){
       divText = document.createTextNode(`Excellent work, you solveed the puzzle with ${wrongAttempts} wrong attempts `);
    }
    else if(wrongAttempts > 1){
       divText = document.createTextNode(`Good work, you solveed the puzzle with ${wrongAttempts} wrong attempts `);
    }
    div.appendChild(divText);

    div.className = "popup";
    document.body.appendChild(div);

}
