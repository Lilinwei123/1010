// 网格的总宽度
var gameWidth,
    // 初始化10 * 10网格
    tableRow,
    tableCol,
    table,

    // 初始化游戏块
    brickAmount,
    brickList,

    squareWidth,
    // 记录得分情况
    score = 0,

    // 记录每次三个游戏快拖拽完成后生成新的游戏块
    dragNum = 0;

function init() {
    gameWidth = document.body.clientWidth < 520 ? (document.body.clientWidth - 50) : 500;

    // 初始化tableRow * tableCol网格
    tableRow = 10;
    tableCol = 10;
    table = new Table(gameWidth, tableRow, tableCol);

    // 初始化游戏块
    brickAmount = 3;
    brickList = new BrickList(gameWidth, brickAmount);

    squareWidth = gameWidth / tableCol;

    // 记录得分情况
    score = 0;

    // 记录每次三个游戏快拖拽完成后生成新的游戏块
    dragNum = 0;
}

function restart() {
    document.getElementById("gameLayout").style.display = 'none';
    document.getElementById("gameOver").style.display = 'block';
    document.getElementById("scoreEnd").innerHTML = score;

    document.removeEventListener('touchmove', move, false);
    document.getElementById("repeatButton").addEventListener("click", function (e) {
        e.preventDefault();
        table = null;
        brickList = null;
        score = 0;
        // 清空原来的游戏块dom
        document.getElementById("bricks").innerHTML = "";

        document.getElementById("gameLayout").style.display = 'block';
        document.getElementById("gameOver").style.display = 'none';
        document.getElementById("score").innerHTML = 0;

        init();
    });

    document.getElementById('gameMore').addEventListener("click", function(e) {
        window.location.href = 'http://g.sina.cn/?vt=4';
    });
}

// 游戏移动过程位置的变化
function move(e) {
    if ('ontouchend' in document) {
        e = e.touches[0];
    }

    endY = e.pageY;

    // 鼠标的当前位置 - 鼠标距离游戏块的位置 = 游戏块移动后的位置
    var moveX = page.pageX(e) - param.x;
    // moveY = endY + brickY - 30;
    moveY = endY - startY + brickY - 30;

    param.dragBrick.dom.style.left = `${moveX}px`;
    param.dragBrick.dom.style.top = `${moveY}px`;
    return false;
}


// 游戏块移动结束处理,即判断游戏快所放的位置
function up(e) {
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
        if (dragNum === 3) {
            brickList = new BrickList(gameWidth, brickAmount);
            dragNum = 0;
        }
        // 获取需要消除的行和列的二维数组
        let clearResult = table.needClear();

        // 只要行和列满足消除条件，就将对应行和列传参数，
        if (clearResult[0].length || clearResult[1].length) {
            // 计算分数
            score += clearResult[0].length * 2 + clearResult[1].length * 2;
            document.getElementById("score").innerHTML = score;
        
            setTimeout(function () {
                table.clear(clearResult[0], clearResult[1])
            }, 100);
        }

        let isOver = table.isOver(brickList.list);
        
        if (!isOver) {
            restart();
        }
    } else {
        param.currentBrick.show();
    }

    document.onmousemove = null;
    document.onmouseup = null;

    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', up);
}

init();