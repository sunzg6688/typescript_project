/**
 * Created by samsung on 2015/10/22.
 */
(function(a, e, f, g, b, c, d) {a.ClickiTrackerName = b;
    a[b] = a[b] || function() {(a[b].queue = a[b].queue || []).push(arguments)};
    a[b].start = +new Date; c = e.createElement(f); d = e.getElementsByTagName(f)[0];
    c.async = 1; c.src = g; d.parentNode.insertBefore(c, d)
})(window, document, 'script', ('https:' == document.location.protocol ? 'https://stm-collect' : 'http://stm-cdn') + '.cn.miaozhen.com/clicki.min.js', 'stm_clicki');
stm_clicki('create', 'dc-92', 'auto');
stm_clicki('send', 'pageview');

function buttonClick(value){
    var category;
    var action="点击";
    var label;
    switch (value){
        case 1:
            category="游戏首页";
            label="游戏首页-获奖名单";
            break;
        case 2:
            category="游戏首页";
            label="游戏首页-start";
            break;
        case 3:
            category="活动说明页";
            label="活动说明页-OK";
            break;
        case 4:
            category="未完成页";
            label="未完成页-再来一次";
            break;
        case 5:
            category="未完成页";
            label="未完成页-我要离开";
            break;
        case 6:
            category="抽奖页";
            label="抽奖页-GO";
            break;
        case 7:
            category="中奖页";
            label="中奖页-领取奖品";
            break;
        case 8:
            category="输入个人信息页";
            label="输入个人信息页-提交";
            break;
        case 9:
            category="中奖成功页";
            label="中奖成功页-分享";
            break;
        case 91:
            category="未中奖页";
            label="未中奖页-分享";
            break;
        case 10:
            category="未中奖页";
            label="未中奖页-再来一次";
            break;
        case 11:
            category="未完成页";
            label="未完成页-关注现代汽车中国官方公众号了解更多";
            break;
        case 111:
            category="中奖成功页";
            label="中奖成功页-关注现代汽车中国官方公众号了解更多";
            break;
        case 112:
            category="未中奖页";
            label="未中奖页-关注现代汽车中国官方公众号了解更多";
            break;
        case 12:
            category="中奖名单页";
            label="中奖名单页-返回游戏";
            break;
        case 13:
            category="分享浮层页";
            label="分享浮层页-点击这里分享朋友圈";
            break;
        default :
            category="category";
            label="";
            break;
    }
    stm_clicki('send', 'event', category, action, label, 1);
}