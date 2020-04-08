'use strict';

var wordList =           
    [
        "BULLS",
        "BLACKHAWKS",
        "FIRE",
        "CUBS",
        "WHITESOX",
        "BEARS",
        "OHARE",
        "PORTILLOS",
        "GIORDANOS",
        "MIDWAY",
        "LIGHTFOOT",
        "OBAMA",
        "LAKEVIEW",
        "WRIGLEYVILLE",
    ];

const maxGuesses = 10;          
var guessedLetters = [];       
var word;           
var guessingWord = [];         
var remainingGuesses = 0;       
var finish = false;        
var wins = -1;      

var winSound = new Audio('./assets/sounds/winner.wav');
var loseSound = new Audio('./assets/sounds/loser.wav');


function reset() {
    remainingGuesses = maxGuesses;


    word = Math.floor(Math.random() * (wordList.length));

    guessedLetters = [];
    guessingWord = [];


    for (var i = 0; i < wordList[word].length; i++) {
        guessingWord.push("_");
    }   

    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    document.getElementById("Word").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};


function evaluateGuess(letter) {
    
    var places = [];

    for (var i = 0; i < wordList[word].length; i++) {
        if(wordList[word][i] === letter) {
            places.push(i);
        }
    }

    if (places.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < places.length; i++) {
            guessingWord[places[i]] = letter;
        }
    }
};
function win() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        finish = true;
        winSound.play();
    }
};


function loss()
{
    if(remainingGuesses <= 0) {
        finish = true;
        loseSound.play();
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


document.onkeydown = function(event) {
    if(finish) {
        reset();
        finish = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            win();
            loss();
        }
    }
};