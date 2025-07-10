function init (){
const squareElm=document.querySelectorAll('.square')

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
createGrid()


}

document.addEventListener('DOMContentLoaded',init)