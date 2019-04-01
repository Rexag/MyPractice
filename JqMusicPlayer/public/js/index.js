(function () {
    var audioElemet = document.createElement('audio');//创建audio标签
    var timeLen =$('.player_timeLineBar').get(0).offsetWidth;//获取进度条的总长度
    var t = new TimelineMax();//创建TM动画实例
    // audioElemet.setAttribute('src', $('.active_song').attr('data-origin'));
    t.to('.player_cdData', 3,
        {
            rotation: '360deg',//旋转
            ease: Power0.easeNone,//动画曲线缓冲
            repeat: -1//重重次数 无限
        }, "-=0.2s"//提前0.2s进入动画重复的时候
    )//设置动画属性
    t.pause();//动画暂停。
    function changeSoneLrc() {//获取dom上的歌词和歌手列表
        $('.songName').text($('.active_song').attr('data-song'));
        $('.auctor').text($('.active_song').attr('data-auctor'));
    }
    //点击播放
    $('.player_play').click(function () {
        if ($('.player').hasClass('play')) {//判断player上是否有play
            $('.player').removeClass('play')//有的话移除
            TweenMax.to(
                '.player_cdData', 0.2,
                {
                    scale: 1,
                    ease: Power0.easeNone
                }
            );//让CD尺寸还原动画
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: 0,
                    ease: Power0.easeNone
                }
            );//让背板下降动画
            t.pause();//旋转暂停
            audioElemet.pause();//音乐暂停
        } else {
            $('.player').addClass('play');//如果没有play 加上play
            TweenMax.to(
                '.player_cdData', 0.2,
                {
                    scale: 1.1,
                    ease: Power0.easeNone
                }
            );//让CD放大
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: '-50%',
                    ease: Power0.easeNone
                }
            );//让背板上升
            t.play();//CD旋转动画
            audioElemetPlay();//音乐播放
            changeSoneLrc();//歌词背景信息
            durationLine();//进度条开始
        }
    })
    function audioElemetPlay(){//音乐播放函数
        if ($('.player').hasClass('play')){
            audioElemet.setAttribute('src', $('.active_song').attr('data-origin'));
            audioElemet.play();
        }
    }
    //上一个按钮
    $('.player_prev').click(function () {
        if ($('.player .player_cdData.active_song').is(":first-child")) {//判断cd播放是否是第一个
            $('.player .player_cdData.active_song').removeClass('active_song')
            $('.player .player_cdData:last-child').addClass('active_song');
        } else {
            $('.player .player_cdData.active_song').removeClass('active_song').prev().addClass('active_song');
        };
        audioElemetPlay();
        changeSoneLrc();
        durationLine();
    })
    //下一个按钮
    $('.player_next').click(function () {
        if ($('.player .player_cdData.active_song').is(":last-child")) {//判断cd播放是否是最后一个
            $('.player .player_cdData.active_song').removeClass('active_song')
            $('.player .player_cdData:first-child').addClass('active_song');
        } else {
            $('.player .player_cdData.active_song').removeClass('active_song').next().addClass('active_song');
        };
        audioElemetPlay();
        changeSoneLrc();
        durationLine();
    })

function durationLine(){//
    audioElemet.addEventListener('timeupdate',function(){
    var duration  =this.duration //整首歌的长度s为单位；
    var currTime = this.currentTime//当前时间s为单位
    var percent = currTime/duration;//当前播放的比例
    //console.log(percent*timeLen);
    $('.player_duration').css({
        width:parseInt(percent*timeLen)+"px"
        })
    })
}
})()