// // 'use stirct'


// function getRandomColor() {
//     var letters = '0123456789ABCDEF'
//     var color = '#'
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)]
//     }
//     return color
// }

// function getRandomIntInclusive(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }


// function createMat(rows, cols) {
//     var mat = []
//     for (var i = 0; i < rows; i++) {
//         var row = []
//         for (var j = 0; j < cols; j++) {
//             row.push(i, j) // game board with numbers orders
//             // row.push( {i,j}) // boart of objects of i and j
//         }
//         mat.push(row)
//     }
//     return mat
// }


// var randomIndex =getRandomIntInclusive(0, emptyCells.length - 1)
// var emptyCells = findEmptyCells(board)

// function findEmptyCells(board) {
//     var arr = []
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             if (/*condition about that board*/) {
//                 var cell = board[i][j]
//                 arr.push(cell)
//             }
//         }
//     }
// }


// var cellClass = getClassName({ i: i, j: j })
// var cellSelector = '.' + getClassName(location)

// 	var elCell = document.querySelector(cellSelector);
//     function getClassName(location) {
//         var cellClass = 'cell-' + location.i + '-' + location.j;
//         return cellClass;
//     }


    
// function renderBoard(board) {
//     var strHtml = '';
//     for (var i = 0; i < board.length; i++) {
//         var row = board.i;
//         strHtml += '<tr>';
//         for (var j = 0; j < row.length; j++) {
//             var cell = row.j;
//             var tdId = `cell-${i}-${j}`
//             strHtml += `<td id="${tdId}" onclick="cellClicked(this)"> </td>`
//         }
//         strHtml += '</tr>';
//     }
//     var elMat = document.querySelector('.game-board');
//     elMat.innerHTML = strHtml;
// }

    
// right now it get an objects of i and j ,you can change that to mat
// function getAllDiagonal(board) {
//     var res = [];
//     console.log(i)
//     var i = pieceCoord.i - 1;
//     for (var j = pieceCoord.j + 1; i >= 0 && j <  j++) {
//         var coord = { i: i--, j };
//         // res.push(coord);
//     }

//     i = pieceCoord.i - 1;
//     for (var j = pieceCoord.j - 1; j >= 0 && i >= 0; j--) {
//         coord = { i: i--, j }
//         // res.push(coord);
//     }

//     i = pieceCoord.i + 1;
//     for (var j = pieceCoord.j - 1; j >= 0 && i < 8; j--) {
//         coord = { i: i++, j }
//         // res.push(coord);
//     }

//     i = pieceCoord.i + 1;
//     for (var j = pieceCoord.j + 1; j < 8 && i < 8; j++) {
//         coord = { i: i++, j }
//         res.push(coord);
//     }

//     return res;
// }


