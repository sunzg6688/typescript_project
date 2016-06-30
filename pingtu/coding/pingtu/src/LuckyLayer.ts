/**
 * Created by sunzg on 15/9/29.
 */
class LuckyLayer extends egret.Sprite{

    constructor(){
        super();
        this.width=ScreenConst.width;
        this.height=ScreenConst.height;

        var mask:egret.Bitmap=new egret.Bitmap();
        mask.width=this.width;
        mask.height=this.height;
        mask.texture=RES.getRes("mask");
        this.addChild(mask);

        var bitmap:egret.Bitmap=new egret.Bitmap();
        bitmap.texture=RES.getRes("gongxihuode");
        bitmap.x=30;
        bitmap.y=170;
        this.addChild(bitmap);
    }

    private jpDesc:egret.Bitmap=new egret.Bitmap();
    private jp:egret.Bitmap=new egret.Bitmap();
    private gotBtn:BitmapBtn=new BitmapBtn("lingqujiangpin");

    private gzBtn:BitmapBtn=new BitmapBtn("guanzhuxd");
    private type:number=5;
    public initJP(jp:string){
        switch (jp){
            case JP.iphone:


                this.type=1;
                this.jp.texture=RES.getRes("iphone6sIcon");
                this.jp.anchorOffsetX=this.jp.texture._bitmapWidth/2;
                this.jp.x=750/2;
                this.jp.anchorOffsetY=this.jp.texture._bitmapHeight/2;
                this.jp.y=600;
                this.addChild(this.jp);

                this.jpDesc.texture=RES.getRes("iphone6syi");
                this.jpDesc.x=30;
                this.jpDesc.y=270;
                this.addChild(this.jpDesc);

                break;
            case JP.yashua:


                this.type=3;
                this.jp.texture=RES.getRes("yashuaIcon");
                this.jp.anchorOffsetX=this.jp.texture._bitmapWidth/2;
                this.jp.x=750/2;
                this.jp.anchorOffsetY=this.jp.texture._bitmapHeight/2;
                this.jp.y=600;
                this.jp.scaleX=this.jp.scaleY=2;

                this.addChild(this.jp);

                this.jpDesc.texture=RES.getRes("yashuayi");
                this.jpDesc.x=30;
                this.jpDesc.y=270;
                this.addChild(this.jpDesc);


                break;
            case JP.huafei:



                this.type=4;
                this.jp.texture=RES.getRes("20yuanIcon");
                this.jp.anchorOffsetX=this.jp.texture._bitmapWidth/2;
                this.jp.x=750/2;
                this.jp.anchorOffsetY=this.jp.texture._bitmapHeight/2;
                this.jp.y=600;

                this.jp.scaleX=this.jp.scaleY=2;
                this.addChild(this.jp);

                this.jpDesc.texture=RES.getRes("20yuanyi");
                this.jpDesc.x=30;
                this.jpDesc.y=270;
                this.addChild(this.jpDesc);

                break;
            case JP.watch:



                this.type=2;
                this.jp.texture=RES.getRes("watchIcon");
                this.jp.anchorOffsetX=this.jp.texture._bitmapWidth/2;
                this.jp.x=750/2;
                this.jp.anchorOffsetY=this.jp.texture._bitmapHeight/2;
                this.jp.y=600;
                this.addChild(this.jp);

                this.jpDesc.texture=RES.getRes("watchyi");
                this.jpDesc.x=30;
                this.jpDesc.y=270;
                this.addChild(this.jpDesc);

                break;
            default :
                break;
        }


        this.gotBtn.x=250;
        this.gotBtn.y=770;
        this.addChild(this.gotBtn);
        this.gotBtn.touchEnabled=true;
        this.gotBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gotoSubmit,this);

        this.gzBtn.x=224;
        this.gzBtn.y=990;
        this.addChild(this.gzBtn);
        this.gzBtn.touchEnabled=true;
        this.gzBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gzxd,this);
        this.gzBtn.visible=false;
    }

    private gzxd(){
        Main.main.gzxd(111);
    }

    private gotoSubmit(){
        this.gotBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.gotoSubmit,this);
        Main.main.win.showSubmitInfo(this.type);
    }

    public changeShare(){
        this.gotBtn.res.texture=RES.getRes("fenxiangBtn2");
        this.gotBtn.resetResSize();
        this.gotBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showShare,this);
        this.gzBtn.visible=true;
    }


    public showShare(){
        Main.main.showShare();
        Main.main.buttonClick(9);
    }


}