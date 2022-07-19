'use strict'
const WALL = '🟪'
const FOOD = '🍭'
const EMPTY = ' '
const POWER_FOOD='✨'
const CHERRY='🍒'

var gBoard
const gGame = {
    score: 0,
    isOn: false
}
var gFoodOnBoard
var gFoodEaten
var gPowerTimeoutId
var gPowerMode
var gCherryIntervalId
var gcounterIntervalId

function init() {
    // console.log('hello')
    gPACMAN = '😷'
    gGame.isOn = true
    gGame.score=0
    // document.querySelector('h2 span').innerText = gGame.score
    const elModal=document.querySelector('.game-over-modal')
    elModal.style.display='none'
    gFoodOnBoard=0
    gFoodEaten=0
    gPowerMode=false
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
 
    gCherryIntervalId= setInterval(getCherry,15000)
    
}


function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodOnBoard++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodOnBoard--
            }
            if(i===1 && j===1 || i===1 && j===size-2 || 
               i===size-2 && j===1 || i===size-2 && j===size-2){
                board[i][j] = POWER_FOOD
                gFoodOnBoard--

            }
        }
    }
    return board
}

function getPowerMode(){
    if (gPowerTimeoutId) clearTimeout(gPowerTimeoutId)
    var counter=5
    gPowerMode=true
    for(var i=0;i<gGhosts.length;i++){
        gGhosts[i].color= 'blue'
    }

    gPowerTimeoutId= setTimeout(getRegularMode,5000)
    const elCounter=document.querySelector('.power-Mode')
    elCounter.style.display='block'

    gcounterIntervalId=setInterval(function(){ 
        elCounter.innerText=`Power Mode- Go crazy ${counter--}`},800)
    
}

function getRegularMode(){
    gPowerTimeoutId= clearTimeout(gPowerTimeoutId)
    clearInterval(gcounterIntervalId)

    const elCounter=document.querySelector('.power-Mode')
     elCounter.style.display='none'

    gPowerMode=false
    getGhostBack()
}

function getCherry(){
   const emptyCellsCords =getEmptyCells(gBoard)
      if(emptyCellsCords.length===0) return
//    console.log('emptyCellsCords',emptyCellsCords);
   const cherryCords=drawNumBetter(emptyCellsCords)
//    console.log('cherryCords',cherryCords)
   gBoard[cherryCords.i][cherryCords.j]=CHERRY
   renderCell(cherryCords,CHERRY)

}


function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score
   if(isWiner()) gameOver('w') 
}

function gameOver(res) {
    // TODO
    // console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalId)
    renderCell(gPacman.location, '⚰')
    gGame.isOn = false
    getModal(res)
}

function getModal(res){
    const elModal=document.querySelector('.game-over-modal')
    elModal.style.display='block'
    const elSubH=document.querySelector('.game-ovar-sub-h')
    elSubH.innerText= res==='w'? 'You Won 🏆' : 'You Lost 😥'
}

function isWiner(){
    // console.log('gGame.score',gGame.score)
    // console.log('gFoodOnBoard',gFoodOnBoard)
    return gFoodEaten===gFoodOnBoard-1? true:false
}
