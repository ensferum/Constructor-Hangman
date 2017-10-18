var isLetter = require("is-letter");
var inquirer = require("inquirer");

var Word = require("./word.js");
var Game = require("./game.js");








require("events").EventEmitter.prototype._maxListeners = 100;



var hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  
  lettersGuessed: [],
  
  display: 0,
  currentWord: null,
 
  startGame: function() {
    var that = this;
  
    if(this.lettersGuessed.length > 0){
      this.lettersGuessed = [];
    }

    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("Ok, exiting the game");
      }
    })},
 
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("Try to guess the correct names of different shark species!");
      console.log("~~~~~~~~~~~~~~~~~~");
      
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      
      console.log(this.currentWord.wordRender());
      this.promptUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  promptUser : function(){
    var that = this;
   
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
     
      var letterReturned = (ltr.chosenLtr).toUpperCase();
     
      var guessedAlready = false;
        for(var i = 0; i<that.lettersGuessed.length; i++){
          if(letterReturned === that.lettersGuessed[i]){
            guessedAlready = true;
          }
        }
       
        if(guessedAlready === false){
          that.lettersGuessed.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
         
          if(found === 0){
            console.log("Wrong Guess");
            that.guessesRemaining--;
            that.display++;
            console.log("Guesses remaining: " + that.guessesRemaining);
           

            console.log(that.currentWord.wordRender());

            console.log("Letters guessed: " + that.lettersGuessed);
          } else{
            console.log("Correct!");
          
              if(that.currentWord.didWeFindTheWord() === true){
                console.log(that.currentWord.wordRender());
                console.log("You Win!");
                
              } else{
                
                console.log("Guesses remaining: " + that.guessesRemaining);
                console.log(that.currentWord.wordRender());
  
                console.log("Letters guessed: " + that.lettersGuessed);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.promptUser();
          }else if(that.guessesRemaining === 0){
            console.log("You Lose! Game over!");
            console.log("The word is: " + that.currentWord.word);
          }
        } else{
            console.log("You have already guessed that letter")
            that.promptUser();
          }



    });
  }
}

hangman.startGame();
