//思路
// 1.点击开始游戏 ==> startpage消失 ==> 游戏开始
// 2.随即开始出现食物，出现三节蛇开始运动
// 3.上下左右 ==> 改变方向
// 4.判断吃到食物 ==> 食物消失，蛇身体+1
// 5.判断游戏结束，弹出结束框

var content = document.getElementById('contant');
var scoreBox = document.getElementById('score');
var startPage = document.getElementById('startPage');
var gameStart = document.getElementById('gameStart');
var lose = document.getElementById('lose');
var loseScore = document.getElementById('loseScore');
var close = document.getElementById('close');
var control = document.getElementById('control');
var startOrPause = document.getElementById('startOrPause');
var snakeMove;

var speed = 200;
var startPushBool = true;//是否开始游戏
var startGameBool = true; //是否允许开始游戏
var stopGameBool = true;//是否暂停游戏

Init();

function Init() {
    //取到地图大小。
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    //苹果
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    //[3,1,'snakehead']  3代表width的位置 1表示height的位置 'snakehead' 代表样式的 class名
    this.snakeBody = [[3, 1, 'snakehead'], [2, 1, 'snakebody'], [1, 1, 'snakebody']];

    //游戏属性 
    //默认方向设置为right
    this.direct = 'right';
    this.snakeMoveLeft = false;
    this.snakeMoveRight = false;
    this.snakeMoveUp = true;
    this.snakeMoveDown = true;

    // 初始化分数
    this.score = 0;

    //开始游戏
    startGame();
}

function startGame() {
    startPage.style.display = 'block';
    bindEvent();
    food();
    snake();
}

//生成食物
function food() {
    var food = document.getElementsByClassName('food')[0];
    if (!food) {
        food = document.createElement('div');
        food.style.width = this.foodW + 'px';
        food.style.height = this.foodH + 'px';
        food.style.position = 'absolute';
        this.foodX = Math.floor(Math.random() * (this.mapW / 20));
        this.foodY = Math.floor(Math.random() * (this.mapH / 20));
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 20 + 'px';
        this.mapDiv.appendChild(food).setAttribute('class', 'food');
    }
}

//生成蛇
function snake() {
    var len = this.snakeBody.length;
    for (var i = 0; i < len; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');

        switch (this.direct) {
            case 'right':
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}

//运动判断
function move() {
    var len = this.snakeBody.length;
    for (var i = len - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();

    //移动判断，是否吃到食物
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {

        var snakeEndX = this.snakeBody[len - 1][0];//蛇最后一节的左右位置
        var snakeEndY = this.snakeBody[len - 1][1];//蛇最后一节的上下位置

        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'snakebody']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'snakebody']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'snakebody']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'snakebody']);
                break;
            default:
                break;
        }

        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();


    }

    //移动判断 是否碰到边界
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        reloadGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        reloadGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];

    for (var i = 1; i < len; i++) {
        if (snakeHX == snakeBody[1][0] && snakeHY == snakeBody[i][1]) {
            reloadGame();
        }
    }
}

//删去当前传入的具有class的类名的元素
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

//监听键盘事件
function bindEvent() {
    //开始游戏
    gameStart.onclick = function () {
        startAndPush();
    }
    //结束游戏关闭
    close.onclick = function () {
        lose.style.display = 'none';
        scoreBox.innerHTML = "";
    }
    //开始或暂停
    startOrPause.onclick = function () {
        startAndPush();
    }

}

//方向判断
function setDerict(code) {
    switch (code) {
        //left
        case 37:
            if (this.snakeMoveLeft) {
                this.direct = 'left';
                this.snakeMoveLeft = false;
                this.snakeMoveRight = false;
                this.snakeMoveUp = true;
                this.snakeMoveDown = true;
            }
            break;
        //up
        case 38:
            if (this.snakeMoveUp) {
                this.direct = 'up';
                this.snakeMoveLeft = true;
                this.snakeMoveRight = true;
                this.snakeMoveUp = false;
                this.snakeMoveDown = false;
            }
            break;
        //right
        case 39:
            if (this.snakeMoveRight) {
                this.direct = 'right';
                this.snakeMoveLeft = false;
                this.snakeMoveRight = false;
                this.snakeMoveUp = true;
                this.snakeMoveDown = true;
            }
            break;
        //down
        case 40:
            if (this.snakeMoveDown) {
                this.direct = 'down';
                this.snakeMoveLeft = true;
                this.snakeMoveRight = true;
                this.snakeMoveUp = false;
                this.snakeMoveDown = false;
            }
            break;
        default:
            break;
    }
}

//重新加载游戏
function reloadGame() {

    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);

    this.snakeBody = [[3, 1, 'snakehead'], [2, 1, 'snakebody'], [1, 1, 'snakebody']];

    //游戏属性 
    //默认方向设置为right
    this.direct = 'right';
    this.snakeMoveLeft = false;
    this.snakeMoveRight = false;
    this.snakeMoveUp = true;
    this.snakeMoveDown = true;


    lose.style.display = 'block';
    loseScore.innerHTML = this.score;
    this.score = 0;
    
    this.startPushBool = true;
    this.startGameBool = true;

    startOrPause.setAttribute('src', 'image/start.png');
}

//开始或者暂停
function startAndPush() {

    if (startPushBool) {

        if (startGameBool) {
            startGame();
            startGameBool = false;
        }

        startPage.style.display = 'none';
        control.style.display = 'block';
        startOrPause.setAttribute('src', 'image/pause.png');

        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval(() => {
            move();
        }, speed);
        startPushBool = false;
    }
    else {
        startOrPause.setAttribute('src', 'image/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        startPushBool = true;

    }

}