function init() {
    const squareElm = document.querySelectorAll('.square')
    const closeBtn = document.querySelector('#close')
    const messageBoxElm = document.querySelector('#message-box')
    const messageElm = document.querySelector('#message')
    let mainBoard = ['', '', '', '', '', '', '', '', '']
    let innerBoard = [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
    ]

    let turn = 'X'
    let innerWinner = false
    let innerTie = false
    let winner = false
    let tie = false

    
    function createGrid() {
        squareElm.forEach((outerSquare, outerIndex) => {
            outerSquare.innerHTML = '' // Clear any existing content

            for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
                const innerSquare = document.createElement('div')
                innerSquare.classList.add('innerSquare')
                innerSquare.dataset.outer = outerIndex
                innerSquare.dataset.inner = innerIndex
                innerSquare.textContent = innerBoard[outerIndex][innerIndex]
                outerSquare.appendChild(innerSquare)
                innerSquare.dataset.outer = outerIndex;
                innerSquare.dataset.inner = innerIndex;
            }
            
        })
        



    }
    function updateStatus(){
        if(!winner && !tie){
            messageElm.textContent= `${turn}'s turn`
        }
        else if(!winner && tie){
            messageElm.textContent = " It's a tie"
        }
        else {
            messageElm.textContent = '🎉 Congratulation to ' + turn + ' you are the winner!'
        }
    }

    function placePiece(index1,index2){
        innerBoard[index1][index2]=turn
    }
    function updteMainBoard() {
        mainBoard.forEach((element, i) => {
            squareElm[i].textContent = element
        });

    }
    function turnSwitch(){
        if(!winner){
            if(turn==='X'){
                turn='O'
            }else{
                turn='X'
            }
        }
        else{
            return
        }
    }

    function hideIstructions() {
        messageBoxElm.classList.add('hide')

    }


    createGrid()
   
    function handleClick(event){
        
        let outerSquareIndex =parseInt(event.target.dataset.outer)
        let innerSquareIndex=parseInt(event.target.dataset.inner)
        if(innerBoard[outerSquareIndex][innerSquareIndex] !=='' || winner || tie ){
            return
        }
        placePiece(outerSquareIndex,innerSquareIndex)
        createGrid()
        turnSwitch()
        updateStatus()

    }

    closeBtn.addEventListener('click', hideIstructions)
   
     
    // document.addEventListener('click',handleClick)
    document.querySelectorAll('.innerSquare').forEach(inner => {
    inner.addEventListener('click', handleClick)
})

}

document.addEventListener('DOMContentLoaded', init)