//                      Canvas
//  Canvas.getContext('2d')             3d     webGL
//  ctx = canvas.getContext('2d');      Canvas的上下文
//  ctx.stroke();                       笔触
//  ctx.strokeStyle                     设置笔触样式
//  ctx.moveTo(100,100);                落笔的点 
//  ctx.lineTo(200,200);                画一条线(两点之间连线)
//  ctx.lineWidth                       笔画粗细
//  ctx.fill()                          填充
//  ctx.closePath()                     闭合路径
//  ctx.beginPath()                     开启路径
//  ctx.getlImageData(x,y,w,h)          获取笔触路径下的像素集合
//  ctx.lineCap                         线条起始结尾样式
//  ctx.lineJoin                        转弯处样式

//  var imageData = ctx.getlImageData(x,y,w,h) 

//  将像素集合放到指定位置   参数(像素集合，x轴坐标，y轴坐标)
// ctx.putImageData(imageData,300,400)

// //清除整个画布 （500，500）是画布的宽高
// ctx.clearRect(0,0,500,500); 

var drawingBoard = {
    cavs: document.getElementById('cavs'),
    ctx: document.getElementById('cavs').getContext('2d'),
    btn_container: document.getElementsByTagName('ul')[0],
    colorBtn: document.getElementById('colorChange'),
    lineRuler: document.getElementById('lineRuler'),
    imgsArr: [],
    init: function () {
        this.ctx.lineCap = 'round';//线条起始和结尾样式
        this.ctx.lineJoin = 'round';//转弯
        this.drawing();
        this.btnsAllFn()
    },
    drawing: function () {
        var self = this,
            cavs = this.cavs,
            c_left = cavs.offsetLeft,
            c_top = cavs.offsetTop;
        console.log(c_left, c_top);
        this.cavs.onmousedown = function (e) {
            self.bool = true;
            var c_x = e.pageX - c_left,
                c_y = e.pageY - c_top;
            self.ctx.beginPath();
            self.ctx.moveTo(c_x, c_y);

            var img = self.ctx.getImageData(0, 0, self.cavs.offsetWidth, self.cavs.offsetHeight);
            self.imgsArr.push(img);
            console.log(self.imgsArr);

        }
        this.cavs.onmousemove = function (e) {
            if (self.bool) {
                self.ctx.lineTo(e.pageX - c_left, e.pageY - c_top);
                self.ctx.stroke();
            }
        }
        this.cavs.onmouseup = function (e) {
            self.ctx.closePath();
            self.bool = false;

        }
        this.cavs.onmouseleave = function (e) {
            self.ctx.closePath();
            self.bool = false;

        }
    },
    btnsAllFn: function () {
        var self = this;
        this.btn_container.onclick = function (e) {
            switch (e.target.id) {
                case 'cleanBoard':
                    //清屏
                    self.ctx.clearRect(0, 0, self.cavs.offsetWidth, self.cavs.offsetHeight);
                    break
                case 'eraser':
                    //橡皮
                    self.ctx.strokeStyle = '#ffffff';
                    break
                case 'rescind':
                    //撤销
                    if (self.imgsArr.length > 0) {
                        self.ctx.putImageData(self.imgsArr.pop(), 0, 0);
                    }
                    break
            }
        }
        this.colorBtn.onchange = function () {//颜色改变
            console.log(this.value)
            self.ctx.strokeStyle = this.value;
        }
        this.lineRuler.onchange = function () {//粗细改变
            self.ctx.lineWidth = this.value;
        }

    }
}
drawingBoard.init();








// var drawingBoard = {
//     cavs: document.getElementById('cavs'),
//     ctx: document.getElementById('cavs').getContext('2d'),
//     btn_container: document.getElementsByTagName('ul')[0],
//     colorBtn: document.getElementById('colorChange'),
//     lineRuler: document.getElementById('lineRuler'),
//     imgsArr: [],
//     init: function () {
//         this.ctx.lineCap = 'round';//线条起始和结尾样式
//         this.ctx.lineJoin = 'round';//转弯
//         this.drawing();
//         this.btnsAllFn()
//     },
//     drawing: function () {
//         var self = this,
//             cavs = this.cavs,
//             c_left = cavs.offsetLeft,
//             c_top = cavs.offsetTop;
//         console.log(c_left, c_top);
//         this.cavs.onmousedown = function (e) {
//             self.bool = true;
//             var c_x = e.pageX - c_left,
//                 c_y = e.pageY - c_top;
//             self.ctx.beginPath();
//             self.ctx.moveTo(c_x, c_y);

//             var img = self.ctx.getImageData(0, 0, self.cavs.offsetWidth, self.cavs.offsetHeight);
//             self.imgsArr.push(img);
//             console.log(self.imgsArr);

//         }
//         this.cavs.onmousemove = function (e) {
//             if (self.bool) {
//                 self.ctx.lineTo(e.pageX - c_left, e.pageY - c_top);
//                 self.ctx.stroke();
//             }
//         }
//         this.cavs.onmouseup = function (e) {
//             self.ctx.closePath();
//             self.bool = false;

//         }
//         this.cavs.onmouseleave = function (e) {
//             self.ctx.closePath();
//             self.bool = false;

//         }
//     },
//     btnsAllFn: function () {
//         var self = this;
//         this.btn_container.onclick = function (e) {
//             switch (e.target.id) {
//                 case 'cleanBoard':
//                     //清屏
//                     self.ctx.clearRect(0, 0, self.cavs.offsetWidth, self.cavs.offsetHeight);
//                     break
//                 case 'eraser':
//                     //橡皮
//                     self.ctx.strokeStyle = '#ffffff';
//                     break
//                 case 'rescind':
//                     //撤销
//                     if (self.imgsArr.length > 0) {
//                         self.ctx.putImageData(self.imgsArr.pop(), 0, 0);
//                     }
//                     break
//             }
//         }
//         this.colorBtn.onchange = function () {//颜色改变
//             console.log(this.value)
//             self.ctx.strokeStyle = this.value;
//         }
//         this.lineRuler.onchange = function () {//粗细改变
//             self.ctx.lineWidth = this.value;
//         }

//     }
// }
// drawingBoard.init();