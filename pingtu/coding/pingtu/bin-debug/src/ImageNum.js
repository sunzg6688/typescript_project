/**
 * Created by sunzg on 15/9/29.
 */
var ImageNum = (function (_super) {
    __extends(ImageNum, _super);
    function ImageNum(num, pos) {
        _super.call(this);
        this.num = num;
        var value = Math.abs(num);
        var valueString = value.toString();
        var valueArr = valueString.split("");
        for (var i = 0; i < valueArr.length; i++) {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(valueArr[i]);
            bitmap.x = this.numChildren * 63;
            this.addChild(bitmap);
        }
        this.x = pos.x - this.width / 2;
        this.y = pos.y - this.height / 2;
    }
    var __egretProto__ = ImageNum.prototype;
    return ImageNum;
})(egret.Sprite);
ImageNum.prototype.__class__ = "ImageNum";
