'use strict'
var gPACMAN = '😷'


var gPacman
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        }
    }

    board[gPacman.location.i][gPacman.location.j] = gPACMAN
}
function movePacman(ev) {
    // console.log('ev:', ev)
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPowerMode) {
        eatGhost(nextLocation.i,nextLocation.j)
        }else{
        gameOver('l')
        return
        }
    }

    if (nextCell === FOOD) {
        gFoodEaten++
        updateScore(1)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === POWER_FOOD) {
        if (gPowerMode) return
        getPowerMode()
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = gPACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, gPACMAN)
}





function getNextLocation(eventKeyboard) {
    // TODO: figure out nextLocation

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPACMAN='👍'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPACMAN='🤜'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPACMAN='👎'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPACMAN='🤛'
            break;

        default:
            break;
    }
    return nextLocation
}