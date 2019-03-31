function init() {
    var imgs = $('img');
    var len = imgs.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        $(imgs[i]).css({
            transform: 'rotateY(' + i * deg + 'deg) translateZ(350px)',
            transition: 'transform 1s ' + (len - 1 - i) * 0.1 + 's'
        })
    }
    bandEvent();
};
function bandEvent() {
    var imgBox = $('.box');
    var body = $('body');
    var lastX, lastY, nowX, nowY, disX = 0, disY = 0;
    var roX = -10, roY = 0;
    var timer;
    body.on('mousedown', function (e) {
        var event = e || window.event;
        clearInterval(timer);
        lastX = event.clientX;
        lastY = event.clientY;
        body.on('mousemove', function (e) {
            var event = e || window.event;
            nowX = event.clientX;
            nowY = event.clientY;
            disX = nowX - lastX;
            disY = nowY - lastY;
            roX -= disY * 0.2;
            roY += disX * 0.2;
            imgBox.css({
                'transform': 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                'cursor': 'move'
            });
            lastX = nowX;
            lastY = nowY;
        });
        body.on('mouseup', function () {
            body.off('mousemove');
            clearInterval(timer);
            timer = setInterval(function () {
                disX *= 0.98;
                disY * +0.98;
                roX -= disY * 0.2;
                roY += disX * 0.2;
                imgBox.css({
                    'transform': 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)',
                    'cursor': 'pointer'
                });
                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    clearInterval(timer);
                }
            }, 20);
        });
        return false;
    });
};
init();
