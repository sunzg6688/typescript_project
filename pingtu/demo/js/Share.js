/*
 * Created by zafirlee on 15/3/31.
 */
$(function(){




    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        // 这里警告框会阻塞当前页面继续加载
        // 以下代码是用javascript强行关闭当前页面
        //if(location.href.indexOf("hyundaipintu.local.opentide.com.cn")!=-1){
        //
        //}else{
        //    alert('已禁止本次访问：请在微信内打开本页面！');
        //    var opened = window.open('about:blank', '_self');
        //    opened.opener = null;
        //    opened.close();
        //}

        //测试用
        if(location.href.indexOf("weixinShare")!=-1){

        }

    }



    function getRealPath(){
        /*//获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
        var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： myproj/view/my.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/myproj
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);

        //得到了 http://localhost:8083/myproj
        var realPath=localhostPaht+projectName;*/
        var curWwwPath = location.href;
        var temp = curWwwPath.split("/")
        temp.pop();
        temp = temp.join("/")

        return temp;
    }

    //alert("正式环境关闭debug模式！");
    var baseURL = getRealPath();
    
    $(".log").html("load")
    $.ajax({
        url: 'http://wechat.hyundai.com.cn/heka/Api_Share.aspx',
        type: "GET",
        dataType: 'jsonp',
        data: {url:location.href},
        success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
          
            wx.config({
                debug: true,
                appId: json.appId,//'<?php echo $signPackage["appId"];?>',
                timestamp: json.timestamp,//<?php echo $signPackage["timestamp"];?>,
                nonceStr: json.nonceStr,//'<?php echo $signPackage["nonceStr"];?>',
                signature: json.signature,//'<?php echo $signPackage["signature"];?>',
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });
        } 
    });

    wx.error(function(res){

        alert(res);
        console.log("error:",res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

    });
    window.shareTimeline={
        'title': '如何用15秒就能获得免费iPhone6s？一起来比“拼”吧！',
        'url': baseURL+'/index.html',
        'picURL': baseURL + '/share.jpg'
    };

    window.shareAppMessage={
        'title': '拼出彩，拼现代！',
        'description': '如何用15秒就能获得免费iPhone6s？一起来比“拼”吧！',
        'url': baseURL+'/index.html',
        'picURL': baseURL + '/share.jpg'
    }
    
    wx.ready(function(){
        wx.showMenuItems({
            menuList: [
                'menuItem:profile',
                'menuItem:addContact',
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite"]
        });
        wx.onMenuShareTimeline({
            title: window.shareTimeline.title, // 分享标题
            link: window.shareTimeline.url, // 分享链接
            imgUrl:window.shareTimeline.picURL, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                //setShareCount()
                buttonClick(13);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                buttonClick(13);
            }
        });

        wx.onMenuShareAppMessage({
            title: window.shareAppMessage.title, // 分享标题
            desc: window.shareAppMessage.description, // 分享描述
            link: window.shareAppMessage.url, // 分享链接
            imgUrl:window.shareAppMessage.picURL, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                //setShareCount()
                //alert("appMessage ok",window.shareAppMessage.url,window.shareAppMessage.description);
                buttonClick(13);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                buttonClick(13);
            }
        });

        wx.onMenuShareQQ({
            title: window.shareAppMessage.title, // 分享标题
            desc: window.shareAppMessage.description, // 分享描述
            link: window.shareAppMessage.url, // 分享链接
            imgUrl:window.shareAppMessage.picURL, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                //setShareCount();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
})