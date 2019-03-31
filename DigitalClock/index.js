function Index(wrapper, use24Hours) {
    this.clockNum = {
        hour: [[0, 1, 2], [0, 1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        minute: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        second: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
    }
    console.log(this, "---------this--Index----------");

    Index.prototype.fillHtml(wrapper, use24Hours, this.clockNum);
    console.log("---------aaaaaaaaaa----------");
    var dom = $('.column');
    this.column = Array.from(dom);
    console.log(this.column, "----------this.column--------------");
    this.classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];
    this.use24Hours = use24Hours;
    this.start();
}
Index.prototype.start = function () {
    var self = this;
    setInterval(function () {
        var c = self.getClock();
        self.column.forEach(function (ele, index) {
            var n = + c[index];
            var offset = n * 86;
            $(ele).css({
                'transform': 'translateY(calc(50vh - ' + offset + 'px - ' + 43 + 'px))'
            })
            Array.from(ele.children).forEach(function (ele2, i2) {

                var className = self.getClassName(n, i2);
                $(ele2).attr('class', className)
            })
        })
    }, 200)
}
Index.prototype.getClock = function () {
    var d = new Date();
    return [this.use24Hours ? d.getHours() : d.getHours() % 12 || 12, d.getMinutes(), d.getSeconds()].reduce(function (p, n) {

        return (p + ('0' + n).slice(-2));
    }, '')
}
Index.prototype.getClassName = function (n, i2) {
    var className = this.classList.find(function (className, classIndex) {
        return i2 - classIndex === n || i2 + classIndex === n;
    })
    return className || '';
}
Index.prototype.fillHtml = function (wrapper, use24Hours, clockNum) {
    // 清空dom元素
    wrapper.empty();

    //生成时区第一位
    var html = '';
    html += '<div class = "column">';
    if (use24Hours) {
        for (var i = 0; i < clockNum.hour[0].length; i++) {
            html += '<div>' + i + '</div>';
        }
    } else {
        for (var i = 0; i < clockNum.hour[1].length; i++) {
            html += '<div>' + i + '</div>';
        }
    }
    html += '</div>';
    //生成时区第二位
    html += '<div class = "column">';
    for (var i = 0; i < clockNum.hour[2].length; i++) {

    }
    html += '</div>';

    //冒号
    html += '<div class="coln">:</div>';
    //生成分钟第一位
    html += '<div class = "column">';
    for (var i = 0; i < clockNum.minute[0].length; i++) {
        html += '<div>' + i + '</div>';
    }
    html += '</div>';

    //生成分钟第二位
    html += '<div class = "column">';
    for (var i = 0; i < clockNum.minute[1].length; i++) {
        html += '<div>' + i + '</div>';
    }
    html += '</div>';

    //冒号
    html += '<div class="coln">:</div>';

    //生成秒数第一位
    html += '<div class = "column">';
    for (var i = 0; i < clockNum.second[0].length; i++) {
        html += '<div>' + i + '</div>';
    }
    html += '</div>';

    //生成秒数第二位
    html += '<div class = "column">';
    for (var i = 0; i < clockNum.second[1].length; i++) {
        html += '<div>' + i + '</div>';
    }
    html += '</div>';

    wrapper.append(html);

};
new Index($('.clock-wrapper'), true);