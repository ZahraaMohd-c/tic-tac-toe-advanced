function init() {
    const squareElm = document.querySelectorAll('.square')
    const closeBtn = document.querySelector('#close')
    const messageBoxElm = document.querySelector('#message-box')
    let mainBoard = ['', '', '', '', '', '', '', '', '']
    let innerBourd = [
        ['X', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
    ]

    function createGrid() {
        for (let j = 0; j < squareElm.length; j++) {

            for (let i = 0; i < squareElm.length; i++) {
                const inSquare = document.createElement('div')
                inSquare.classList.add('innerSquare')
                inSquare.id = i+1
                inSquare.textContent=innerBourd[i][j]
                squareElm[j].appendChild(inSquare)
            }
        }


    }
    
    function updteMainBourd() {
        mainBoard.forEach((element, i) => {
            squareElm[i].textContent = element
        });

    }

    function hideIstructions() {
        messageBoxElm.classList.add('hide')

    }

    createGrid()
    function render() {


    }

    closeBtn.addEventListener('click', hideIstructions)
    render()
}

document.addEventListener('DOMContentLoaded', init)