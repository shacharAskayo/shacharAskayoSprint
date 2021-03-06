'use strict'

var FLAG = '🚩'
var MINE = '🔅'
var START = '😃'
var WIN = '😎'
var LOSE = '😫'
var score = 0
var cell;
var gBoard;
var FULLIVES = '💖💖💖'
var LIVE_1 = '💖💖❌'
var LIVE_2 = '💖❌❌'
var DEATH = '❌❌❌'
var lives = 3
var x = 0
var elTime = document.querySelector('.timer')
var elScore = document.querySelector('.score')
var elLIves = document.querySelector('.lives')
var shownCell;
var className;
var neighborsCount;
var gInterval;
var shownCell;
var className;
var neighborsCount;

var gLevel = {
    size: 4,
    mines: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isOpen: false
}

gBoard = buildBoard()
// console.log(gBoard[0][0].isShown)
function init() {
    elTime.innerText = '0.000'
    elScore.innerText = 0
    score = 0
    lives = 3
    elLIves.innerText = FULLIVES
    gBoard = buildBoard()
    gGame.isOn = true
    renderBoard(gBoard)
    changeEmoji()
    clearInterval(gInterval)

    if (gLevel.size === 4) {
        gLevel.mines = 2
    }
    else if (gLevel.size === 8) {
        gLevel.mines = 12
    }
    else if (gLevel.size === 12) {
        gLevel.mines = 30
    }
}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                i,
                j,
            }
            board[i][j] = cell
        }
    }
    return board
}
function checkVictory() {
    elEmoji.innerText = WIN
    alert('you won')
}

function renderBoard(board) {
    // console.log(cellI,cellJ)
    var strHtml = '';
    var empty = ''
    strHtml += '<tbody>'
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            while (gLevel.mines > 0) {
                var cellI = findEmptyCells(board).i
                var cellJ = findEmptyCells(board).j
                board[cellI][cellJ].isMine = true
                // console.log(board[cellI][cellJ])
                gLevel.mines--
            }
            var currCell = board[i][j];
            if (currCell.isMine) {
                className = 'mine'
            }
            if (!currCell.isMine) {
                className = 'number'
            }
            shownCell = empty
            strHtml += `<td data-i="${currCell.i}" data-j="${currCell.j}" class="${className}" oncontextmenu="cellRightClicked(this)" onclick="cellClicked(this)" >${shownCell} </td>`
        }
        strHtml += '</tr>';
    }
    strHtml += '</tbody>'
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

function cellRightClicked(elm) {
    gGame.markedCount++
    // console.log(gGame.markedCount)
    elm.innerText = FLAG
    // checkVictory(gBoard)

}

function cellClicked(elCell) {
    // checkVictory(gBoard)
    if (elTime.innerText === '0.000') {
        timer()
    }
    if (!gGame.isOn) return

    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    // console.log(i,j)
    if (elCell.innerText !== FLAG) {
        if (!elCell.classList.contains('mine')) {
            var count = setMinesNegsCount(i, j, gBoard)
            // console.log(i,j)
            // console.log(count)
            elCell.innerText = count
            gGame.shownCount++
            // console.log(elCell)
        }
        else elCell.innerText = MINE
    }
    if (count === 0) {
        // var cell = expandShown(i, j, gBoard)
        // console.log('neigh',cell)
        // console.log(elCell)
        // console.log('dataset i ',elCell.dataset.i)
        // console.log('dataset j ',elCell.dataset.j)
        // elCell.style.backgroundColor='blue'
        // elCell.classList.add('empty')
        // for (var i = 0; i < cell.length; i++) {
        //         elCell.dataset.[]
        //         console.log(elCell)
        // }
        // console.log(cells)

        elCell.style.backgroundColor = 'grey'
        elCell.style.color = 'grey'

    }
    if (elCell.innerText !== MINE && FLAG && count !== 0 ) {
        // console.log("work")
        score++
        var elScore = document.querySelector('.score')
        elScore.innerText = score
    }
    if (elCell.innerText === MINE) {
        lives--
        elLIves.innerText = LIVE_1
    }
    if (lives === 1) {
        elLIves.innerText = LIVE_2
    }

    if (gGame.markedCount === gLevel.mines && ((gLevel.size ** 2) - gLevel.mines) === gGame.shownCount) {
        // console.log('xxxxxxxxxxx')
        checkVictory() 
    }
    // console.log('ggame markedCount', gGame.markedCount, 'glevel mines', gLevel.mines, 'glevel size **', gLevel.size ** 2, 'ggame showncount', gGame.shownCount)
    // console.log('glevel mines',gLevel.mines )
    // console.log('glevel size **2',gLevel.size **2)
    // console.log('ggame showncount', gGame.shownCount)
    if (elCell.innerText === MINE && lives === 0) {
        elLIves.innerText = DEATH
        gameOver()
        return
    }
}


function expandShown(i, j, board) {
    var freeCells = findNeighbors(i, j, board)
    return freeCells
}

var elEmoji = document.querySelector('.emoji')
function gameOver() {
    var str = ''
    str = `${LOSE}`
    elEmoji.innerText = str
    gGame.isOn = false
    var elBtn = document.querySelector('.res-button')
    elBtn.style.display = 'block'
    score = 0
    clearInterval(gInterval)
}

function findEmptyCells(board) {
    var arr = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            arr.push({ i, j })
        }
    }
    var randomCell = arr[Math.floor(Math.random() * arr.length)]
    return randomCell
}
function findNeighbors(rowIdx, colIdx, board) {
    var arr = []
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            arr.push({ i, j })
        }
    }
    return arr
}
function setMinesNegsCount(rowIdx, colIdx, board) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine){
                neighborsCount++;  
            } 

        }
    }
    return neighborsCount;
}

function restart(elm) {
    gGame.isOn = true
    init()
    elm.style.display = 'none'
    elTime.innerText = '0.000'
}

makeLives()
function makeLives() {
    for (var i = 0; i < 3; i++) {
        elLIves.innerText = FULLIVES
    }
}

function easy() {
    gLevel.size = 4
    gLevel.mines = 2
    init()
}
function medium() {
    gLevel.size = 8
    gLevel.mines = 12
    init()
}

function hard() {
    gLevel.size = 12
    gLevel.mines = 30
    init()
}

function changeEmoji() {
    var str = ''
    var elEmoji = document.querySelector('.emoji')
    str = `${START}`
    elEmoji.innerText = str
    return elEmoji
}

function timer() {
    var startTime = Date.now();
    gInterval = setInterval(function () {
        var elPasedTime = Date.now() - startTime;
        elTime.innerHTML = (elPasedTime / 1000).toFixed(
            3
        );
    }, 100);
}

