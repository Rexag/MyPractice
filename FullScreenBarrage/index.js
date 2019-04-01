window.onload = function () {
    var oBtn = document.getElementById("btn");
    var oText = document.getElementById("screen");
    var oScreen = document.getElementsByClassName("main-screen")[0];
    oBtn.onclick = sendMessage;
    // 每次点击清空输入框
    oText.onclick = function () {
        oText.value = "";
    };
    //添加回车提交事件
    document.onkeydown = function (evt) {
        var event = evt || window.event;//兼容IE
        if (event.keyCode == 13) {
            sendMessage();
        }
    };

    function sendMessage() {
        if (oText.value.trim() == "") {
            alert("请正确输入");
        }
        else {
            var oDan1 = document.createElement("span");
            oDan1.innerText = oText.value;

            // 定义随机字体大小
            var oFontSize = parseInt(Math.random() * 16 + 16);
            //生成随机颜色 这个实现非常逆天，虽然有点小bug。我们知道hex颜色值是从#000000到#ffffff，后面那六位数是16进制数，相当于"0x000000" 到"0xffffff"。
            //这实现的思路是将hex的最大值ffffff先转换为10进制，进行random后再转换回16进制。我们看一下，如何得到 16777215 这个数值的。
            var oFontColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            // JavaScript代码 alert(parseInt("0xffffff",16).toString(10));  
            // 随机高度
            var oMax = oScreen.offsetHeight - oFontSize;
            var oMin = oScreen.offsetTop;
            var oHeight = Math.floor(Math.random() * (oMax - oMin) + oMin);

            oDan1.style.color = oFontColor;
            oDan1.style.fontSize = oFontSize + "px";
            oDan1.style.marginTop = oHeight + "px";

            // Move
            var variable = 800; //800是mainScreen的宽度，也可写成：oDan1.offsetLeft
            var timer = setInterval(function () {
                oDan1.style.marginLeft = variable + "px";
                //如果没有超出边界就将span动态添加到oScreen
                if (variable > -oDan1.offsetWidth) {
                    variable -= 2;
                    oScreen.appendChild(oDan1);
                }
                else {
                    clearInterval(timer);
                    // 当显示超出范围就删除节点，这里我之前用display:none不管用
                    oDan1.parentNode.removeChild(oDan1);
                }
            }, 1);
        }
    }
}