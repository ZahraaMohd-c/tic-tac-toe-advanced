function init (){
const squareElm=document.querySelectorAll('.square')
const closeBtn = document.querySelector('#close')
const messageBoxElm = document.querySelector('#message-box')

function createGrid(){
   for(let j=0; j<squareElm.length ;j++){
    
        for(let i=0; i<squareElm.length ;i++){
            const inSquare= document.createElement('div')
            inSquare.classList.add('innerSquare')
            inSquare.id=i
            squareElm[j].appendChild(inSquare)
        }
   }
        
   
}
function hideIstructions(){
    messageBoxElm.classList.add('hide')

}

createGrid()

closeBtn.addEventListener('click',hideIstructions)
}

document.addEventListener('DOMContentLoaded',init)