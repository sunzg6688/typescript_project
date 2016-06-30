/**
 * Created by sunzg on 15/10/8.
 */
var ShareLayer = (function (_super) {
    __extends(ShareLayer, _super);
    function ShareLayer() {
        _super.call(this);
        this.width = ScreenConst.width;
        this.height = ScreenConst.height;
        var mask = new egret.Bitmap();
        mask.texture = RES.getRes("mask");
        mask.width = this.width;
        mask.height = this.height;
        this.addChild(mask);
        this.yd = new egret.Bitmap();
        this.yd.texture = RES.getRes("fenxiangjt");
        this.yd.x = (this.width - this.yd.texture.textureWidth) >> 1;
        this.yd.y = 10;
        this.addChild(this.yd);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMe, this);
    }
    var __egretProto__ = ShareLayer.prototype;
    __egretProto__.isShare = function (isShare) {
        if (isShare) {
            this.yd.texture = RES.getRes("fenxiangjt");
            this.yd.x = (this.width - this.yd.texture.textureWidth) >> 1;
            this.yd.y = 10;
        }
        else {
            this.yd.texture = RES.getRes("gzxdgzh");
            this.yd.x = (this.width - this.yd.texture.textureWidth) >> 1;
            this.yd.y = 10;
        }
    };
    __egretProto__.closeMe = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ShareLayer;
})(egret.Sprite);
ShareLayer.prototype.__class__ = "ShareLayer";
