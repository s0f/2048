/**
 * Created by 31602 on 2016/7/31.
 */

var borad = [];

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
        for( let j =0; j < 4; j++ ){
            borad[i][j] = 0;
        }
    }

    updateBoardView();
}


function updateBoardView(){
    $(".gird-cell-num").remove();

    for( let i =0; i < 4; i++ ){
        for( let j =0; j < 4; j++ ){
            var girdCellNum = $("<div class='gird-cell-num' id='gird-cell-num-"+i+"-"+j+"'></div>")

            if( borad[i][j] == 0 ){
                girdCellNum.css({
                    width: 0,
                    height: 0,
                    top: getTop(i,j)+50,
                    left: getLeft(i,j)+50
                });
            }else{
                girdCellNum.css({
                    width: 100+"px",
                    height: 100 + "px",
                    top: goTop(i,j),
                    left: goTop(i,j),
                    backgroundColor: getNumberBackgroundColor(borad[i][j])
                });
            }


            $("#grid-container").append(girdCellNum);
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

    var randNumber = Math.random() < 0.25 ? 2 : 4;

    borad[randX][randY] = randNumber;
    showNumberWithAnimation( randX, randY, randNumber);

    return true;
}
function canMoveLeft( borad ){
    for( let i =0; i < 4; i++ ){
        for( let j =0; j < 4; j++ ){
            if(borad[i][j] != 0){
                if( borad[i][j-1] == 0 || borad[i][j] == borad[i][j-1]){
                    return 0;
                }
            }
        }
    }
}
function MoveLeft(){
    if( canMoveLeft(borad)){
        return;
    }

    for( let i =0; i < 4; i++ ){
        for( let j =0; j < 4; j++ ){

            if( borad[i][j] != 0 ){
                for( let k = 0; k < j; k++ ){
                    console.log(borad[i][k]==0 && noBlockHorizontal(i,k,j,borad))
                    if( borad[i][k]==0 && noBlockHorizontal(i,k,j,borad)){
                        showMoveAnimation(i,j,i,k);
                        borad[i][k] = borad[i][j];
                        borad[i][j] = 0;
                        continue;
                    }else{
                        continue;
                    }
                }
            }
        }
    }

}


$(document).ready(function () {
   newGarm();
    $(document).on("keydown", function(event){

        switch (event.keyCode){
            case 37:
                if( MoveLeft() ){

                }
                break;
            case 38:
                if( MoveTop() ){

                }
                break;
            case 39:
                if( MoveRight() ){

                }
                break;
            case 40:
                if( MoveBottom() ){

                }
                break;
        }
    });
});