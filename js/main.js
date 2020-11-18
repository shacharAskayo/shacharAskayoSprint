'use strict'

var FLAG = '🚩'
var MINE = '🔅'
var START = '😃'
var WIN = '😎'
var LOSE = '😫'

var cell;
var gBoard;

var gLevel = {
    size: 4,
    mines: 2,
    location: { i: 2, j: 3 }
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var shownCell;
var className;
var neighborsCount;
gBoard = buildBoard()
function init() {
    gBoard = buildBoard()
    gGame.isOn = true
    renderBoard(gBoard)
    changeEmoji()
}


function easy() {
    gLevel.size = 4
    init()
}
function medium() {
    gLevel.size = 6
    init()
}

function hard() {
    gLevel.size = 8
    init()
}

function changeEmoji() {
    var str = ''
    var elEmoji = document.querySelector('.emoji')
    str = `${START}`
    elEmoji.innerText = str

}

// createMat(5, 5)
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

function renderBoard(board) {
    var cellI = findEmptyCells(board).i
    var cellJ = findEmptyCells(board).j
    // console.log(cellI,cellJ)
    var strHtml = '';
    var empty = ''
    strHtml += '<tbody>'
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            board[cellI][cellJ].isShown = true

            // console.log(board[i][j])
            var currCell = board[i][j];
            // console.log(currCell)
            if (currCell.isShown) {
                // shownCell = MINE
                className = 'mine'
            }
            if (!currCell.isShown) {
                // neighborsCount=0
                // shownCell = empty
                className = 'number'
            }

            shownCell = empty
            strHtml += `<td data-i="${currCell.i}" data-j="${currCell.j}" class="${className}" oncontextmenu="cellRightClicked(this)" style="" onclick="cellClicked(this)" >${shownCell} </td>`
        }
        strHtml += '</tr>';
    }
    strHtml += '</tbody>'
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
    // console.log(elMat)

}



function cellRightClicked(elm) {
    elm.innerText = FLAG
}

function cellClicked(elCell) {
    if (!gGame.isOn) return
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    if (!elCell.classList.contains('mine')) {
        var count = setMinesNegsCount(i, j, gBoard)

        elCell.innerText = count
    }
    else elCell.innerText = MINE

    if (elCell.innerText === MINE) {
        gameOver()
    }

    //   console.log(count)
}
function gameOver() {
    var str = ''
    var elEmoji = document.querySelector('.emoji')
    str = `${LOSE}`
    elEmoji.innerText = str
    gGame.isOn = false
    var elBtn = document.querySelector('.res-button')
    elBtn.style.display = 'block'

    // console.log('Game Over');
}

// console.log(findEmptyCells(gBoard))
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
function setMinesNegsCount(rowIdx, colIdx, mat) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (mat[i][j].isShown) neighborsCount++;
        }
    }
    return neighborsCount;
}
function restart(elm) {
    gGame.isOn = true
    init()
    elm.style.display = 'none'
}


// function checkVictory(){

// }


// function renderCell(location, value) {
// 	var cellSelector = '.' + getClassName(location)
// 	var elCell = document.querySelector(cellSelector);
// 	elCell.innerHTML = value;
// }