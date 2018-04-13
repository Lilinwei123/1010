// 网格的总宽度
var gameWidth = document.body.clientWidth < 520 ? (document.body.clientWidth - 50) : 500;

// 初始化10 * 10网格
var tableRow = 6;
var tableCol = 6;
var table = new Table(gameWidth, tableRow, tableCol);

// 初始化游戏块
var brickAmount = 3;
var brickList = new BrickList(gameWidth, brickAmount);

var squareWidth = gameWidth / tableCol;

// 记录得分情况
var score = 0;

// 记录每次三个游戏快拖拽完成后生成新的游戏块
var dragNum = 0;

// 游戏移动过程位置的变化
function move (e) {
    e.preventDefault();
    if ('ontouchend' in document) {
        e = e.touches[0];
    }
    
    // 计算出鼠标移动距离
    var moveX = page.pageX(e) - param.x,
        moveY = page.pageY(e) - param.y;

    param.dragBrick.dom.style.left = `${moveX}px`;
    param.dragBrick.dom.style.top = `${moveY}px`;
}


// 游戏块移动结束处理,即判断游戏快所放的位置
function up(e) {
    e.preventDefault();
    if ('ontouchend' in document) {
        e = e.touches[0];
    }
    // debugger
    var updatePostion = false;
    var dragPosition = getPosition(param.dragBrick.dom);
    var tablePosition = getPosition(table.dom);

    // 判断拖拽的游戏快是否越界
    if (dragPosition.x < tablePosition.x - squareWidth / 2 || dragPosition.y < tablePosition.y - squareWidth / 2 || dragPosition.x - table.dom.offsetWidth > tablePosition.x + squareWidth / 2 || dragPosition.y - table.dom.offsetHeight > tablePosition.y + squareWidth / 2) {
        updatePostion = false;
    } else {
        // 如果没越界，计算出拖拽游戏块的开始坐标
        updatePostion = table.checkNoCover(param.dragBrick, Math.round((dragPosition.y - tablePosition.y) / squareWidth), Math.round((dragPosition.x - tablePosition.x) / squareWidth));
    }

    param.dragBrick.remove();

    if (updatePostion) {
        dragNum++;
        // 将拖动的游戏块隐藏
        param.currentBrick.remove();
        // 更新表格中的色块
        table.update(updatePostion, param.dragBrick.color);

        // 记录被拖拽的是游戏列表中第几个游戏块
        let brickIndex = param.dragBrick.dom.id.substr(param.dragBrick.dom.id.length - 1, 1);
        // 每成功放置一个，就将其在游戏块列表中删掉
        brickList.list[brickIndex] = null;

        // 三个游戏块被拖拽完成后生成新的游戏块
        if(dragNum === 3) {
            brickList = new BrickList(gameWidth, brickAmount);
            dragNum = 0;
        }
        // 获取需要消除的行和列的二维数组
        let clearResult = table.needClear();

        // 只要行和列满足消除条件，就讲对应行和列传参数
        if (clearResult[0].length || clearResult[1].length) {
            score += 2;
            document.getElementById("score").innerHTML = score;
            table.clear(clearResult[0], clearResult[1]);
        } 

        let isOver = table.isOver(brickList.list);
        if (!isOver) {
            document.getElementById("table").innerHTML = 'Game Over!';
            document.getElementById("bricks").style.display = 'none';
        } 
    } else {
        param.currentBrick.show();
    }

    document.onmousemove = null;
    document.onmouseup = null;

    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', up);
}