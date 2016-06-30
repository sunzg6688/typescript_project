//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public static main:Main;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        Main.main=this;
    }

    public win:any;
    private onAddToStage(event:egret.Event) {

        //配合页面
        var win:any=window;
        this.win=win;
        win.hideLoadTip();

        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    private gameContent:egret.Sprite=new egret.Sprite();

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private beginPos:egret.Point=new egret.Point();
    private pos:egret.Point=new egret.Point();
    private setBeginPos(evt:egret.TouchEvent){
        this.beginPos.y=evt._stageY;
        this.pos.y=this.gameContent.y;

    }

    private moveGameContent(evt:egret.TouchEvent){
        this.gameContent.y=this.pos.y+evt._stageY-this.beginPos.y;
        if(this.gameContent.y>=0)this.gameContent.y=0;
        if(this.gameContent.y<=this.screenHeight-this.gameContent.height)this.gameContent.y=this.screenHeight-this.gameContent.height;
    }


    public designScale;
    public screenHeight;

    public gameLayer:egret.Sprite=new egret.Sprite();

    private createGameScene():void {

        var design:any=egret.StageDelegate.getInstance();
        this.screenHeight=egret.StageDelegate.getInstance()._stageHeight;
        this.gameContent.width=this.stage.stageWidth;
        this.gameContent.height=design._designHeight;

        this.designScale=window.screen.width/design._designWidth;

        ScreenConst.width=this.gameContent.width;
        ScreenConst.height=this.gameContent.height;
        ScreenConst.designScale=this.designScale;

//        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.setBeginPos,this);
//        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveGameContent,this);

//        var sky:egret.Bitmap = this.createBitmapByName("bgImage");
//        this.gameContent.addChild(sky);

        this.addChild(this.gameContent);




        this.gameLayer.y=350;
        this.gameLayer.x=70;

        this.gameContent.addChild(this.gameLayer);

        var index=0;
        for(var y=0;y<3;y++){
            for(var x=0;x<3;x++){
                var tile:Tile=new Tile(y+"_"+x,index);
                index++;
                this.tileList.push(tile);
            }
        }

        for(var i=0;i<this.tileList.length;i++){
            var tile=this.tileList[i];
            tile.resetCurrentIndex(i);
            this.gameLayer.addChild(tile);
        }

        this.showTimeSprite.x=472;
        this.showTimeSprite.y=67;
        this.gameContent.addChild(this.showTimeSprite);

        var numPos:egret.Point=new egret.Point(85,85);
        for(var i=0;i<this.gameTimeTxt+1;i++){
            var imageNum:ImageNum=new ImageNum(i,numPos);
            this.imageNumList.push(imageNum);
        }

        this.checkIsClickOKBtn();
        Main.loadResCompleted=true;
    }

    public static loadResCompleted:boolean=false;
    public checkIsClickOKBtn(){
        //配合页面
        var win:any=window;
        if(win.isClickOK){
            egret.Ticker.getInstance().register(this.updateTime,this);
            this.sendStart();
        }else{
            console.log("游戏资源已经加载完毕，等待点击OK！");
        }

        //egret.Ticker.getInstance().register(this.updateTime,this);
    }

    private tileList:Array<Tile>=[];

    public prev="prev";
    private prevTime=3000;
    private prevTimeTxt=3;

    public gaming="gaming";
    private gamingTime=15000;
    private gameTimeTxt=15;

    public end="end";

    public currentState:string=this.prev;

    private time=0;
    private showTime;
    private showTimeSprite:egret.Sprite=new egret.Sprite();
    private imageNumList:Array<ImageNum>=[];

    private updateTimeText(showTime){
        this.showTimeSprite.removeChildren();
        this.showTimeSprite.addChild(this.imageNumList[showTime]);
    }

    private updateTime(dif){
        this.time+=dif;
        var self=this;
        if(this.currentState==this.prev){
            if(this.prevTime-this.time>0){
                this.showTime=Math.ceil((this.prevTime-this.time)/1000);
                this.updateTimeText(this.showTime);
            }else{

                this.updateTimeText(0);

                egret.Ticker.getInstance().unregister(this.updateTime,this);

                /*这个是完全打乱数组，但是效率有待改进！*/
                var num=0;
                var hasSame=true;
                while(hasSame){
                    for(var i=0;i<9;i++){
                        var index=Math.floor(Math.random()*9);
                        var iTile=this.tileList[i];
                        this.tileList[i]=this.tileList[index];
                        this.tileList[i].currentIndex=i;
                        this.tileList[index]=iTile;
                        iTile.currentIndex=index;
                    }

                    hasSame=false;
                    for(var j=0;j<9;j++){
                        this.tileList[j].rightPos=false;
                        if(this.tileList[j].index==this.tileList[j].currentIndex){
                            hasSame=true;
                            break;
                        }
                    }
                    num++;
                    console.log("打乱次数：",num);
                }

                /*这是洗牌算法有可能会出现重复的地方*/
                //for(var i=0;i<9;i++){
                //    var index=Math.floor(Math.random()*9);
                //    var iTile=this.tileList[i];
                //    this.tileList[i]=this.tileList[index];
                //    this.tileList[i].onlyResetCurrentIndex(i);
                //    this.tileList[index].currentIndex=i;
                //    this.tileList[index]=iTile;
                //    iTile.currentIndex=index;
                //    iTile.onlyResetCurrentIndex(index);
                //}

                for(var i=0;i<this.tileList.length;i++){
                    var tile:Tile=this.tileList[i];
                    egret.Tween.get(tile).to({x:tile.getPosX(),y:tile.getPosY()},200).call(self.tweenOverNum,this);
                }
            }

        }else if(this.currentState==this.gaming){
            if(this.gamingTime-this.time>0){
                this.showTime=Math.ceil((this.gamingTime-this.time)/1000);
                this.updateTimeText(this.showTime);
            }else{
                this.updateTimeText(0);
                this.time=0;
                this.currentState=this.end;
                egret.Ticker.getInstance().unregister(this.updateTime,this);
                console.log("游戏时间到！");
                this.gameOver();
            }
        }
    }

    private overNum=0;
    private tweenOverNum(){
        this.overNum++;
        if(this.overNum==9){
            this.time=0;
            this.currentState=this.gaming;
            egret.Ticker.getInstance().register(this.updateTime,this);

            this.updateTimeText(this.gameTimeTxt);
        }
    }

    public restartGame(){
        this.overNum=0;
        this.time=0;
        this.currentState=this.prev;
        egret.Ticker.getInstance().register(this.updateTime,this);

        for(var i=0;i<this.tileList.length;i++){
            this.tileList[i].resetEventListener();
        }

        this.updateTimeText(this.prevTimeTxt);

        if(this.shareLayer&&this.shareLayer.parent){
            this.shareLayer.parent.removeChild(this.shareLayer);
        }
        this.sendStart();
    }


    /*移动到任意位置都可以互换*/
    public isMoving=false;
    public selected(tile:Tile){
        if(this.isMoving)return;
        for(var i=0;i<this.tileList.length;i++){
            if(tile!=this.tileList[i]){
                if(this.tileList[i].selected){
                    var self=this;
                    if(tile.index==this.tileList[i].currentIndex){
                        var tilePosX=tile.x;
                        var tilePosY=tile.y;
                        var cTilePosX=this.tileList[i].x;
                        var cTilePosY=this.tileList[i].y;
                        var sindex=tile.currentIndex;
                        tile.currentIndex=this.tileList[i].currentIndex;
                        this.tileList[i].currentIndex=sindex;

                        this.isMoving=true;

                        egret.Tween.get(tile).to({"x":cTilePosX,"y":cTilePosY},200).call(()=>{
                            tile.cancelSelected(true);

                            this.isMoving=false;
                        },this);

                        egret.Tween.get(this.tileList[i]).to({"x":tilePosX,"y":tilePosY},200).call(()=>{
                            if(self.tileList[i].currentIndex==self.tileList[i].index){
                                self.tileList[i].cancelSelected(true);
                            }else{
                                self.tileList[i].cancelSelected(false);
                            }
                        },this);

                        return;

                    }else if(this.tileList[i].index==tile.currentIndex){
                        var tilePosX=tile.x;
                        var tilePosY=tile.y;
                        var cTilePosX=this.tileList[i].x;
                        var cTilePosY=this.tileList[i].y;
                        var sindex=this.tileList[i].currentIndex;
                        this.tileList[i].currentIndex=tile.currentIndex;
                        tile.currentIndex=sindex;

                        this.isMoving=true;

                        egret.Tween.get(this.tileList[i]).to({"x":tilePosX,"y":tilePosY},200).call(()=>{
                            self.tileList[i].cancelSelected(true);
                            this.isMoving=false;
                        },this);

                        egret.Tween.get(tile).to({"x":cTilePosX,"y":cTilePosY},200).call(()=>{
                            if(tile.currentIndex==tile.index){
                                tile.cancelSelected(true);
                            }else{
                                tile.cancelSelected(false);
                            }
                        },this);
                        return;

                    }else{
                        //这个地方处理即使移动到地方，不是正确位置也要互换
                        var tilePosX=tile.x;
                        var tilePosY=tile.y;
                        var cTilePosX=this.tileList[i].x;
                        var cTilePosY=this.tileList[i].y;
                        var sindex=tile.currentIndex;
                        tile.currentIndex=this.tileList[i].currentIndex;
                        this.tileList[i].currentIndex=sindex;

                        this.isMoving=true;

                        egret.Tween.get(tile).to({"x":cTilePosX,"y":cTilePosY},200).call(()=>{
                            if(tile.index==tile.currentIndex){
                                tile.cancelSelected(true);
                            }else{
                                tile.cancelSelected(false);
                            }
                            this.isMoving=false;
                        },this);

                        egret.Tween.get(this.tileList[i]).to({"x":tilePosX,"y":tilePosY},200).call(()=>{
                            if(self.tileList[i].currentIndex==self.tileList[i].index){
                                self.tileList[i].cancelSelected(true);
                            }else{
                                self.tileList[i].cancelSelected(false);
                            }
                        },this);
                        return;
                    }
                    this.tileList[i].cancelSelected(false);
                }
            }
        }

    }

    /*只有移动到正确的位置才会换*/
    //public isMoving=false;
    //public selected(tile:Tile){
    //    if(this.isMoving)return;
    //    for(var i=0;i<this.tileList.length;i++){
    //        if(tile!=this.tileList[i]){
    //            if(this.tileList[i].selected){
    //                var self=this;
    //                if(tile.index==this.tileList[i].currentIndex){
    //                    var tilePosX=tile.x;
    //                    var tilePosY=tile.y;
    //                    var cTilePosX=this.tileList[i].x;
    //                    var cTilePosY=this.tileList[i].y;
    //                    var sindex=tile.currentIndex;
    //                    tile.currentIndex=this.tileList[i].currentIndex;
    //                    this.tileList[i].currentIndex=sindex;
    //
    //                    this.isMoving=true;
    //
    //                    egret.Tween.get(tile).to({"x":cTilePosX,"y":cTilePosY},200).call(()=>{
    //                        tile.cancelSelected(true);
    //
    //                        this.isMoving=false;
    //                    },this);
    //
    //                    egret.Tween.get(this.tileList[i]).to({"x":tilePosX,"y":tilePosY},200).call(()=>{
    //                        if(self.tileList[i].currentIndex==self.tileList[i].index){
    //                            self.tileList[i].cancelSelected(true);
    //                        }else{
    //                            self.tileList[i].cancelSelected(false);
    //                        }
    //                    },this);
    //
    //                    return;
    //
    //                }else if(this.tileList[i].index==tile.currentIndex){
    //                    var tilePosX=tile.x;
    //                    var tilePosY=tile.y;
    //                    var cTilePosX=this.tileList[i].x;
    //                    var cTilePosY=this.tileList[i].y;
    //                    var sindex=this.tileList[i].currentIndex;
    //                    this.tileList[i].currentIndex=tile.currentIndex;
    //                    tile.currentIndex=sindex;
    //
    //                    this.isMoving=true;
    //
    //                    egret.Tween.get(this.tileList[i]).to({"x":tilePosX,"y":tilePosY},200).call(()=>{
    //                        self.tileList[i].cancelSelected(true);
    //
    //                        this.isMoving=false;
    //
    //                    },this);
    //
    //                    egret.Tween.get(tile).to({"x":cTilePosX,"y":cTilePosY},200).call(()=>{
    //                        if(tile.currentIndex==tile.index){
    //                            tile.cancelSelected(true);
    //                        }else{
    //                            tile.cancelSelected(false);
    //                        }
    //                    },this);
    //                    return;
    //
    //                }
    //                this.tileList[i].cancelSelected(false);
    //            }
    //        }
    //    }
    //
    //}

    public isOver(){
        var jIndex=0;
        for(var j=0;j<this.tileList.length;j++){
            if(this.tileList[j].currentIndex==this.tileList[j].index){
                this.tileList[j].cancelSelected(true);
                jIndex++;
            }
        }
        if(jIndex==9){
            console.log("拼图完成！！！");
            egret.Ticker.getInstance().unregister(this.updateTime,this);
            this.showLottery();
        }

    }


    private gameOverLayer:GameOverLayer;
    public gameOver(){
        if(!this.gameOverLayer){
            this.gameOverLayer=new GameOverLayer();
        }

        this.gameContent.addChild(this.gameOverLayer);
        this.gameOverLayer.playInitTween();
    }

    private cgcg:egret.TextField=new egret.TextField();
    public showCgcg(){
        this.cgcg.text="闯关成功！";
        this.cgcg.textColor=0xffffff;
        this.cgcg.bold=true;
        this.cgcg.size=80;
        this.cgcg.width=ScreenConst.width;
        this.cgcg.textAlign=egret.HorizontalAlign.CENTER;
        this.cgcg.y = 500;
        this.gameContent.addChild(this.cgcg);
    }

    private lotteryLayer:LotteryLayer;
    public showLottery(){
        if(!this.lotteryLayer){
            this.lotteryLayer=new LotteryLayer();
        }

        this.showCgcg();
        this.cgcg.alpha=0;
        egret.Tween.get(this.cgcg).to({"alpha":1},1000).wait(1500).call(this.tweenLottery,this);

        this.jp=JP.weizhongjiang;
        this.sendEnd();
    }

    public tweenLottery(){

        if(this.cgcg.parent)this.cgcg.parent.removeChild(this.cgcg);

        this.lotteryLayer.y=-1334;
        this.gameContent.addChild(this.lotteryLayer);
        egret.Tween.get(this.lotteryLayer).to({y:0},500);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public submitInfoFinish(){
        this.lotteryLayer.shareLuckyLayer();
    }

    private shareLayer:ShareLayer;
    public showShare(){
        //TODO 弹出引导分享框
        if(!this.shareLayer){
            this.shareLayer=new ShareLayer();
        }
        this.shareLayer.isShare(true);
        this.gameContent.addChild(this.shareLayer);
    }

    public gzxd(value){
        this.buttonClick(value);
        window.location.href="http://mp.weixin.qq.com/s?__biz=MzAxODU2ODM3Ng==&mid=400098393&idx=1&sn=ad94f020d169d2f774e919f78c244a3d&scene=0#rd";
        return;

        if(!this.shareLayer){
            this.shareLayer=new ShareLayer();
        }
        this.shareLayer.isShare(false);
        this.gameContent.addChild(this.shareLayer);
    }

    public buttonClick(value){
        var win:any=window
        win.buttonClick(value);
    }

    /*向服务器发送游戏开始*/
    public sendStart(){
        var url="/pintu/Api_Start.aspx";
        this.requestServer(url,this.parseStart);
    }

    public parseStart(data){
        var obj=JSON.parse(data);
    }

    /*向服务器发送游戏结束*/
    public sendEnd(){
        var url="/pintu/Api_End.aspx";
        this.requestServer(url,this.parseEnd);
    }

    public parseEnd(data){
        var obj=JSON.parse(data);
    }

    /*向服务器请求中奖信息*/
    public getAward(){
        var url="/pintu/Api_Luckdraw.aspx";
        this.requestServer(url,this.parseAward);
    }

    public jp=JP.weizhongjiang;
    public parseAward(data){
        //data ='{"state": 0,"msg": 3}';
        var obj=JSON.parse(data);
        //console.log("获奖信息：",data);
        if(obj.state==0){
            switch (obj.msg){
                case 1:
                    Main.main.jp=JP.iphone;
                    break;
                case 2:
                    Main.main.jp=JP.watch;
                    break;
                case 3:
                    Main.main.jp=JP.yashua;
                    break;
                case 4:
                    Main.main.jp=JP.huafei;
                    break;
                default:
                    Main.main.jp=JP.weizhongjiang;
                    break;
            }
        }else if(obj.state==3){
            Main.main.jp=JP.yg3c;
            //Main.main.todayOver();
        }else{
            Main.main.jp=JP.weizhongjiang;
        }
        //console.log("Main.main.jp:",Main.main.jp);
        //Main.main.jp=JP.iphone;
        //Main.main.jp=JP.yg3c;
    }

    public requestServer(url,callBack){
        var loader:egret.URLLoader=new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE,(evt)=>{
            //回调函数里如果有this的话，会出错！因为this作用域为当前作用域，而不是回调函数的作用域！！！
            //所以在匿名函数里做回调是相当愚蠢的事情！！！
            callBack(loader.data);
        },this);
        var request:egret.URLRequest=new egret.URLRequest(url);
        loader.load(request);
    }
}


