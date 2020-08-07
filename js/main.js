// Notes
    // Notation: designed as (rows, columns), not (columns, rows).

// Variables

    let direction = Math.floor(Math.random()*4 +1);
    let gameActive;

//Cached Element References

    const board = document.getElementById('board');

// Event Listeners

    document.addEventListener('keydown', event => changeDirection(event.keyCode))

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

    function expandSnake(arr) {
        switch(direction) {
            case 1:
                for(let i = 1; i <4; i++){
                    let rIdx = parseInt(arr[0])+i;
                    let cIdx = parseInt(arr[1]);
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    newBox.className = 'active';
                }
                break;
            case 2: 
                for(let i = 1; i <4; i++){
                    let rIdx = parseInt(arr[0]);
                    let cIdx = parseInt(arr[1])+i;
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    newBox.className = 'active';
                }
                break;
            case 3: 
                for(let i = -1; i > -4; i--){
                    let rIdx = parseInt(arr[0])+i;
                    let cIdx = parseInt(arr[1]);
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    newBox.className = 'active';
                }
                break;
            case 4: 
                for(let i = -1; i > -4; i--){
                    let rIdx = parseInt(arr[0]);
                    let cIdx = parseInt(arr[1])+i;
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    newBox.className = 'active';
                }
                break;
        }
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

    //Activate 4 random consecutive boxes to create the snake

    function createSnake() {
        let box = selectBox(generateStartIndex());
        if (box.className){
            return createSnake();
        } else {
            box.className = 'active';
        }
        
        let id = box.id;
        const idArr = id.split("-");
        console.log(parseInt(idArr[0]));
        expandSnake(idArr);
    }

    //Place a food item on the board

    function placeFood() {
        let box = selectBox(generateFoodIndex());
        if (box.className){
            return placeFood();
        } else {
            box.className = 'has-food';
        }
    }

    function changeDirection (key) {
        if (!gameActive) {
            gameActive = true;
        }
        if (key === 37) {
            direction = 4;
        } else if (key === 38) {
            direction = 1;
        } else if (key === 39) {
            direction = 2;
        } else if (key === 40) {
            direction = 3;
        }
    }

    //Initialize game function

    function init() {
        let gameActive = false;
        direction = Math.floor(Math.random()*4 +1);
        
        createBoxes();
        createSnake();
        placeFood();
    }

    init();



//write timed logic to "move the snake" by activating/inactivating boxes.

//Add event listeners to keyboard arrows to modify the direction (i,j counters) of the snake

//write direction logic to change the direction of the snake

// Write "win" logic. Add 1 point to counter when cell changes from "has-food" class to "active" class. 

//write "loose" logic when "next-box" is undefined.