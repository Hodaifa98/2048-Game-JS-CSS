document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;

    // Add event listener to detect key touches on the keyboard.
    document.addEventListener('keyup', control);

    // Create a playing board.
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            let square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        // Generate the first twos in the board.
        generate();
        generate();
    }

    // Create board.
    createBoard();

    // Generate a random number.
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForLose();
        } else generate();
    }

    // Swipe right.
    function moveRight() {
        for (let i = 0; i < width*width; i++) {
            if (i % 4 === 0) {
                let totalOne = parseInt(squares[i].innerHTML);
                let totalTwo = parseInt(squares[i+1].innerHTML);
                let totalThree = parseInt(squares[i+2].innerHTML);
                let totalFour = parseInt(squares[i+3].innerHTML);
                let row = [totalOne, totalTwo, totalThree, totalFour];
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe left.
    function moveLeft() {
        for (let i = 0; i < width*width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe Down.
    function moveDown() {
        for (let i = 0; i < width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+(width*2)].innerHTML;
                let totalFour = squares[i+(width*3)].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredColumn= column.filter(num => num);
                let missing = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = filteredColumn.concat(zeros);
                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+(width*2)].innerHTML = newColumn[2];
                squares[i+(width*3)].innerHTML = newColumn[3];
            }
        }
    }

    // Swipe Up.
    function moveUp() {
        for (let i = 0; i < width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+(width*2)].innerHTML;
                let totalFour = squares[i+(width*3)].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredColumn= column.filter(num => num);
                let missing = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = zeros.concat(filteredColumn);
                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+(width*2)].innerHTML = newColumn[2];
                squares[i+(width*3)].innerHTML = newColumn[3];
            }
        }
    }

    // Combine the numbers in a row.
    function combineRow() {
        for (let i = 0; i < width*width-1; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = 
                    parseInt(squares[i].innerHTML) + 
                    parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // Combine the numbers in a column.
    function combineColumn() {
        for (let i = 0; i < width*3; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                let combinedTotal = 
                    parseInt(squares[i].innerHTML) + 
                    parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // When a player clicks on the Right Arrow.
    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    // When a player clicks on the Left Arrow.
    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    // When a player clicks on the Down Arrow.
    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    // When a player clicks on the Up Arrow.
    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    // Handle the keypress on the keyboard.
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if(e.keyCode === 37) {
            keyLeft();
        } else if(e.keyCode === 40) {
            keyDown();
        } else if(e.keyCode === 38) {
            keyUp();
        }
    }

    // Check if the player has won by searching for a 2048 in the board.
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            const total = squares[i].innerHTML;
            if (total == 2048) {
                resultDisplay.innerHTML = 'You win!';
                document.removeEventListener('keyup', control);
            }
        }
    }

    // Check for the player lose.
    function checkForLose() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            const total = squares[i].innerHTML;
            if (total == 0) {
                squares[i].style.backgroundColor = '#4150fa';
                squares[i].style.color = '#4150fa';
                zeros++;
            } else {
                squares[i].style.backgroundColor = '#88FFF7';
                squares[i].style.color = 'black';
            }
        }
        
        // If there are no zeros in the board, then the player has lost.
        if(zeros === 0) {
            resultDisplay.innerHTML = 'You Lose!';
            document.removeEventListener('keyup', control);
        }
    }
});