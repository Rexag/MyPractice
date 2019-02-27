// // 1. 点击开始游戏 ==>  动态生成100个小格子
// // 2. leftclick 没有雷 ==> 显示数字（代表已当前小格为中心周围8个格子的雷数）
// // 3. 扩散 ==> 当前8个格子没有雷
// // 4. rightclick 没有标记 ==> 进行标记  有标记 ==> 取消标记  
// //                ==>标记是否正确，10个标记都正确，提示游戏成功
// // 5. 已经点击过，出现数字 ==> 无效果  点击到雷 ==> 游戏结束

var startGame = document.getElementById('startGame');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var score = document.getElementById('score');
var alertImg = document.getElementById('alertImg');
var close = document.getElementById('close');
var alertBox = document.getElementById('alertBox');


var mineNum;
var mineOver;
var block;
var mineMap = [];
var GameStartBool = true;


function init() {
    console.log("=====init=====");

    mineNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({ mine: 0 });
        }
    }

    block = document.getElementsByClassName('block');
    while (mineNum > 0) {

        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex] = 1;
            block[mineIndex].classList.add('thunder');
            mineNum--;
        }
    }

}


function bindEvent() {
    console.log("=====bindEvent=====");

    startGame.onclick = function (e) {
        if (GameStartBool) {
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            GameStartBool = false;
        }

    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftClick(event)
        } else if (e.which == 3) {
            rightClick(event);
        }
    }
    close.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = ' ';
        GameStartBool = true;
    }

}

function leftClick(dom) {
    var thunder = document.getElementsByClassName('thunder');
    if (dom && dom.classList.contains('thunder')) {
        for (var i = 0; i < thunder.length; i++) {
            thunder[i].classList.add('show');
        }
        setTimeout(() => {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'URL("image/Over.jpg")';
        }, 800);
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        
        //遍历当前点击的元素周围8个div
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('thunder')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        //如果点击的div是0 ，则再次开始遍历周围8个格子是否存在雷
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    console.log(nearBox);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}
function rightClick(dom) {

    if (dom && dom.classList.contains('num')) {
        return;
    }
    dom && dom.classList.toggle('flag');
    if (dom && dom.classList.contains('thunder') && dom.classList.contains('flag')) {
        mineOver--;

    }
    if (dom && dom.classList.contains('thunder') && !dom.classList.contains('flag')) {
        mineOver++
    }
    score.innerHTML = mineOver;
    if (mineOver == 0) {
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("image/success.png")';
    }
}
bindEvent();
