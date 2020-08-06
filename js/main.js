// Notes
    // Notation: designed as (rows, columns), not (columns, rows).

// Variables



//Cached Element References

    const board = document.getElementById('board');

// Event Listeners



// Helper Functions

    function selectBox(boxIndex){
        return document.getElementById(boxIndex);
    }

    function generateFoodIndex () {
        const r = Math.floor(Math.random()*20);
        const c = Math.floor(Math.random()*20);
        const boxIndex = r.toString() + '-' + c.toString();
        return boxIndex;
    }

    function generateStartIndex() {
        const r = Math.floor(Math.random()*12 + 4);
        const c = Math.floor(Math.random()*12 + 4);
        const boxIndex = r.toString() + '-' + c.toString();
        return boxIndex;
    }

// Functions



    //Create all the boxes inside the board

    function createBoxes () {
        console.log(board)
        for (let i = 0; i < 400; i++) {
            let box = document.createElement('div');
            box.id = `${Math.floor(i/20)}-${i%20}`;
            board.appendChild(box);
        }
    }

    //Place a food item on the board

    function placeFood() {
        let box = selectBox(generateFoodIndex());
        if (box.className){
            return placeFood();
        } else {
            box.className = 'has-food';
        }
        return;
    }

    function createSnake() {
        let box = selectBox(generateStartIndex());
        if (box.className){
            return createSnake();
        } else {
            box.className = 'active';
        }
        return;
    }

    //Initialize game function

    function init() {
        createBoxes();

    }

    init();

//Activate the inital boxes (create snake)


//write timed logic to "move the snake" by activating/inactivating boxes.

//Add event listeners to keyboard arrows to modify the direction (i,j counters) of the snake

//write direction logic to change the direction of the snake

// Write "win" logic. Add 1 point to counter when cell changes from "has-food" class to "active" class. 

//write "loose" logic when "next-box" is undefined.