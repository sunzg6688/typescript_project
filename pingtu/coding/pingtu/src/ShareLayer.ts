/**
 * Created by sunzg on 15/10/8.
 */
class ShareLayer extends egret.Sprite{

    private yd
    constructor(){
        super();
        this.width=ScreenConst.width;
        this.height=ScreenConst.height;

        var mask:egret.Bitmap=new egret.Bitmap();
        mask.texture=RES.getRes("mask");
        mask.width=this.width;
        mask.height=this.height;
        this.addChild(mask);

        this.yd=new egret.Bitmap();
        this.yd.texture=RES.getRes("fenxiangjt");
        this.yd.x=(this.width-this.yd.texture.textureWidth)>>1;
        this.yd.y=10;
        this.addChild(this.yd);
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeMe,this);
    }

    public isShare(isShare){
        if(isShare){
            this.yd.texture=RES.getRes("fenxiangjt");
            this.yd.x=(this.width-this.yd.texture.textureWidth)>>1;
            this.yd.y=10;
        }else{
            this.yd.texture=RES.getRes("gzxdgzh");
            this.yd.x=(this.width-this.yd.texture.textureWidth)>>1;
            this.yd.y=10;
        }
    }

    public closeMe(){
        if(this.parent){
            this.parent.removeChild(this);
        }
    }
}