// Find Your Hat is a terminal game where a user can navigate a terminal field in search for a hat. Built as part of Codecademy's JS exercises. v01: 17-Jan-2021 21:23

//Initialize prompt
const prompt = require('prompt-sync')({sigint: true});

//Create field characters
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//Create Field class

class Field{
    constructor(fieldArray){
        this._field = fieldArray;
        this._fieldWidth = 0;
        this._fieldHeight = 0;
        this._row = 0;
        this._col = 0;
        //gameEndState tracks the state of the game to end it when the user 1)falls outside the field, 2)falls in a hole, or 3) successfully finds the hat.
        this._gameEndState = false;
    }
    print(){
        //Print method displays the current field layout. Field arrays are joined as strings.
        let string = '';
        for(let i=0;i<this._field.length;i++){
            string+=this._field[i].join('');
            string+="\n";
        }
        console.log(string);
    }
    findNextPoint(direction){
        //Find next point method determines the next step for the player based on direction parameter. Code needs to be refactored to 1) split point determination and movement impact into separate methods, and 2) to use JS error handling mechanisms to manage game end scenarios.
        let newRow = this._row;
        let newCol = this._col;
        let resultArray =[];
        this._fieldWidth = this._field.length;
        this._fieldHeight = this._field[0].length;

        switch(direction){
            //Switching logic to determine new point based on two-dimensional-arrays indexing.
            case('up'):
                newRow -=1;
                break;
            case('down'):
                newRow +=1;
                break;
            case('right'):
                newCol +=1;
                break;
            case('left'):
                newCol -=1;
                break;
        };

        //Game output scenarios based on next point
        if(this._field[newRow][newCol]===hole){
            console.log('Sorry, you fell in a hole!');
            this._gameEndState = true;
        }
        else if(newRow >= this._fieldWidth || newRow < 0 || newCol >= this._fieldHeight || newCol <0) {
            console.log('Sorry, you moved outside the field!');
            this._gameEndState = true;
        }
        else if(this._field[newRow][newCol]===hat){
            console.log('Congratulations, you found the hat!');
            this._gameEndState = true;
        }
        else{
            resultArray.push(newRow);
            resultArray.push(newCol);
            return resultArray;
        };
    }
    play(){
        //Core game loop. Game runs in a wihle loop based on gameEndState that is adjusted at game output scenarios above.
        while (this._gameEndState===false){
            this.print()
            //print current state. 
            let direction = prompt('In which direction would you like to move? ');
            //prompt user for direction
            let nextPointArray = this.findNextPoint(direction);
            //call findNextPoint to identify next point array.
            this._row = nextPointArray[0];
            this._col = nextPointArray[1];
            //extract next row and next column, assign as current point
            this._field[this._row][this._col] = pathCharacter;
            //mark current point with path character to simulate movement.
        }
    }
    static generateField(height,width){
        //Field generation static method to create field layouts. Could be optimized to deal with edge cases such as overlaps of hats, starting point, and / or holes. Also could add a difficulty parameter to control % of holes in field.
        let hatRow = Math.floor(Math.random() * height);
        let hatCol = Math.floor(Math.random() * width);
        //Create random hat coordinates.
        let field = []
        //initialize new field.
        for(let i =0;i<height;i++){
            //loop through rows
            let tempRow = [];
            let holePos = Math.floor(Math.random() * width); // simulate random hole position, inherently assumes 1 hole per column.
            while (tempRow.length < width){
                // logic to add holes in hole positions, and fill other fields with field characters.
                if(tempRow.width === holePos -1){
                    tempRow.push(hole);
                }
                else{
                    tempRow.push(fieldCharacter);   
                };
            };
        field.push(tempRow); // add row to 2-dimensional-array.
        };
        field[hatRow][hatCol] = hat; // replace hat position content with hat.
        field[0][0] = pathCharacter; // initialize the top-left corner as starting point. This could be randomized for more interesting game play.
        return field;
    };
}

const layout = Field.generateField(4,4);
const myField = new Field(layout);
myField.play()
