function Boggle(){
  this.grid = [
              [null,null,null,null],
              [null,null,null,null],
              [null,null,null,null],
              [null,null,null,null]
                                  ];

   this.cubes =[
               ["A","A","E","E","G","N"],
               ["E","L","R","T","T","Y"],
               ["A","O","O","T","T","W"],
               ["A","B","B","J","O","O"],
               ["E","H","R","T","V","W"],
               ["C","I","M","O","T","U"],
               ["D","I","S","T","T","Y"],
               ["E","I","O","S","S","T"],
               ["D","E","L","R","V","Y"],
               ["A","C","H","O","P","S"],
               ["H","I","M","N","Q","U"],
               ["E","E","I","N","S","U"],
               ["E","E","G","H","N","W"],
               ["A","F","F","K","P","S"],
               ["H","L","N","N","R","Z"],
               ["D","E","I","L","R","X"]
                                       ];

  this.won    = false;
  this.lost   = false;

  this._createGrid(this._randomiseLetters());

};



Boggle.prototype._randomiseLetters = function(){
    var shuffledCubes = _.shuffle(this.cubes);
    var shuffledLetters = [];
    for(var i = 0; i<this.cubes.length; i++){
      var temp = _.shuffle(shuffledCubes[i]);
      shuffledLetters.push(temp[0]);
    }
console.log(shuffledLetters);
    return shuffledLetters;
};

Boggle.prototype._createGrid = function(shuffledLetters){
  var l = 0;
  for(var j = 0; j<this.grid.length; j++){
    for(k = 0; k<this.grid.length; k++){
      this.grid[j][k]=shuffledLetters[l];
      l++;
    }
  }
  console.log(this.grid);
  return this.grid;
};


Boggle.prototype._checkWord = function(){

};

Boggle.prototype._countdown = function(){

  // timer here doesn't start, pause, or stop timer

};

Boggle.prototype.submit = function(){

};
