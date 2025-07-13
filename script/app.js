function init() {
    const squareElm = document.querySelectorAll('.square')
    const closeBtn = document.querySelector('#close')
    const messageBoxElm = document.querySelector('#message-box')
    const messageElm = document.querySelector('#message')
    const restartBtn = document.querySelector('#resetButton')
    const questionMarkBtn = document.querySelector('#question-mark')
    let mainBoard = ['', '', '', '', '', '', '', '', '']
    let innerBoard = Array.from({ length: 9 }, () => ({
        cells: Array(9).fill(''),
        winner: false,
        tie: false
    }));

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let turn = 'X'
    let winner = false
    let tie = false
    let activeBoardIndex = null // user can play anywhere



    function createGrid() {

        squareElm.forEach((outerSquare, outerIndex) => {

            // if (!innerBoard[outerIndex].winner && !innerBoard[outerIndex].tie) {
            outerSquare.innerHTML = ''
            // }
            
            outerSquare.classList.remove('active')
            //  highligh the active board
            if (!innerBoard[outerIndex].winner && !innerBoard[outerIndex].tie) {
                if (activeBoardIndex === null || outerIndex === activeBoardIndex) {
                    
                    outerSquare.classList.add('active')
                }
            }
            
            if (innerBoard[outerIndex].winner) {
                outerSquare.innerHTML = mainBoard[outerIndex]
                outerSquare.classList.add('change')
                return
            }
            if (innerBoard[outerIndex].tie) {
                outerSquare.innerHTML = mainBoard[outerIndex]//'⛔'
                outerSquare.classList.add('tie')
                return
            }

            for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
                const innerSquare = document.createElement('div')
                innerSquare.classList.add('innerSquare')
                innerSquare.dataset.outer = outerIndex
                innerSquare.dataset.inner = innerIndex
                innerSquare.textContent = innerBoard[outerIndex].cells[innerIndex]
                innerSquare.addEventListener('click', handleClick)
                outerSquare.appendChild(innerSquare)
            }

        })

    }


    function updateStatus() {
        if (!winner && !tie) {
            messageElm.textContent = `${turn}'s turn`
        }
        else if (!winner && tie) {
            messageElm.textContent = " It's a tie"
        }
        else {
            messageElm.textContent = '🎉 Congratulation to ' + turn + ' you are the winner!'
        }

    }


    function placePiece(index1, index2) {
        innerBoard[index1].cells[index2] = turn
    }

    function turnSwitch() {
        if (!winner) {
            if (turn === 'X') {
                turn = 'O'
            } else {
                turn = 'X'
            }
        }
        else {
            return
        }
    }

    function checkInnerWinner() {
        innerBoard.forEach((board, boadIndex) => {
            if (board.winner) {
                return
            }
            for (let i = 0; i < winningCombos.length; i++) {
                let combo = winningCombos[i]

                if (board.cells[combo[0]] !== '' &&
                    board.cells[combo[0]] === board.cells[combo[1]] &&
                    board.cells[combo[1]] === board.cells[combo[2]]) {
                    board.winner = true
                    mainBoard[boadIndex] = board.cells[combo[0]]
                    return

                }

            }
        })


    }

    function checkInnerTie() {
        for (let i = 0; i < 9; i++) {
            if (innerBoard[i].winner ) {
                continue
            } if (innerBoard[i].cells.every(cell => cell !== '')) {
                innerBoard[i].tie = true
                mainBoard[i] = ''

            }
        }


    }
    function checkOuterWinner() {
        for (let i = 0; i < winningCombos.length; i++) {
            let combo = winningCombos[i]

            if (mainBoard[combo[0]] !== '' &&
                mainBoard[combo[0]] === mainBoard[combo[1]] &&
                mainBoard[combo[1]] === mainBoard[combo[2]]) {
                winner = true
                return
            }
        }
    }

    function checkOuterTie() {
        if (winner) {
            return
        }
        if (mainBoard.every(bourd => bourd !== '')) {
            tie = true
        }
    }

    function showInstructions() {
        messageBoxElm.classList.remove('hide')
    }


    function hideIstructions() {
        messageBoxElm.classList.add('hide')

    }

    function handleClick(event) {
        if(winner || tie) return

        let outerSquareIndex = parseInt(event.target.dataset.outer)
        let innerSquareIndex = parseInt(event.target.dataset.inner)
        let board = innerBoard[outerSquareIndex]
        // if this board is not active, ignore the click 
        if (activeBoardIndex !== null && activeBoardIndex != outerSquareIndex && !innerBoard[activeBoardIndex].winner && !innerBoard[activeBoardIndex].tie) {
            return
        }
        if (board.cells[innerSquareIndex] !== '' || board.winner || board.tie) {
            return
        }

        placePiece(outerSquareIndex, innerSquareIndex)
        checkInnerWinner()
        checkInnerTie()
        checkOuterWinner()
        checkOuterTie()
        if (!innerBoard[innerSquareIndex].winner && !innerBoard[innerSquareIndex].tie) {
            activeBoardIndex = innerSquareIndex
        } else {
            activeBoardIndex = null
        }
        turnSwitch()
        createGrid()
        updateStatus()




    }

    createGrid()
    updateStatus()

    questionMarkBtn.addEventListener('click', showInstructions)
    closeBtn.addEventListener('click', hideIstructions)
    restartBtn.addEventListener('click', init)


}

document.addEventListener('DOMContentLoaded', init)
