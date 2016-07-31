/**
 * Created by 31602 on 2016/7/31.
 */

var borad = [];

//创建新游戏
function newGarm() {
    init();    
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


}

$(document).ready(function () {
   newGarm();
});