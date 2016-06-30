/**
 * Created by sunzg on 15/9/28.
 */
class BitmapBtn extends egret.Sprite{

    private resName;
    public res:egret.Bitmap=new egret.Bitmap();

    constructor(res){
        super();
        this.resName=res;
        this.touchEnabled=true;

        this.res.texture=RES.getRes(res);
        this.addChild(this.res);

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);
    }

    private touchBegin(evt:any){
        this.res.width=this.res.texture._bitmapWidth+10;
        this.res.height=this.res.texture._bitmapHeight+10;
        this.res.x=-5;
        this.res.y=-5;
    }

    private touchEnd(){
        this.res.width=this.res.texture._bitmapWidth;
        this.res.height=this.res.texture._bitmapHeight;
        this.res.x=0;
        this.res.y=0;
    }

    public resetResSize(){
        this.res.width=this.res.texture._bitmapWidth;
        this.res.height=this.res.texture._bitmapHeight;
        this.res.x=0;
        this.res.y=0;
    }

}