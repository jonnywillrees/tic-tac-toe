import './style.css'

(function() {

    const winningStates = [
        // 0 index
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]

    const playerOne = {
        status: 'playing',
    }
    
    const playerTwo = {
        status: 'waiting',
    }

    const squareElements = document.querySelectorAll('[data-square]');
    const resetButton = document.getElementById('reset-button');
    const boardEl = document.getElementById('board');
    const infoTextEl = document.getElementById('info-text');

    resetButton.addEventListener('click', () => {
        squareElements.forEach(el => {
            el.classList.remove('x');
            el.classList.remove('o');
        });
        boardEl.classList.remove('overlay');
        infoTextEl.innerText = 'X plays first';

        playerOne.status = 'playing';
        playerTwo.status = 'waiting';
    });
  
    squareElements.forEach(el => {
        el.addEventListener('click', onClickSquare);
    });

    function onClickSquare(event) {
        const element = event.target;

        if (element.classList.contains('x') || element.classList.contains('o')) {
            return false;
        }

        if (playerOne.status === 'playing' && playerTwo.status === 'waiting') {
            element.classList.add('x');
            if (checkForWinCondition('x')) {
                boardEl.classList.add('overlay');
                infoTextEl.innerText = 'PLAYER 1 WINS!';
            }
        } else if (playerOne.status === 'waiting' && playerTwo.status === 'playing') {
            element.classList.add('o');
            if (checkForWinCondition('o')) {
                boardEl.classList.add('overlay');
                infoTextEl.innerText = 'PLAYER 2 WINS!';
            }
        }

        playerOne.status = updatePlayerStatus(playerOne);
        playerTwo.status = updatePlayerStatus(playerTwo);
    }

    function updatePlayerStatus(player) {
        if (player.status === 'waiting') {
            return 'playing';
        } else {
            return 'waiting';
        }
    }

    function checkForWinCondition(currentClass) {
        return winningStates.some(winState => {
            return winState.every(cellIndex => {
                return squareElements[cellIndex].classList.contains(currentClass);
            });
        });
    }

})();
