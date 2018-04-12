// 网格的总宽度
var tableWidth = document.body.clientWidth < 520 ? (document.body.clientWidth - 50) : 500;

// 初始化10 * 10网格
var tableRow = 10;
var tableCol = 10;
var table = new Table(tableWidth, tableRow, tableCol);

// 初始化游戏块
var brickNum = 3;
var brickList = new BrickList(tableWidth, brickNum);

var dragging; //是否激活拖拽状态
var tLeft, tTop; //鼠标按下时相对于选中元素的位移

