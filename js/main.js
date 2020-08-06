// Variables



//Cached Element References

const board = document.getElementById('board');

// Event Listeners



// Functions



//Create all the boxes inside the board

function createBoxes () {
    console.log(board)
    for (let i = 0; i < 400; i++) {
        let box = document.createElement('div');
        box.className = `${Math.floor(i/20)}-${i%20}`;
        board.appendChild(box);
    }
}


function init() {
    createBoxes();

}

init();

//Define active/Inactive/has-food classes in css

//Activate the inital boxes (create snake)

//generate 2 random numbers to place "food" in the board

//write timed logic to "move the snake" by activating/inactivating boxes.

//Add event listeners to keyboard arrows to modify the direction (i,j counters) of the snake

//write direction logic to change the direction of the snake

// Write "win" logic. Add 1 point to counter when cell changes from "has-food" class to "active" class. 

//write "loose" logic when "next-box" is undefined.