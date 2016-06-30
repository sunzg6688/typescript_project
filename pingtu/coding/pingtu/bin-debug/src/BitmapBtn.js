/**
 * Created by sunzg on 15/9/28.
 */
var BitmapBtn = (function (_super) {
    __extends(BitmapBtn, _super);
    function BitmapBtn(res) {
        _super.call(this);
        this.res = new egret.Bitmap();
        this.resName = res;
        this.touchEnabled = true;
        this.res.texture = RES.getRes(res);
        this.addChild(this.res);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
    }
    var __egretProto__ = BitmapBtn.prototype;
    __egretProto__.touchBegin = function (evt) {
        this.res.width = this.res.texture._bitmapWidth + 10;
        this.res.height = this.res.texture._bitmapHeight + 10;
        this.res.x = -5;
        this.res.y = -5;
    };
    __egretProto__.touchEnd = function () {
        this.res.width = this.res.texture._bitmapWidth;
        this.res.height = this.res.texture._bitmapHeight;
        this.res.x = 0;
        this.res.y = 0;
    };
    __egretProto__.resetResSize = function () {
        this.res.width = this.res.texture._bitmapWidth;
        this.res.height = this.res.texture._bitmapHeight;
        this.res.x = 0;
        this.res.y = 0;
    };
    return BitmapBtn;
})(egret.Sprite);
BitmapBtn.prototype.__class__ = "BitmapBtn";
