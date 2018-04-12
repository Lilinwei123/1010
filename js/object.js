// 网格中的每一个小方块单元格
function Square(color, id, top, left, length, fatherDom) {
    this.dom = document.createElement('div');
    this.dom.style.background = color;
    this.dom.id = id;
    this.dom.style.width = length * 0.9 + 'px';
    this.dom.style.height = length * 0.9 + 'px';
    this.dom.style.top = top + 'px';
    this.dom.style.left = left + 'px';
    this.dom.style.position = 'absolute';
    this.dom.style.borderRadius = '5px';
    fatherDom.appendChild(this.dom);
}

// 网格
function Table(gridWidth, row, col) {
    this.squares = [];
    this.dom = document.getElementById("table");
    this.dom.style.width = gridWidth + 'px';
    this.dom.style.height = gridWidth / col * row + 'px';

    // 形成网格
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            this.squares.push(new Square(color.default, `c-${i}-${j}`, gridWidth / col * i, gridWidth / col * j, gridWidth / col, this.dom));
        }
    }
}

// 游戏块
function Brick(color, id, top, left, length, fatherDom, matrix, candrag) {
    this.squares = [];
    this.dom = document.createElement('div');
    this.dom.id = id;
    this.dom.style.width = length + 'px';
    this.dom.style.height = length + 'px';
    this.dom.style.top = top + 'px';
    this.dom.style.left = left + 'px';
    this.dom.style.position = 'absolute';
    this.matrix = matrix;
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                    this.squares.push(new Square(color, `c-${i}-${j}`, length / 5 * i, length / 5 * j, length / 5, this.dom));
            }
        }
    }

    fatherDom.appendChild(this.dom);

    if (candrag) {
        var that = this;
        // 判断是否支持触屏事件
        if ("ontouchend" in document) {
            this.dom.addEventListener('touchstart', function (e) {
                
                // 
                param.currentBrick = that;
                that.hide();
                param.dragBrick = new Brick('drag', that.color, getPosition(this).y, getPosition(this).x, tableWidth / tableRow * 5, document.body, that.matrix, false);
                
            }, false)
        }
    }
}

// 用于点击那一下，原来的小游戏块隐藏
Brick.prototype.hide = function () {  
    this.dom.style.visibility = "hidden";
}

// 
Brick.prototype.remove = function () {
    this.state = 0;
    this.dom.parentNode.removeChild(this.dom);
}

Brick.prototype.show = function () {
    this.dom.style.visibility = '';
}

// 游戏块列表
function BrickList (gridWidth, num) {
    this.list = [];
    this.dom = document.getElementById("bricks");
    this.dom.style.width = gridWidth + 'px';
    this.dom.style.height = gridWidth / num + 'px';

    for (let i = 0; i < num; i++) {
        this.list[i] = new Brick(color.random(), `b-${i}`, 0, gridWidth / num * i, gridWidth / num * 0.9, this.dom, matrix.random(), true);
    }
}