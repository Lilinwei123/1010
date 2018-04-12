// 网格的总宽度
var gameWidth = document.body.clientWidth < 520 ? (document.body.clientWidth - 50) : 500;

// 初始化10 * 10网格
var tableRow = 8;
var tableCol = 8;
var table = new Table(gameWidth, tableRow, tableCol);

// 初始化游戏块
var brickAmount = 3;
var brickList = new BrickList(gameWidth, brickAmount);

var squareWidth = gameWidth / tableCol;

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

    var updatePostion = false;
    var dragPosition = getPosition(param.dragBrick.dom);
    var tablePosition = getPosition(table.dom);

    // 判断拖拽的游戏快是否越界
    if (dragPosition.x < tablePosition.x - squareWidth / 2 || dragPosition.y < tablePosition.y - squareWidth / 2 || dragPosition.x - table.dom.offsetWidth > tablePosition.x + squareWidth / 2 || dragPosition.y - table.dom.offsetHeight > tablePosition.y + squareWidth / 2) {
        updatePostion = false;
    } else {
        updatePostion = table.checkNoCover(param.dragBrick, Math.round((dragPosition.y - tablePosition.y) / squareWidth), Math.round((dragPosition.x - tablePosition.x) / squareWidth));
    }

    param.dragBrick.remove();

    if (updatePostion) {
        // 将拖动的游戏块隐藏
        param.currentBrick.remove();
        // 更新表格中的色块
        table.update(updatePostion, param.dragBrick.color);
    } else {
        param.currentBrick.show();
    }

    document.onmousemove = null;
    document.onmouseup = null;

    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', up);
}