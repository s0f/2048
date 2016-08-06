/**
 * Created by 31602 on 2016/7/31.
 */

var borad = [];
var hasConflicted = [];
//创建新游戏
function newGarm() {
    init();
    generateOneNumber();
    generateOneNumber();
}

//游戏初始化
function init() {

    for( var i = 0; i < 4; i++ ){

        for( var j = 0; j < 4; j++ ){

            var girdCell = $("#grid-cell-"+i+"-"+j);

            girdCell.css({
                top: getTop(i,j),
                left: getLeft(i,j)
            });
        }
    }

    for( let i = 0; i < 4; i++ ){
        borad[i] = [];
        hasConflicted[i] = [];
        for( let j =0; j < 4; j++ ){
            borad[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
}


function updateBoardView(){


    $(".gird-cell-num").remove();

    for( let i =0; i < 4; i++ ){
        for( let j =0; j < 4; j++ ){
            $("#grid-container").append("<div class='gird-cell-num' id='gird-cell-num-" + i + "-" + j + "'></div>");
            var girdCellNum = $('#gird-cell-num-' + i + '-' + j);

            if( borad[i][j] == 0 ){
                girdCellNum.css({
                    width: 0,
                    height: 0,
                    top: getTop(i,j)+50,
                    left: getLeft(i, j) + 50,
                    color: getNumberColor(borad[i][j])
                });
            }else{
                girdCellNum.css({
                    width: "100px",
                    height: "100px",
                    top: getTop(i, j),
                    left: getLeft(i, j),
                    backgroundColor: getNumberBackgroundColor(borad[i][j]),
                    color: getNumberColor(borad[i][j])
                });

                girdCellNum.text(borad[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }

}

function generateOneNumber(){
    if( nospace( borad ) ){
        return false;
    }

    var randX = parseInt(Math.floor(Math.random()*4));
    var randY = parseInt(Math.floor(Math.random()*4));

    var tempNumber = 0;

    while( tempNumber < 50 ){
        if( borad[randX][randY] == 0 ){
            break;
        }
        randX = parseInt(Math.floor(Math.random()*4));
        randY = parseInt(Math.floor(Math.random()*4));

        tempNumber++;
    }

    if( tempNumber == 50 ){
        for( let i =0; i < 4; i++ ){
            for( let j =0; j < 4; j++ ){
                if( borad[i][j] == 0 ){
                    randX = i;
                    randY = j;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;

    borad[randX][randY] = randNumber;
    showNumberWithAnimation( randX, randY, randNumber);

    return true;
}

function canMoveLeft( borad ){
    for( let i =0; i < 4; i++ ){
        for( let j =0; j < 4; j++ ){
            //找到有数的位置 假如borad[1][2]位置有数
            if(borad[i][j] != 0){
                //判断 borad[1][1]位置是否为0， 或者 和borad[1][2]的数相同
                if( borad[i][j-1] == 0 || borad[i][j] == borad[i][j-1]){
                    return true;
                }
            }
        }
    }
    return false;
}
//左移
function showTable() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (j == 3) {
                console.log("\n");
            }
        }
    }
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}
function moveLeft() {
    //如果不存在左移的条件结束函数
    if (!canMoveLeft(borad))
        return false;

    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if( borad[i][j] != 0 ){

                for (var k = 0; k < j; k++) {

                    if (borad[i][k] == 0 && noBlockHorizontal(i, k, j, borad)) {
                        showMoveAnimation(i,j,i,k);
                        borad[i][k] = borad[i][j];
                        borad[i][j] = 0;
                        continue;
                    } else if (borad[i][k] == borad[i][j] && noBlockHorizontal(i, k, j, borad)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        borad[i][k] += borad[i][j];
                        borad[i][j] = 0;
                        //add score
                        //score += board[i][k];
                        //updateScore( score );

                        hasConflicted[i][k] = true;
                        continue;
                    }
            }
        }


        }
    setTimeout("updateBoardView()", 200);
    return true;
}

function MoveRight() {

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {

            if (borad[i][j] != 0) {

                for (let k = 3; k > j; k--) {

                    if (borad[i][k] == 0 && noBlockHorizontal(i, j, k, borad)) {
                        showMoveAnimation(i, j, i, k);
                        borad[i][k] = borad[i][j];
                        borad[i][j] = 0;
                    } else if (borad[i][k] == borad[i][j] && noBlockHorizontal(i, j, k, borad)) {
                        showMoveAnimation(i, j, i, k);
                        borad[i][k] += borad[i][j];
                        borad[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
}

function MoveTop() {

}
function MoveBottom() {

}

$(document).ready(function () {
    newGarm();
});
$(document).on("keydown", function (event) {

    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                //setTimeout("isgameover()",300);
            }
            break;
        case 38:
            if (MoveTop()) {

            }
            break;
        case 39:
            if (MoveRight()) {
                setTimeout("generateOneNumber()", 210);
            }
            break;
        case 40:
            if (MoveBottom()) {

            }
            break;
    }
});