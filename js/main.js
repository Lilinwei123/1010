// 网格的总宽度
var tableWidth = document.body.clientWidth < 520 ? (document.body.clientWidth - 50) : 500;

// 初始化10 * 10网格
var tableRow = 10;
var tableCol = 10;
var table = new Table(tableWidth, tableRow, tableCol);

