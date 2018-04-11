var color = {
    default: '#DDDDDD',
    colorList: ['#7B68EE', '#FFD700', '#FFA500', '#FF3E96', '#CD4F39', '#76EE00', '#48D1CC', '#3CB371', '#00B2EE'],
    random: function() {
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }
};

var matrix = {
    matrixList: [
        //one block
        [[1]],
        //row
        [[1,1,1,1,1]],
        [[1,1,1,1]],
        [[1,1,1]],
        [[1,1]],
        //column
        [[1],[1],[1],[1],[1]],
        [[1],[1],[1],[1]],
        [[1],[1],[1]],
        [[1],[1]],
        //2*2 blocks
        [[1,1],[1,1]],
        [[1,1],[1,0]],
        [[1,1],[0,1]],
        [[1,0],[1,1]],
        [[0,1],[1,1]],
        //3*3 blocks
        [[1,1,1],[1,1,1],[1,1,1]],
        [[1,1,1],[1,0,0],[1,0,0]],
        [[1,1,1],[0,0,1],[0,0,1]],
        [[1,0,0],[1,0,0],[1,1,1]],
        [[0,0,1],[0,0,1],[1,1,1]]
    ],
    random: function() {
        return this.matrixList[Math.floor(Math.random() * this.matrixList.length)];
    }
};
