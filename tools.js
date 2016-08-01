/**
 * Created by 31602 on 2016/7/31.
 */

function getTop( x, y) {
     return 10 + x * 110 ;
}

function getLeft( x, y) {
    return 10 + y * 110 ;
}

function randDomNum(){
    return parseInt(Math.floor(Math.random()*4));
}

function getNumberBackgroundColor(number){
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "black";
}

function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}

function nospace( board ){
    for( let i = 0; i < 4; i++ ){
        for( let j =0; j < 4; j++ ){
            if( borad[i][j] === 0) {
                return false;
            }
        }
    }
    return false;
}

function noBlockHorizontal(row,k,j,board){
    for( let i = k+1; i < j; i++ ){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

function showNumberWithAnimation( i, j, n ){

    var numberCell = $("#gird-cell-num-"+i+"-"+j);
    numberCell.css({
        backgroundColor: getNumberBackgroundColor( n ),
        color: getNumberColor(n)
    });
    numberCell.text( n );
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getTop(i,j),
        left: getLeft(i,j)
    },50);
}

function showMoveAnimation(row,i,row,j){
    var numberCell = $("#gird-cell-num-"+row+"-"+i);
    numberCell.animate({
        top: getTop(row,j),
        left: getLeft(row,j)
    },200);
}