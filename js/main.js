// Notes
    // Notation: designed as (rows, columns), not (columns, rows).
    // Notation: up = 1, right = 2, down = 3, left = 4.

// Variables

    let direction = Math.floor(Math.random()*4 +1);
    let boxesTravelled = 0, fadeSnake, lostMessage, movementInterval, n= 150, score = 0, gameActive, playerLost;
    let snakePosition = [];

//Cached Element References

    const board = document.getElementById('board');
    const scoreEl = document.getElementById('score');
    const difficultyTitleEl = document.getElementById('difficulty-title');
    const difficultyBarEl = document.getElementById('difficulty-bar');
    const resetBtn = document.getElementById('resetBtn');
    const modalFinalScore = document.getElementById('modal-final-score');
    const restartBtn = document.getElementById('restartBtn');

// Event Listeners

    //Add event listeners to keyboard arrows to modify the direction of the snake
    document.addEventListener('keydown', event => changeDirection(event.keyCode))
    resetBtn.addEventListener('click', init)
    restartBtn.addEventListener('click', init)

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

    function expandSnake(arr, x, oldBox) {
        switch(direction) {
            case 1:
                for(let i = 1; i <x; i++){
                    let rIdx = parseInt(arr[0])-i;
                    let cIdx = parseInt(arr[1]);
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    evaluateNextCell(newBox, oldBox);
                }
                break;
            case 2: 
                for(let i = 1; i <x; i++){
                    let rIdx = parseInt(arr[0]);
                    let cIdx = parseInt(arr[1])+i;
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    evaluateNextCell(newBox, oldBox);
                }
                break;
            case 3: 
                for(let i = 1; i < x; i++){
                    let rIdx = parseInt(arr[0])+i;
                    let cIdx = parseInt(arr[1]);
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    evaluateNextCell(newBox, oldBox);
                }
                break;
            case 4: 
                for(let i = 1; i < x; i++){
                    let rIdx = parseInt(arr[0]);
                    let cIdx = parseInt(arr[1])-i;
                    let newBox = document.getElementById(`${rIdx}-${cIdx}`);
                    evaluateNextCell(newBox, oldBox);
                }
                break;
        }
    }

// Functions

    //Create all the boxes inside the board
    function createBoxes () {
        for (let i = 0; i < 400; i++) {
            let box = document.createElement('div');
            box.id = `${Math.floor(i/20)}-${i%20}`;
            board.appendChild(box);
        }
        console.log(board)
    }

    //Activate 4 random consecutive boxes to create the snake
    function createSnake() {
        let box = selectBox(generateStartIndex());
        if (box.className){
            return createSnake();
        } else {
            box.className = 'active';
        }
        snakePosition.push(box.id);
        
        let id = box.id;
        const idArr = id.split("-");
        expandSnake(idArr, 4);
        console.log(snakePosition);
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

        //Place a bonus item on the board
        function placeBonus() {
            if(score > 0 && (score/100)%10 ===0){
                let box = selectBox(generateFoodIndex());
                if (box.className){
                    return placeBonus();
                } else {
                    box.className = 'has-bonus';
                    boxesTravelled = 0;
                }
            }
        }

    //write direction logic to change the direction of the snake only if new direction is valid
    function changeDirection (key) {
        if (playerLost) {
            return;
        }

        //Call moveSnake function every n seconds
        if (!gameActive) {
            if (
                (key === 37 && direction === 2) || 
                (key === 38 && direction === 3) || 
                (key === 39 && direction === 4) || 
                (key === 40 && direction === 1)) {
                return;
            } 
            else {    
            movementInterval = window.setInterval(moveSnake, n);
            }
        }
        gameActive = true;
        if (key === 37) {
            if(direction === 4) {
                return;
            }
            if(direction !== 2) {
                direction = 4;
                moveSnake();
                clearInterval(movementInterval);
                movementInterval = window.setInterval(moveSnake, n);
            }
        } else if (key === 38) {
            if(direction === 1) {
                return;
            }
            if(direction !== 3) {
                direction = 1;
                moveSnake();
                clearInterval(movementInterval);
                movementInterval = window.setInterval(moveSnake, n);
            }
        } else if (key === 39) {
            if(direction === 2) {
                return;
            }
            if(direction !== 4) {
                direction = 2;
                moveSnake();
                clearInterval(movementInterval);
                movementInterval = window.setInterval(moveSnake, n);
            }
        } else if (key === 40) {
            if(direction === 3) {
                return;
            }
            if(direction !== 1) {
                direction = 3;
                moveSnake();
                clearInterval(movementInterval);
                movementInterval = window.setInterval(moveSnake, n);
            }
        }
    }

    //Move Snake (push and pop box classes)
    function moveSnake() {
        const oldBox = snakePosition[0].split("-");
        const arr = snakePosition[snakePosition.length-1].split("-");
        console.log(snakePosition, arr, oldBox);
        expandSnake(arr,2, oldBox);
        if (!playerLost){
            const removeBox = snakePosition.splice(0,1);
            document.getElementById(removeBox[0]).className = '';
        }
    }

    function evaluateNextCell (box, oldBox) {
        if(playerLost) {
            return;
        }

        if (!box) {
            snakeCrashed();
            return;
        }
        if(box.className === 'active') {
            snakeCrashed();
            return;
        }
        if(box.className === 'has-bonus') {
            let n2 = Math.max(0, 20 - boxesTravelled);
            console.log(`${n2} boxes deleted!`);
            for(let i=0; i < n2; i++){
                if(snakePosition.length >= 4){
                    let lastBox = snakePosition.splice(0,1);
                    selectBox(lastBox).className = '';
                }
            }
            
        }
        evaluateScore(box, oldBox);
        box.className = 'active';
        snakePosition.push(box.id);
        boxesTravelled++;
    }

    // Write "win" logic. Add 100 points to counter when cell changes from "has-food" class to "active".
    function evaluateScore(box, oldBox) {
        if (box.className === 'has-food') {
            let oldBoxString = oldBox.join("-");
            selectBox(oldBoxString).className = 'active';
            snakePosition.unshift(oldBoxString);
            score = score + 100;
            scoreEl.innerHTML = score;
            n = Math.max(n-1,50);
            updateDifficultyBar();
            placeFood();
            placeBonus();
        }
    }

    //Write loose logic
    function snakeCrashed() {
        clearInterval(movementInterval);
        gameActive = false;
        playerLost = true;
        modalFinalScore.innerHTML = `Better luck next time! Final score: ${score}pts.`;
        $('#exampleModal').modal('show');
        fadeSnake = window.setInterval(function() {
            if(snakePosition.length > 0){
                let lastBox = snakePosition.pop();
                console.log(lastBox);
                selectBox(lastBox).className = ''
            } else {
                clearInterval(fadeSnake);
            }
        },100)
    }

    //Change color of diffculty based on game speed
    function updateDifficultyBar() {
        if (n <= 50) {
            difficultyTitleEl.style.color = "#D00000";
            difficultyTitleEl.innerHTML = "Difficulty: Hard"
            difficultyBarEl.style.backgroundColor = "#D00000";
            difficultyBarEl.setAttribute("style",`width: ${151-(n+1)}%`)
        } else if (n <= 100) {
            difficultyTitleEl.style.color = "#DC2F02";
            difficultyTitleEl.innerHTML = "Difficulty: Medium"
            difficultyBarEl.style.backgroundColor = "#DC2F02";
            difficultyBarEl.setAttribute("style",`width: ${151-(n+1)}%`)
        } else if (n <= 150) {
            difficultyTitleEl.style.color =  "#E85D04";
            difficultyTitleEl.innerHTML = "Difficulty: Easy"
            difficultyBarEl.style.backgroundColor = "#E85D04";
            difficultyBarEl.setAttribute("style",`width: ${151-(n+1)}%`)
        }
    }

    //Initialize game function
    function init() {
        clearInterval(movementInterval);
        clearInterval(fadeSnake);
        gameActive = false;
        playerLost = false;
        score = 0;
        boxesTravelled = 0;
        n = 150;
        scoreEl.innerHTML = score;
        direction = Math.floor(Math.random()*4 +1);
        difficultyBarEl.setAttribute("style",`width: 0%`)
        board.innerHTML = "";
        if(snakePosition.length >0){
            snakePosition = [];
        }
        createBoxes();
        createSnake();
        placeFood();
    }

    init();