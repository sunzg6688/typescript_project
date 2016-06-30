/**
 * Created by sunzg on 15/9/28.
 */
var LotteryLayer = (function (_super) {
    __extends(LotteryLayer, _super);
    function LotteryLayer() {
        _super.call(this);
        this.bg = new egret.Bitmap();
        this.lotteryTime = 0;
        this.rotationSpeed = 30;
        this.rotationTime = 0;
        this.isOver = false;
        this.luckyLayer = new LuckyLayer();
        this.noLuckyLayer = new NoLuckyLayer();
        this.jp = JP.weizhongjiang;
        this.bg.texture = RES.getRes("cjbg");
        this.addChild(this.bg);
        this.init();
    }
    var __egretProto__ = LotteryLayer.prototype;
    __egretProto__.init = function () {
        this.zhizhen = new egret.Bitmap();
        this.zhizhen.texture = RES.getRes("cjzhizhen");
        this.zhizhen.x = 376;
        this.zhizhen.y = 718;
        this.zhizhen.anchorOffsetX = 168;
        this.zhizhen.anchorOffsetY = 163;
        this.addChild(this.zhizhen);
        this.goBtn = new BitmapBtn("cjgo");
        this.goBtn.x = 207;
        this.goBtn.y = 544;
        this.addChild(this.goBtn);
        this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startLottery, this);
    };
    __egretProto__.startLottery = function (evt) {
        this.lotteryTime++;
        egret.Ticker.getInstance().register(this.rotationZhizhen, this);
        this.rotationSpeed = 30;
        this.goBtn.visible = false;
        this.zhizhen.touchEnabled = true;
        egret.setTimeout(this.stopRotation, this, 1500);
        if (this.lotteryTime > 3) {
            Main.main.jp = JP.yg3c;
        }
        else {
            Main.main.getAward();
        }
        Main.main.buttonClick(6);
    };
    __egretProto__.rotationZhizhen = function (dif) {
        if (this.isOver) {
            this.rotationTime += dif;
            if (this.rotationTime > 500 && this.rotationTime <= 1000) {
                this.rotationSpeed = 25;
            }
            else if (this.rotationTime > 1000 && this.rotationTime <= 1400) {
                this.rotationSpeed = 20;
            }
            else if (this.rotationTime > 1400 && this.rotationTime <= 1800) {
                this.rotationSpeed = 15;
            }
            else if (this.rotationTime > 1800 && this.rotationTime <= 2200) {
                this.rotationSpeed = 10;
            }
            else if (this.rotationTime > 2200 && this.rotationTime <= 2700) {
                this.rotationSpeed = 5;
            }
            else if (this.rotationTime > 2700 && this.rotationTime <= 3500) {
                this.rotationSpeed = 3;
            }
            else if (this.rotationTime > 4000) {
                if (this.zhizhen.rotation >= this.startRotation && this.zhizhen.rotation < this.willSlowRotation) {
                    this.rotationSpeed = 2;
                }
                else if (this.zhizhen.rotation > this.willSlowRotation && this.zhizhen.rotation < this.targetRotation) {
                    this.rotationSpeed = 1;
                }
                else if (this.zhizhen.rotation >= this.targetRotation && this.zhizhen.rotation < this.endRotation) {
                    egret.Ticker.getInstance().unregister(this.rotationZhizhen, this);
                    console.log("抽奖完成！！！", this.zhizhen.rotation);
                    this.resetLottery();
                    return;
                }
            }
        }
        this.zhizhen.rotation += this.rotationSpeed;
        if (this.zhizhen.rotation >= 360)
            this.zhizhen.rotation = this.zhizhen.rotation % 360;
    };
    __egretProto__.stopRotation = function () {
        this.jp = Main.main.jp;
        console.log("本次抽中奖品为：", this.jp);
        this.rotationTime = 0;
        this.isOver = true;
        this.getTargetRotation();
    };
    __egretProto__.resetLottery = function () {
        if (this.jp == JP.yg3c) {
            egret.setTimeout(this.noLucky, this, 1000);
            this.noLuckyLayer.yg3c();
        }
        else if (this.jp == JP.weizhongjiang) {
            egret.setTimeout(this.noLucky, this, 1000);
            if (this.lotteryTime == 3) {
                this.noLuckyLayer.yg3c();
            }
        }
        else {
            egret.setTimeout(this.showLucky, this, 1000);
        }
    };
    __egretProto__.showLucky = function () {
        this.addChild(this.luckyLayer);
        this.luckyLayer.initJP(this.jp);
        this.luckyLayer.y = -1334;
        egret.Tween.get(this.luckyLayer).to({ y: 0 }, 300);
    };
    __egretProto__.noLucky = function () {
        this.addChild(this.noLuckyLayer);
        this.noLuckyLayer.y = -1334;
        egret.Tween.get(this.noLuckyLayer).to({ y: 0 }, 300);
    };
    __egretProto__.restartLottery = function () {
        var _this = this;
        this.zhizhen.rotation = 0;
        this.goBtn.visible = true;
        this.isOver = false;
        this.rotationSpeed = 30;
        egret.Tween.get(this.noLuckyLayer).to({ y: -1335 }, 300).call(function () {
            if (_this.noLuckyLayer.parent)
                _this.removeChild(_this.noLuckyLayer);
        }, this);
    };
    __egretProto__.shareLuckyLayer = function () {
        this.luckyLayer.changeShare();
    };
    __egretProto__.removeMe = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this.zhizhen.rotation = 0;
        this.goBtn.visible = true;
        this.isOver = false;
    };
    //<=75 iphone
    //<=145 yashua
    //<=215 weizhongjiang
    //<=285 huafei
    //<360 watch
    __egretProto__.getTargetRotation = function () {
        if (this.jp == JP.iphone) {
            this.startRotation = 0;
            this.targetRotation = 20 + Math.floor(Math.random() * 53);
            this.willSlowRotation = JP.iphoneR;
            this.endRotation = 75;
        }
        else if (this.jp == JP.yashua) {
            this.startRotation = 20;
            this.targetRotation = 77 + Math.floor(Math.random() * 65);
            this.willSlowRotation = JP.yashuaR;
            this.endRotation = 145;
        }
        else if (this.jp == JP.weizhongjiang) {
            this.startRotation = 70;
            this.targetRotation = 147 + Math.floor(Math.random() * 65);
            this.willSlowRotation = JP.weizhongjiangR;
            this.endRotation = 215;
        }
        else if (this.jp == JP.huafei) {
            this.startRotation = 150;
            this.targetRotation = 217 + Math.floor(Math.random() * 65);
            this.willSlowRotation = JP.huafeiR;
            this.endRotation = 285;
        }
        else if (this.jp == JP.watch) {
            this.startRotation = 220;
            this.targetRotation = 287 + Math.floor(Math.random() * 70);
            this.willSlowRotation = JP.watchR;
            this.endRotation = 360;
        }
        else if (this.jp == JP.yg3c) {
            this.startRotation = 70;
            this.targetRotation = 147 + Math.floor(Math.random() * 65);
            this.willSlowRotation = JP.weizhongjiangR;
            this.endRotation = 215;
        }
        console.log("targetRotation::", this.willSlowRotation, "  s ", this.targetRotation);
    };
    return LotteryLayer;
})(egret.Sprite);
LotteryLayer.prototype.__class__ = "LotteryLayer";
var JP = (function () {
    function JP() {
    }
    var __egretProto__ = JP.prototype;
    JP.iphone = "iphone";
    JP.yashua = "yashua";
    JP.weizhongjiang = "weizhongjiang";
    JP.huafei = "huafei";
    JP.watch = "watch";
    JP.yg3c = "yg3c";
    JP.iphoneR = 10;
    JP.yashuaR = 75;
    JP.weizhongjiangR = 145;
    JP.huafeiR = 215;
    JP.watchR = 285;
    return JP;
})();
JP.prototype.__class__ = "JP";
