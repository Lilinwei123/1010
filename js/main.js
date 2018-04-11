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

document.addEventListener('mousedown', function(e) {
    for (let i = 0; i < brickList.list.length; i++) {
        if(e.target.parentElement == brickList.list[i].dom){
            console.log(i);
        }
    }
	// if (e.target == moveElem) {
		
    //     dragging = true; //激活拖拽状态
    //     var moveElemRect = moveElem.getBoundingClientRect();
    //     tLeft = e.clientX - moveElemRect.left; //鼠标按下时和选中元素的坐标偏移:x坐标
    //     tTop = e.clientY - moveElemRect.top; //鼠标按下时和选中元素的坐标偏移:y坐标
    // }
});

//监听鼠标放开事件
document.addEventListener('mouseup', function(e) {
	// dragging = false;
});

//监听鼠标移动事件
document.addEventListener('mousemove', function(e) {
	// if (dragging) {
	// 	var moveX = e.clientX - tLeft, 
	// 	moveY = e.clientY - tTop;

	// 	moveElem.style.left = moveX + 'px';
	// 	moveElem.style.top = moveY + 'px';
		
	// }
});