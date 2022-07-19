'use strict'
const GHOST = '&#9781'
var gGhosts = []
var gIntervalGhosts
var gEatenGhost=[]

function createGhost(board, idx) {
    // DONE
    var ghost = {
        location: {
            i: 2 + idx,
            // i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}



function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextLocation);

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === GHOST) return
    
    
    // DONE: hitting a pacman?  call gameOver
    if (nextCell === gPACMAN) {
        gameOver('l')
        return
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function eatGhost(indxI,indxJ)
{
    for(var i=0;i<gGhosts.length;i++){
        const ghost=gGhosts[i].location
        if (ghost.i===indxI && ghost.j===indxJ){
            gEatenGhost.push(gGhosts[i])
            gGhosts.splice(i,1)

        }
    }
}

function getGhostBack(){
    for (var i=0;i<gEatenGhost.length;i++){
        gGhosts.push(gEatenGhost[i])
    }
    for (var i=0;i<gGhosts.length;i++){
        gGhosts[i].color=getRandomColor()
    }
    gEatenGhost=[]
}

function getMoveDiff() {

    const randNum = getRandomIntInclusive(1, 4)
    if (randNum === 1) {
        return { i: 0, j: 1 }
    } else if (randNum === 2) {
        return { i: -1, j: 0 }
    } else if (randNum === 3) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span class="ghost" style="background-color:${ghost.color} ;">${GHOST}</span>`
}