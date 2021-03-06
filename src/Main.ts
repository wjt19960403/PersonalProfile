//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
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

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
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
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
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
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
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

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

        var Page_1: Page = new Page();
        this.addChild(Page_1);
        Page_1.touchEnabled = true;
        pagemove(Page_1);//页面具有滑动效果
            
        var sky_1: egret.Bitmap = this.createBitmapByName("bg_1_jpg");
        Page_1.addChild(sky_1);
        sky_1.width = stageW;
        sky_1.height = stageH;


        var text3: egret.TextField = new egret.TextField();
        text3.textFlow = <Array<egret.ITextElement>>[
            { text: "谢谢！\n", style: { "textColor": 0xFF0000,"size": 200 ,"fontFamily": "楷体" } }   
        ]
        text3.rotation = -37;
        text3.x = 65;
        text3.y = 750;
        
        Page_1.addChild(text3);

        

        var Page_2: Page = new Page();
        this.addChild(Page_2);
        Page_2.touchEnabled = true;
        pagemove(Page_2);//页面具有滑动效果
            
        var sky_2: egret.Bitmap = this.createBitmapByName("bg_2_jpg");
        Page_2.addChild(sky_2);
        sky_2.width = stageW;
        sky_2.height = stageH;


        var text2: egret.TextField = new egret.TextField();
        text2.textFlow = <Array<egret.ITextElement>>[
            { text: "别人问我：", style: { "textColor": 0x000000,"size": 30 ,"fontFamily": "楷体" } },
            { text: "你为什么这么", style: { "textColor": 0x6B238E,"size": 30 ,"fontFamily": "楷体" } },
            { text: "浪\n", style: { "textColor": 0x0000FF,"size": 40,"fontFamily": "楷体" } },
            { text: "我只能回答他：", style: { "textColor": 0x000000,"size": 30 ,"fontFamily": "楷体" } },
            { text: "太热\n", style: { "textColor": 0xFF0000,"size": 50 ,"fontFamily": "楷体" } }   
        ]
        text2.x = 120;
        text2.y = 450;
        Page_2.addChild(text2);


        var Page_3: Page = new Page();
        this.addChild(Page_3);
        Page_3.touchEnabled = true;
        pagemove(Page_3);//页面具有滑动效果
            
        var sky_3: egret.Bitmap = this.createBitmapByName("bg_3_jpg");
        Page_3.addChild(sky_3);
        sky_3.width = stageW;
        sky_3.height = stageH;

        var MiddleMask = new egret.Shape();
        MiddleMask.graphics.beginFill(0xD19275, 0.5);
        MiddleMask.graphics.drawRect(0, 280, stageW, 480);
        MiddleMask.graphics.endFill();
        MiddleMask.y = 33;
        Page_3.addChild(MiddleMask);



        var text: egret.TextField = new egret.TextField();
        text.textFlow = <Array<egret.ITextElement>>[
            { text: "姓名：  王惊涛\n", style: { "textColor": 0x336699,"size": 40 ,"fontFamily": "楷体" } },
            { text: "年龄：  20\n", style: { "textColor": 0x336699,"size": 35 ,"fontFamily": "楷体" } },
            { text: "专业：  数字媒体技术\n", style: { "textColor": 0x336699,"size": 35 ,"fontFamily": "楷体" } },
            { text: "爱好：  唱歌、看电影\n", style: { "textColor": 0x336699,"size": 35 ,"fontFamily": "楷体" } },
            { text: "喜欢的一句话:机会只留给有准备的人\n", style: { "textColor": 0x336699,"size": 30 ,"fontFamily": "楷体" } }
        ];
        text.x = 120;
        text.y = 500;
        Page_3.addChild(text);
        
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("self_2_jpg");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "个人简介";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);




        var textfield = new egret.TextField();
        this.addChild(textfield);                     
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)

        function pagemove(p: Page): void {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
            p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);
        }
        
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
    

}


class Page extends egret.DisplayObjectContainer {   //实现翻页用的page类

    private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
    private _distance: egret.Point = new egret.Point(); //鼠标点击时，记录坐标位置差
//
    
//
    public mouseDown(evt: egret.TouchEvent) {
        this._touchStatus = true;
        this._distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt: egret.TouchEvent) {
        if (this._touchStatus) {
            this.y = evt.stageY - this._distance.y;
            if (this.y < -this.stage.stageHeight / 1.5) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 350, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (this.y > this.stage.stageHeight / 1.5) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 350, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }


        }
    }

    public mouseUp(evt: egret.TouchEvent) {
        this._touchStatus = false;
        if (this.y >= -this.stage.stageHeight / 2) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        if (this.y <= this.stage.stageHeight / 2) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }
//

    
//

    

}
   

