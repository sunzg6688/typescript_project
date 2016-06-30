/**
 * Created by sunzg on 15/9/28.
 */
var GameOverLayer = (function (_super) {
    __extends(GameOverLayer, _super);
    function GameOverLayer() {
        _super.call(this);
        this.gzBtn = new BitmapBtn("guanzhuxd");
        this.init();
    }
    var __egretProto__ = GameOverLayer.prototype;
    __egretProto__.init = function () {
        this.width = ScreenConst.width;
        this.height = ScreenConst.height;
        var mask = new egret.Bitmap();
        mask.width = this.width;
        mask.height = this.height;
        mask.texture = RES.getRes("mask");
        this.addChild(mask);
        this.zlycBtn = new BitmapBtn("zlyc");
        this.zlycBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zlycHandler, this);
        this.wylkBtn = new BitmapBtn("wylk");
        this.wylkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wylkHandler, this);
        this.gzBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gzxd, this);
    };
    __egretProto__.gzxd = function () {
        Main.main.gzxd(11);
    };
    __egretProto__.zlycHandler = function () {
        var _this = this;
        egret.Tween.get(this.gzBtn).to({ x: 750 }, 400);
        egret.Tween.get(this.wylkBtn).to({ x: 750 }, 400);
        egret.Tween.get(this.zlycBtn).to({ x: -600 }, 400).call(function () {
            _this.parent.removeChild(_this);
            Main.main.restartGame();
        }, this);
        Main.main.buttonClick(4);
    };
    __egretProto__.wylkHandler = function () {
        var _this = this;
        egret.Tween.get(this.gzBtn).to({ x: 750 }, 400);
        egret.Tween.get(this.zlycBtn).to({ x: -600 }, 400);
        egret.Tween.get(this.wylkBtn).to({ x: 750 }, 400).call(function () {
            _this.parent.removeChild(_this);
            var win = window;
            win.gotoStartPage();
        }, this);
    };
    __egretProto__.playInitTween = function () {
        //if(Main.main.jp==JP.yg3c){
        //    this.zlycBtn.res.texture=RES.getRes("yg3c");
        //    this.zlycBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.zlycHandler,this);
        //}
        this.zlycBtn.x = -600;
        this.zlycBtn.y = 350;
        this.addChild(this.zlycBtn);
        egret.Tween.get(this.zlycBtn).to({ x: 0 }, 300);
        this.wylkBtn.x = 750;
        this.wylkBtn.y = 600;
        this.addChild(this.wylkBtn);
        egret.Tween.get(this.wylkBtn).to({ x: 170 }, 300);
        this.gzBtn.x = 750;
        this.gzBtn.y = 850;
        this.addChild(this.gzBtn);
        egret.Tween.get(this.gzBtn).to({ x: 224 }, 300);
    };
    return GameOverLayer;
})(egret.Sprite);
GameOverLayer.prototype.__class__ = "GameOverLayer";
