/**
 * Created by sunzg on 15/9/24.
 */

function getScale(designWidth){
//    alert(window.screen.width);
    return document.documentElement.clientWidth/designWidth;
}

function getImgNaturalWidth(img,callback){
    var nWidth,nHeight;
    if(img.naturalWidth){
        nWidth=img.naturalWidth;
        nHeight=img.naturalHeight;
    }else{//IE6.7.8
        var image=new Image();
        image.src=img.src;
        image.onload=function(){
            callback(image.width,image.height);
        }
    }
    return [nWidth,nHeight];
}

function init(){

    var startContent=document.getElementById("startContent");
    startContent.style.display="block";
    startContent.style.width=750*designScale+"px";
    startContent.style.height=1334*designScale+"px";

    var car=document.getElementById("startCar");
    car.style.top=450*designScale+"px";
    car.style.left=50*designScale+"px";
    car.style.width=getImgNaturalWidth(car)[0]*designScale+"px";

    var tile=document.getElementById("startTile");
    tile.style.top=690*designScale+"px";
    tile.style.left=40*designScale+"px";
    tile.style.width=getImgNaturalWidth(tile)[0]*designScale+"px";

    var startgz=document.getElementById("startgz");
    startgz.style.top=950*designScale+"px";
    startgz.style.left=15*designScale+"px";
    startgz.style.width=getImgNaturalWidth(startgz)[0]*designScale+"px";

    var starthj=document.getElementById("starthj");
    starthj.style.top=1060*designScale+"px";
    starthj.style.left=30*designScale+"px";
    starthj.style.width=getImgNaturalWidth(starthj)[0]*designScale+"px";

    var startBtn=document.getElementById("startBtn");
    startBtn.style.top=860*designScale+"px";
    startBtn.style.right=0*designScale+"px";
    startBtn.style.width=getImgNaturalWidth(startBtn)[0]*designScale+"px";

    var startTop=document.getElementById("startTop");
    startTop.style.top=0+"px";
    startTop.style.height=178*designScale+"px";
    startTop.style.width=750*designScale+"px";

    var startBottom=document.getElementById("startBottom");
    startBottom.style.top=1090*designScale+"px";
    startBottom.style.height=244*designScale+"px";
    startBottom.style.width=750*designScale+"px";
}

function wonLoaded(){
    init();
}

designScale=getScale(750);

window.onload=wonLoaded;