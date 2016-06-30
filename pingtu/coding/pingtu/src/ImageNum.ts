/**
 * Created by sunzg on 15/9/29.
 */
class ImageNum extends egret.Sprite{

    private num;
    constructor(num:number,pos:egret.Point){
        super();
        this.num=num;

        var value=Math.abs(num);
        var valueString=value.toString();
        var valueArr=valueString.split("");

        for(var i=0;i<valueArr.length;i++){
            var bitmap:egret.Bitmap=new egret.Bitmap();
            bitmap.texture=RES.getRes(valueArr[i]);
            bitmap.x=this.numChildren*63;
            this.addChild(bitmap);
        }

        this.x=pos.x-this.width/2;
        this.y=pos.y-this.height/2;

    }
}