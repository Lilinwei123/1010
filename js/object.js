/**
 * 最小单元:方块
 */
function Square(id, color, fatherDom, length, top, left) {
    // this.color = color;
    this.dom = document.createElement('div');
    this.dom.id = id;
    this.dom.className = color;
    this.dom.style.background = color;
    this.dom.style.width = length * 0.9 + 'px';
    this.dom.style.height = length * 0.9 + 'px';
    this.dom.style.top = top + 'px';
    this.dom.style.left = left + 'px';
    this.dom.style.position = 'absolute';
    this.dom.style.borderRadius = '5px';
    fatherDom.appendChild(this.dom);
}

Square.prototype.changeColor = function (color) {
    this.dom.className = color;
    this.dom.style.background = color;
}

/**
 * 游戏块
 */
function Brick(id, color, matrix, fatherDom, length, left, top, canDrag) {
    this.state = 1; //state 1 show,0 remove
    this.matrix = matrix;
    this.squares = [];
    this.color = color;
    //dom
    this.dom = document.createElement('div');
    this.dom.id = id;
    this.dom.style.width = length + 'px';
    this.dom.style.height = length + 'px';
    this.dom.style.position = 'absolute';
    this.dom.style.left = left + 'px';
    this.dom.style.top = top + 'px';
    //create Squares
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j]) {
                this.squares.push(new Square('bs-' + i + '-' + j, this.color, this.dom, length / 5, length / 5 * i, length / 5 * j));
            } else {

            }
        }
    }
    fatherDom.appendChild(this.dom);
    if (canDrag) {
        var that = this;
        // 判断该浏览器是否支持触屏事件
        if ('ontouchend' in document) {
            this.dom.addEventListener('touchstart', function(e) {
                // document.querySelector('body').addEventListener('touchstart', function (ev) {
                //     event.preventDefault();
                // });

                // 获取触屏事件对象
                e = e.touches[0];
                // 所选中的游戏块
                param.currentBrick = that;
                // 将被选中的小游戏块隐藏
                that.hide();
                // 将被选中的游戏块变大，和上面网格一样大
                param.dragBrick = new Brick(id, that.color, that.matrix, document.body, gameWidth / tableCol * 5, getPosition(this).x, getPosition(this).y - 30, false);
                // 光标距离游戏块的距离：x, y
                // page.pageX(e)==e.pageX:光标距离窗口的左边距
                // getPosition(this).x == this.offsetLeft:游戏块距离左边的距离
                param.x = page.pageX(e) - getPosition(this).x;
                // param.y = page.pageY(e) - getPosition(this).y;

                brickY = getPosition(this).y;
                startY = e.pageY;


                // param.y = page.pageY(e);
                // top = getPosition(this).y;
                document.addEventListener('touchmove', move, false);
                document.addEventListener('touchend', up, false);
            }, false);
        } else {
       
        }

    }
}

//移除
Brick.prototype.remove = function() {
    this.state = 0;
    this.dom.parentNode.removeChild(this.dom);
}

//隐藏
Brick.prototype.hide = function() {
    this.dom.style.visibility = 'hidden';
}

//展示
Brick.prototype.show = function() {
    this.dom.style.visibility = '';
}


/**
 * 游戏块列表
 */
function BrickList(gameWidth, brickAmout) {
    this.list = [];
    // this.amount = brickAmout;
    this.dom = document.getElementById('bricks');
    this.dom.style.width = gameWidth + 'px';
    this.dom.style.height = gameWidth / brickAmout + 'px';

    for (var i = 0; i < brickAmout; i++) {
        this.list[i] = new Brick('b' + '-' + i, color.random(), matrix.random(), this.dom, gameWidth / brickAmout * 0.9, gameWidth / brickAmout * i, 0, true); //0.9防止相邻两个brick相连
    }
}

/**
 * 棋盘
 */
function Table(gameWidth, row, col) {
    // matrix标记的是网格中是否已经放入游戏快，1和0表示
    this.matrix = [];
    this.squares = [];
    this.dom = document.getElementById('table');
    this.dom.style.width = gameWidth + 'px';
    this.dom.style.height = gameWidth / col * row + 'px';
    //生成网格，已经网格对应的而为矩阵
    for (var i = 0; i < row; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < col; j++) {
            this.matrix[i][j] = 0;
            this.squares.push(new Square('t-' + i + '-' + j, color.default, this.dom, gameWidth / col, gameWidth / col * i, gameWidth / col * j));
        }
    }
}

// 计算拖拽的游戏块是否可以放置在网格中
Table.prototype.checkNoCover = function (brick, i, j) {
    var result = [];

    // 判断游戏快在该位置是否放得下,尾部添加是否放得下
    if (i + brick.matrix.length > this.matrix.length || j + brick.matrix[0].length > this.matrix[0].length) {
        return false;
    }

    for (let n = 0; n < brick.matrix.length; n++) {
        for (let m = 0; m < brick.matrix[0].length; m++) {

            // 判断是否放得下，降游戏快的每一个快与二维0，1矩阵进行一一比较
            if (this.matrix[i + n][j + m] && brick.matrix[n][m]) {
                return false;
            } 

            // 游戏快在网格中对应的位置
            if (brick.matrix[n][m]) {
                result.push([i+n, j+m]);
            }
        }
    }
    return result;
}

// 表格更新色块
Table.prototype.update = function (positionList, color) {
    for (let i = 0; i < positionList.length; i++) {
        // 记录网格中的一个小方块是否已经放入游戏快
        this.matrix[positionList[i][0]][positionList[i][1]] = 1;
        // 更新游戏色块
        this.squares[positionList[i][1]  + positionList[i][0] * tableCol].changeColor(color);
    }
}

// 行列判断是否满足消除条件，并且返回该消除的行和列
Table.prototype.needClear = function () {
    let rows = [],
        cols = [];
    // 行
    for (let i = 0; i < this.matrix.length; i++) {
        var sum = 0;
        for (let j = 0; j < this.matrix[0].length; j++) {
            sum += this.matrix[i][j];
            if (sum == this.matrix[0].length) {
                rows.push(i);
            }
        }
    }
    // 列,矩阵
    for (let i = 0; i < this.matrix.length; i++) {
        var sum = 0;
        for (let j = 0; j < this.matrix[0].length; j++) {
            sum += this.matrix[j][i];
            if (sum == this.matrix.length) {
                cols.push(i);
            }
        }
    }
    // console.log([rows, cols]);
    return [rows, cols];
}

// 根据要消除的行和列，改变色块颜色
Table.prototype.clear = function (row, col) {
    // 行
    if (row.length) {
        for (let i = 0; i < row.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                // 消除后自动设置为0
                this.matrix[row[i]][j] = 0;
                this.squares[row[i] * this.matrix[0].length + j].changeColor(color.default);
            }
        }
    }
    // 列
    if (col.length) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < col.length; j++) {
                this.matrix[i][col[j]] = 0;
                this.squares[i * this.matrix.length + col[j]].changeColor(color.default);
            }
        }
    }
}

Table.prototype.isOver = function(brickList) {
    for (let i = 0; i < brickList.length; i++) {
        if (brickList[i]) {
            for (m = 0; m < this.matrix[0].length; m++) {
                for (n = 0; n < this.matrix.length; n++) {
                    // 遍历剩余的游戏块，一一判断是否还可以放置在网格中
                    let result = this.checkNoCover(brickList[i], m, n);
                    if (result)
                        return result;
                }
            }
        }
    }
    return false;
}