/**
 * Created by sunzg on 15/9/29.
 */
class NoLuckyLayer extends egret.Sprite{

    constructor(){
        super();
        this.width=ScreenConst.width;
        this.height=ScreenConst.height;

        var mask:egret.Bitmap=new egret.Bitmap();
        mask.width=this.width;
        mask.height=this.height;
        mask.texture=RES.getRes("mask");
        this.addChild(mask);
        this.init();
    }

    public wzj:egret.Bitmap;
    public reStartGameBtn:BitmapBtn=new BitmapBtn("zlyc");
    public shareBtn:BitmapBtn=new BitmapBtn("fenxiangBtn");
    private gzBtn:BitmapBtn=new BitmapBtn("guanzhuxd");

    public init(){

        this.wzj=new egret.Bitmap();
        this.wzj.texture=RES.getRes("hanyihan");
        this.wzj.x=80;
        this.wzj.y=300;
        this.addChild(this.wzj);

        this.reStartGameBtn.scaleX=0.8;
        this.reStartGameBtn.x=0;
        this.reStartGameBtn.y=652;
        this.addChild(this.reStartGameBtn);
        this.reStartGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartGame,this);

        this.shareBtn.x=750-250;
        this.shareBtn.y=616;
        this.addChild(this.shareBtn);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share,this);

        this.gzBtn.x=224;
        this.gzBtn.y=850;
        this.addChild(this.gzBtn);
        this.gzBtn.touchEnabled=true;
        this.gzBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gzxd,this);
        this.gzBtn.visible=true;
    }

    public yg3c(){
        this.reStartGameBtn.res.texture=RES.getRes("yg3c");
        this.reStartGameBtn.resetResSize();
        this.reStartGameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.reStartGame,this);
    }

    private gzxd(){
        Main.main.gzxd(112);
    }

    //TODO 需要把抽奖界面也移除
    public reStartGame(){
        if(this.parent){
            (<LotteryLayer>this.parent).restartLottery();
        }
        Main.main.buttonClick(10);
        //var parent=this.parent;
        //this.parent.removeChild(this);
        //(<LotteryLayer>parent).removeMe();
        //Main.main.restartGame();
    }

    //TODO 需要弹出分享引导页
    public share(){
        Main.main.showShare();
        Main.main.buttonClick(91);
    }
}