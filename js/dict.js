var color = {
    default: '#DDDDDD',
    colorList: ['#7B68EE', '#FFD700', '#FFA500', '#FF3E96', '#CD4F39', '#76EE00', '#48D1CC', '#3CB371', '#00B2EE'],
    random: function() {
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }
};
