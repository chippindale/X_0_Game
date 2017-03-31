/**
 * Created by Chloe on 31/03/2017.
 */
console.log("script.js loaded");
function main() {
    console.log("Main function called");
    var board = [];
    var elements = document.getElementsByTagName('input');
    for(i = 0; i < elements.length; i++){
        board[i] = elements[i].value.toUpperCase() ;
        console.log("board value " + i + " = " + board[i]);
    }

    switch (solution(board)){
        case 0:
            endGame("0")
            break;
        case 1:
            endGame("X");
            break;
        case 2:
            endGame("tie");
            break;
        case 3:
            document.getElementById("text").innerHTML = "Game unfinished!";
            break;
        case 4:
            document.getElementById("text").innerHTML = "Invalid board!";
            break;
    }
}

function solution(char_board) {
    var whiteSpace = 0;
    char_board.forEach(function (element) {
        if(element === ""){
            whiteSpace ++;
        }
    });
    console.log("White space is " + whiteSpace);
    //check if board is not valid
    if(!checkValid(char_board)){
        console.log("Invalid board");
        return 4;
    }

    //check if game is won
    var boardWon = checkGameWon(char_board);
    if (boardWon === "X"){
        console.log("Game won by X");
        return 1;
    }
    if (boardWon === "0"){
        console.log("Game won by 0");
        return 0;
    }


    if(checkUnfinished(char_board)){
        console.log("board unfinished");
        return 3;
    }

    if(whiteSpace === 0) {
        console.log("board tied");
        return 2
    }
}

function checkGameWon(board) {
    var rowSize = 3;
    var columnSize = 3;

    //check rows
    for(i = 0; i < rowSize; i++){
        // console.log("i * rowsize = " + board[i*rowSize]);
        // console.log("board 0 = " + board[0]);
        if(board[i*rowSize] === board[(i*rowSize)+1] && board[i*rowSize] === board[(i*rowSize)+2] && board[i*rowSize] !== ""){
            console.log("board won on " + i*rowSize + board[i*rowSize] +  " " + ( i*rowSize + 1) + board[(i*rowSize)+1] + " " + (i*rowSize +2) + board[(i*rowSize)+2]);
            return board[i*rowSize];
        }
    }

    //check columns
    for(i =0 ; i < columnSize; i++){
        if(board[i] === board[i + 3] && board[i] === board[i +6] && board[i] !== ""){
            console.log("board won on " + i + board[i] +  " " + (i +3) + board[i+3] + " " + (i +6) + board[i+6]);
            return board[i];
        }
    }

    //check diagonals
    if(board[0] === board[4] && board[0] === board[8] && board[0] !== ""){
        console.log("board won on" + 0 + 4 + 8);
        return board[0];
    }
    if(board[2] === board[4] && board[2] === board[6] && board[2] !== ""){
        console.log("board won on " + 2 + board[2] + " " + 4 + board[4] + " " + 6 + board[6]);
        return board[2];
    }
    return false;
}

function checkValid(board) {
    var numberOfX = 0;
    var numberOfZero = 0;
    board.forEach(function(element){
        if(element === "X"){
            numberOfX ++;
        }
        if(element === "0"){
            numberOfZero ++;
        }
    });

    if(numberOfX - numberOfZero === 0 || numberOfX - numberOfZero === 1 ){
        console.log("Valid board X - 0 = " + (numberOfX - numberOfZero));
        return true;
    }else{
        console.log("Invalid result from X - 0 = " + (numberOfX - numberOfZero));
        return false;
    }
}

function checkUnfinished(board) {
    var whiteSpace = 0;
    board.forEach(function (element) {
       if(element === ""){
           whiteSpace ++;
       }
    });
    if(whiteSpace > 1){
        return true;
    }else{
        return false;
    }
}

//doesnt work due to async functions and it modifying the board state, revist later.
// function checkGameTied(board){
//
//     for(i = 0; i < board.length; i++){
//         console.log("board " + i + " " + board[i]);
//         if (board[i] === ""){
//             console.log("blank found at " + i);
//             board[i] = "X";
//             if (checkGameWon(board)){
//                 // console.log("Game can continue move valid for X at " + i);
//                 board[i] = "";
//                 return false;
//             }else{
//                 board[i] = "0";
//                 if(checkGameWon(board)){
//                     board[i] = "";
//                     return false;
//                 }
//             }
//         }
//         board[i]="";
//     }
//     return true;
// }

function endGame(result){
    document.getElementById("submit_button").style.display = "none";
    document.getElementById("reset_button").style.display = "block";
    switch(result){
        case "X":
            document.getElementById("text").innerHTML = "X Win!";
            break;
        case "0":
            document.getElementById("text").innerHTML = "0 Win!";
            break;
        case "tie":
            document.getElementById("text").innerHTML = "Game tied!";
            break;
    }
}

function reset() {
    var board = document.getElementsByTagName('input');
    for(i = 0; i < board.length; i++){
        board[i].value = "";
    }
    document.getElementById("text").innerHTML = "";
    document.getElementById("submit_button").style.display = "block";
    document.getElementById("reset_button").style.display = "none";
}