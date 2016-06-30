/**
 * Created by sunzg on 15/9/30.
 */
designScale=getScale(750);

function getScale(designWidth){
    console.log(window.screen.width);
    return window.screen.width/designWidth;
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

function okBtnLoad(){

}