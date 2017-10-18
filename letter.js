var Letter = function(ltr) {
 

  this.appear = false;
  this.letter = ltr;
 

  this.letterRender = function() {
    if(this.letter == " "){ 
      
      this.appear = true;
      return " ";
    }if(this.appear === false){ 
      return  " _ ";
    } else{ 
      return this.letter;
    }

  };
};


module.exports = Letter;