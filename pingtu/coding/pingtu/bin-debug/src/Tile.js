/**
 * Created by sunzg on 15/9/27.
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(res, index) {
        _super.call(this);
        this.pos = new egret.Point();
        this.selected = false;
        this.rightPos = false;
        this.resName = res;
        this.currentIndex = this.index = index;
        this.res = new egret.Bitmap();
        this.res.texture = RES.getRes(this.resName);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    }
    var __egretProto__ = Tile.prototype;
    __egretProto__.resetCurrentIndex = function (ci) {
        this.currentIndex = ci;
        this.x = (this.currentIndex % 3) * 203;
        this.y = Math.floor(this.currentIndex / 3) * 203;
        this.addChild(this.res);
    };
    __egretProto__.onlyResetCurrentIndex = function (ci) {
        this.currentIndex = ci;
    };
    __egretProto__.getPosX = function () {
        return (this.currentIndex % 3) * 203;
    };
    __egretProto__.getPosY = function () {
        return Math.floor(this.currentIndex / 3) * 203;
    };
    __egretProto__.touchHandler = function () {
        var _this = this;
        if (Main.main.currentState != Main.main.gaming)
            return;
        this.selected = !this.selected;
        if (this.selected) {
            this.res.x = -5;
            this.res.y = -5;
            this.res.width = 210;
            this.res.height = 210;
            this.graphics.clear();
            if (this.rightPos) {
                this.selected = false; //防止同时点击到其他的tile和它互换。
                this.graphics.beginFill(0xff0000, 0.9);
                this.graphics.drawRect(-8, -8, 216, 216);
                this.graphics.endFill();
                this.parent.addChild(this);
                egret.setTimeout(function () {
                    _this.cancelSelected(true);
                }, this, 200);
            }
            else {
                this.graphics.beginFill(0x00ff00, 0.9);
                this.graphics.drawRect(-8, -8, 216, 216);
                this.graphics.endFill();
                this.parent.addChild(this);
                if (!Main.main.isMoving) {
                    Main.main.selected(this);
                    Main.main.isOver();
                }
            }
        }
        else {
            this.res.x = 0;
            this.res.y = 0;
            this.res.width = 200;
            this.res.height = 200;
            this.graphics.clear();
        }
    };
    __egretProto__.cancelSelected = function (cancleTouch) {
        if (cancleTouch === void 0) { cancleTouch = false; }
        this.selected = false;
        this.res.x = 0;
        this.res.y = 0;
        this.res.width = 200;
        this.res.height = 200;
        this.graphics.clear();
        if (cancleTouch) {
            this.rightPos = true;
        }
    };
    __egretProto__.resetEventListener = function () {
        this.selected = false;
        this.res.x = 0;
        this.res.y = 0;
        this.res.width = 200;
        this.res.height = 200;
        this.graphics.clear();
        this.resetCurrentIndex(this.index);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    return Tile;
})(egret.Sprite);
Tile.prototype.__class__ = "Tile";
