function init() {
    const squareElm = document.querySelectorAll('.square')
    const closeBtn = document.querySelector('#close')
    const messageBoxElm = document.querySelector('#message-box')
    const messageElm = document.querySelector('#message')
    const restartBtn = document.querySelector('#resetButton')
    let mainBoard = ['', '', '', '', '', '', '', '', '']
    let innerBoard = [
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}, 
       {cells:['', '', '', '', '', '', '', '', '']}
        
    ]

    let turn = 'X'
    let winner = false
    let tie = false

    innerBoard.forEach(board => {
        board.winner=false
        board.tie= false })

    
    function createGrid() {

        squareElm.forEach((outerSquare, outerIndex) => {
            outerSquare.innerHTML = '' // Clear any existing content

            for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
                const innerSquare = document.createElement('div')
                innerSquare.classList.add('innerSquare')
                innerSquare.dataset.outer = outerIndex
                innerSquare.dataset.inner = innerIndex
                innerSquare.textContent = innerBoard[outerIndex].cells[innerIndex]
                innerSquare.addEventListener('click',handleClick)
                outerSquare.appendChild(innerSquare)
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
        innerBoard[index1].cells[index2]=turn
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

    
   
    function handleClick(event){
        
        let outerSquareIndex =parseInt(event.target.dataset.outer)
        let innerSquareIndex=parseInt(event.target.dataset.inner)
        if(innerBoard[outerSquareIndex].cells[innerSquareIndex] !=='' || winner || tie ){
            return
        }
        placePiece(outerSquareIndex,innerSquareIndex)
        createGrid()
        turnSwitch()
        updateStatus()

    }

    closeBtn.addEventListener('click', hideIstructions)
    restartBtn.addEventListener('click',init)

    createGrid()
    updateStatus()

}

document.addEventListener('DOMContentLoaded', init)