/*
 * 
 */
 
tm.app = tm.app || {};


 
(function() {
    
    tm.define("tm.app.Object2D", {
        superClass: "tm.app.Element",
        
        /**
         * 位置
         */
        position: null,
        /**
         * 回転
         */
        rotation: 0,
        /**
         * スケール
         */
        scale: null,
        
        /**
         * 幅
         */
        _width:  64,
        /**
         * 高さ
         */
        _height: 64,
        
        /**
         * originX
         */
        originX: 0.5,
        
        /**
         * originX
         */
        originY: 0.5,
        
        init: function() {
            this.superInit();
            this.position = tm.geom.Vector2(0, 0);
            this.scale    = tm.geom.Vector2(1, 1);
            this.pointing = tm.geom.Vector2(0, 0);
            this._matrix  = tm.geom.Matrix33();
            this._matrix.identity();
            this.boundingType = "circle";

            this._worldMatrix = tm.geom.Matrix33();
            this._worldMatrix.identity();
            this._worldAlpha = 1.0;
        },
        
        getFinalMatrix: function() {
            var matrix = tm.geom.Matrix33();
 
            if (this.parent) {
                matrix.multiply(this.parent.getFinalMatrix());
            }
            matrix.translate(this.centerX, this.centerY);
            matrix.rotateZ(this.rotation*Math.DEG_TO_RAD);
            matrix.scale(this.scaleX, this.scaleY);
 
            return matrix;
        },
        
        /**
         * 点と衝突しているかを判定
         */
        isHitPoint: function(x, y) {
            // 円判定
            var p = this.globalToLocal(tm.geom.Vector2(x, y));
            this.pointing.x = p.x;
            this.pointing.y = p.y;
            
            if (((p.x)*(p.x)+(p.y)*(p.y)) < (this.radius*this.radius)) {
                return true;
            }
            return false;
        },
 
        isHitPointCircle: function(x, y) {
            var lenX = this.x - x;
            var lenY = this.y - y;
            if (((lenX)*(lenX)+(lenY)*(lenY)) < (this.radius*this.radius)) {
                return true;
            }
            return false;
        },
 
        isHitPointRect: function(x, y) {
            // ここから下のバージョンは四角形
            var globalPos = (this.parent) ? this.parent.localToGlobal(this) : this;
            // var globalPos = this;
            
            var left   = globalPos.x - this.width*this.originX;
            var right  = globalPos.x + this.width*this.originX;
            var top    = globalPos.y - this.height*this.originY;
            var bottom = globalPos.y + this.height*this.originY;
            
            if ( left < x && x < right && top  < y && y < bottom ) { return true; }
            
            return false;
        },
        
        /**
         * 階層を考慮した円衝突判定
         */
        isHitPointCircleHierarchy: function(x, y) {
            // 円判定
            var p = this.globalToLocal(tm.geom.Vector2(x, y));
            this.pointing.x = p.x;
            this.pointing.y = p.y;
            
            if (((p.x)*(p.x)+(p.y)*(p.y)) < (this.radius*this.radius)) {
                return true;
            }
            return false;
        },
        
        /**
         * 階層を考慮した矩形衝突判定
         */
        isHitPointRectHierarchy: function(x, y) {
            var p = this.globalToLocal(tm.geom.Vector2(x, y));
            this.pointing.x = p.x;
            this.pointing.y = p.y;
            
            var left   = -this.width*this.originX;
            var right  = +this.width*this.originX;
            var top    = -this.height*this.originY;
            var bottom = +this.height*this.originY;
            
            if ( left < p.x && p.x < right && top  < p.y && p.y < bottom ) { return true; }
            
            return false;
        },
        
        /**
         * 要素と衝突しているかを判定
         */
        isHitElement: function(elm) {
            var selfGlobalPos  = this.parent.localToGlobal(this);
            if (((this.x-elm.x)*(this.x-elm.x)+(this.y-elm.y)*(this.y-elm.y)) < (this.radius+elm.radius)*(this.radius+elm.radius)) {
                return true;
            }
            return false;
        },
 
        /**
         * 円同士の衝突判定
         */
        isHitElementCircle: function(elm) {
            return tm.collision.testCircleCircle(this.getBoundingCircle(), elm.getBoundingCircle());
        },
 
        /**
         * 円同士の衝突判定
         */
        isHitElementRect: function(elm) {
            return tm.collision.testRectRect(this.getBoundingRect(), elm.getBoundingRect());    
        },
 
        /**
         * バウンディングサークル
         */
        getBoundingCircle: function() {
            return tm.geom.Circle(this.centerX, this.centerY, this.radius);
        },
 
        /**
         * バウンディングレクト
         */
        getBoundingRect: function() {
            return tm.geom.Rect(this.left, this.top, this.width, this.height);
        },
 
        /**
         * ローカル座標をグローバル座標に変換
         */
        localToGlobal: function(p) {
            return this.getFinalMatrix().multiplyVector2(p);
        },
        
        /**
         * グローバル座標をローカル座標に変換
         */
        globalToLocal: function(p) {
            var matrix = this.getFinalMatrix();
            matrix.invert();
            
            return matrix.multiplyVector2(p);
        },
        
        setX: function(x) {
            this.position.x = x;
            return this;
        },
        
        setY: function(y) {
            this.position.y = y;
            return this;
        },
        
        setPosition: function(x, y) {
            this.position.x = x;
            this.position.y = y;
            return this;
        },
        
        setWidth: function(width) {
            this.width = width;
            return this;
        },
        
        setHeight: function(height) {
            this.height = height;
            return this;
        },
        
        setSize: function(width, height) {
            this.width  = width;
            this.height = height;
            return this;
        },
        
        
    });
 
    /**
     * @property    x
     * x座標値
     */
    tm.app.Object2D.prototype.accessor("x", {
        "get": function()   { return this.position.x; },
        "set": function(v)  { this.position.x = v; }
    });
    
    /**
     * @property    y
     * y座標値
     */
    tm.app.Object2D.prototype.accessor("y", {
        "get": function()   { return this.position.y; },
        "set": function(v)  { this.position.y = v; }
    });
    
    /**
     * @property    scaleX
     * スケールX値
     */
    tm.app.Object2D.prototype.accessor("scaleX", {
        "get": function()   { return this.scale.x; },
        "set": function(v)  { this.scale.x = v; }
    });
    
    /**
     * @property    scaleY
     * スケールY値
     */
    tm.app.Object2D.prototype.accessor("scaleY", {
        "get": function()   { return this.scale.y; },
        "set": function(v)  { this.scale.y = v; }
    });
    
    
    
    /**
     * @property    width
     * width
     */
    tm.app.Object2D.prototype.accessor("width", {
        "get": function()   { return this._width; },
        "set": function(v)  { this._width = v; this._refreshSize(); }
    });
    
    
    /**
     * @property    height
     * height
     */
    tm.app.Object2D.prototype.accessor("height", {
        "get": function()   { return this._height; },
        "set": function(v)  { this._height = v; this._refreshSize(); }
    });
    
    /**
     * @property    radius
     * 半径
     */
    tm.app.Object2D.prototype.accessor("radius", {
        "get": function()   { return this._radius || (this.width+this.height)/4; },
        "set": function(v)  { this._radius = v; }
    });
    
    /**
     * @property    top
     * 左
     */
    tm.app.Object2D.prototype.getter("top", function() {
        return this.y - this.height*this.originY;
    });
 
    /**
     * @property    right
     * 左
     */
    tm.app.Object2D.prototype.getter("right", function() {
        return this.x + this.width*(1-this.originX);
    });
 
    /**
     * @property    bottom
     * 左
     */
    tm.app.Object2D.prototype.getter("bottom", function() {
        return this.y + this.height*(1-this.originY);
    });
 
    /**
     * @property    left
     * 左
     */
    tm.app.Object2D.prototype.getter("left", function() {
        return this.x - this.width*this.originX;
    });
 
    /**
     * @property    centerX
     * centerX
     */
    tm.app.Object2D.prototype.accessor("centerX", {
        "get": function()   { return this.x + this.width/2 - this.width*this.originX; },
        "set": function(v)  {
            // TODO: どうしようかな??
        }
    });
 
    /**
     * @property    centerY
     * centerY
     */
    tm.app.Object2D.prototype.accessor("centerY", {
        "get": function()   { return this.y + this.height/2 - this.height*this.originY; },
        "set": function(v)  {
            // TODO: どうしようかな??
        }
    });
 
    /**
     * @property    boundingType
     * boundingType
     */
    tm.app.Object2D.prototype.accessor("boundingType", {
        "get": function() {
            return this._boundingType;
        },
        "set": function(v) {
            this._boundingType = v;
            this._setIsHitFunc();
        },
    });
 
    /**
     * @property    checkHierarchy
     * checkHierarchy
     */
    tm.app.Object2D.prototype.accessor("checkHierarchy", {
        "get": function()   { return this._checkHierarchy; },
        "set": function(v)  {
            this._checkHierarchy = v;
            this._setIsHitFunc();
        }
    });
 
 
    var _isHitFuncMap = {
        "rect": tm.app.Object2D.prototype.isHitPointRect,
        "circle": tm.app.Object2D.prototype.isHitPointCircle,
        "true": function() { return true; },
        "false": function() { return false; },
    };
 
    var _isHitFuncMapHierarchy = {
        "rect": tm.app.Object2D.prototype.isHitPointRectHierarchy,
        "circle": tm.app.Object2D.prototype.isHitPointCircleHierarchy,
        "true": function() { return true; },
        "false": function() { return false; },
    };
 
    var _isHitElementMap = {
        "rect": tm.app.Object2D.prototype.isHitElementRect,
        "circle": tm.app.Object2D.prototype.isHitElementCircle,
        "true": function() { return true; },
        "false": function() { return false; },
    };
 
    tm.app.Object2D.prototype._setIsHitFunc = function() {
        var isHitFuncMap = (this.checkHierarchy) ? _isHitFuncMapHierarchy : _isHitFuncMap;
        var boundingType = this.boundingType;
        var isHitFunc = (isHitFuncMap[boundingType]) ? (isHitFuncMap[boundingType]) : (isHitFuncMap["true"]);
 
        this.isHitPoint   = (isHitFuncMap[boundingType]) ? (isHitFuncMap[boundingType]) : (isHitFuncMap["true"]);
        this.isHitElement = (_isHitElementMap[boundingType]) ? (_isHitElementMap[boundingType]) : (_isHitElementMap["true"]);
    };
 
 
    
})();


 
(function() {
    
    /**
     * @class
     * キャンバスエレメント
     */
    tm.app.CanvasElement = tm.createClass({
        
        superClass: tm.app.Object2D,
        
        /**
         * 更新フラグ
         */
        isUpdate: true,
        
        /**
         * 表示フラグ
         */
        visible: true,
        
        /**
         * fillStyle
         */
        fillStyle: "white",
        
        /**
         * strokeStyle
         */
        strokeStyle: "white",
        
        /**
         * アルファ
         */
        alpha: 1.0,
        
        /**
         * ブレンドモード
         */
        blendMode: "source-over",
        
        /**
         * シャドウカラー
         */
        shadowColor: "black",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        
        _matrix: null,
        
        /**
         * ゲーム用エレメントクラス
         */
        init: function() {
            this.superInit();
        },
        
        drawBoundingCircle: function(canvas) {
            canvas.save();
            canvas.lineWidth = 2;
            canvas.strokeCircle(0, 0, this.radius);
            canvas.restore();
        },
        
        drawBoundingRect: function(canvas) {
            canvas.save();
            canvas.lineWidth = 2;
            canvas.strokeRect(-this.width*this.originX, -this.height*this.originY, this.width, this.height);
            canvas.restore();
        },
        
        drawFillRect: function(ctx) {
            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            return this;
        },
        drawStrokeRect: function(ctx) {
            ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
            return this;
        },
        
        drawFillArc: function(ctx) {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
            ctx.fill();
            ctx.closePath();
            return this;
        },
        drawStrokeArc: function(ctx) {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
            ctx.stroke();
            ctx.closePath();
            return this;
        },
        
        wakeUp: function() {
            this.isUpdate = true;
            return this;
        },
        
        sleep: function() {
            this.isUpdate = false;
            return this;
        },
        
        show: function() {
            this.visible = true;
            return this;
        },
        
        hide: function() {
            this.visible = false;
            return this;
        },
        
        setFillStyle: function(style) {
            this.fillStyle = style;
            return this;
        },
        
        setStrokeStyle: function(style) {
            this.strokeStyle = style;
            return this;
        },
        
        fromJSON: function(data) {
            for (var key in data) {
                var value = data[key];
                if (key == "children") {
                    for (var i=0,len=value.length; i<len; ++i) {
                        var data = value[i];
                        var init = data["init"] || [];
                        var _class = window[data.type] || tm.app[data.type];
                        var elm = _class.apply(null, init).addChildTo(this);
                        elm.fromJSON(data);
                        this[data.name] = elm;
                    }
                }
                else {
                    this[key] = value;
                }
            }
            
            return this;
        },
        
        toJSON: function() {
            // TODO:
        },
        
        _update: function(app) {
            // 更新有効チェック
            if (this.isUpdate == false) return ;
            
            if (this.update) this.update(app);
            
            if (this.hasEventListener("enterframe")) {
                var e = tm.event.Event("enterframe");
                e.app = app;
                this.dispatchEvent(e);
            }
            
            // 子供達も実行
            if (this.children.length > 0) {
                var tempChildren = this.children.slice();
                for (var i=0,len=tempChildren.length; i<len; ++i) {
                    tempChildren[i]._update(app);
                }
                //this.execChildren(arguments.callee, app);
            }
        },
        
        _draw: function(canvas) {
            // 表示有効チェック
            if (this.visible === false) return ;
            
            var context = canvas.context;
            
//            context.save();
            
            this._dirtyCalc();

            context.fillStyle      = this.fillStyle;
            context.strokeStyle    = this.strokeStyle;
//            context.globalAlpha    *= this.alpha;
            context.globalAlpha    = this._worldAlpha;
            context.globalCompositeOperation = this.blendMode;
            
            if (this.shadowBlur > 0) {
                context.shadowColor     = this.shadowColor;
                context.shadowOffsetX   = this.shadowOffsetX;
                context.shadowOffsetY   = this.shadowOffsetY;
                context.shadowBlur      = this.shadowBlur;
            }

            // 行列計算 (自前)
            // var matrix = this.getFinalMatrix();
            // var m = matrix.m;
            // context.setTransform( m[0], m[1], m[3], m[4], m[6], m[7] );
            
            // 行列計算 (canvas & save, restore が必要)
            // context.translate(this.position.x, this.position.y);
            // context.rotate(this.rotation * Math.DEG_TO_RAD);
            // context.scale(this.scale.x, this.scale.y);

            // 行列計算 (pixi.js 参考)
            var m = this._worldMatrix.m;
            context.setTransform( m[0], m[3], m[1], m[4], m[2], m[5] );
            
            if (this.draw) this.draw(canvas);
            
            // 子供達も実行
            if (this.children.length > 0) {
                var tempChildren = this.children.slice();
                for (var i=0,len=tempChildren.length; i<len; ++i) {
                    tempChildren[i]._draw(canvas);
                }
                // this.execChildren(arguments.callee, canvas);
            }
            
//            context.restore();
            
            // // 衝突バウンディングボックス
            // canvas.strokeRect(this.left, this.top, this.width, this.height);
            // // 衝突バウンディングサークル
            // canvas.strokeCircle(this.x, this.y, this.radius);
        },

        _dirtyCalc: function() {
            if (!this.parent) { return ; }

            // alpha
            this._worldAlpha = this.parent._worldAlpha * this.alpha;

            // 行列
            if(this.rotation != this.rotationCache)
            {
                this.rotationCache = this.rotation;
                var r = this.rotation*Math.DEG_TO_RAD;
                this._sr =  Math.sin(r);
                this._cr =  Math.cos(r);
            }

            var localTransform = this._matrix.m;
            var parentTransform = this.parent._worldMatrix.m;
            var worldTransform = this._worldMatrix.m;
            //console.log(localTransform)
            localTransform[0] = this._cr * this.scale.x;
            localTransform[1] = -this._sr * this.scale.y
            localTransform[3] = this._sr * this.scale.x;
            localTransform[4] = this._cr * this.scale.y;

            ///AAARR GETTER SETTTER!
            localTransform[2] = this.position.x;
            localTransform[5] = this.position.y;

            // Cache the matrix values (makes for huge speed increases!)
            var a00 = localTransform[0], a01 = localTransform[1], a02 = localTransform[2],
                a10 = localTransform[3], a11 = localTransform[4], a12 = localTransform[5],

                b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2],
                b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];

            worldTransform[0] = b00 * a00 + b01 * a10;
            worldTransform[1] = b00 * a01 + b01 * a11;
            worldTransform[2] = b00 * a02 + b01 * a12 + b02;

            worldTransform[3] = b10 * a00 + b11 * a10;
            worldTransform[4] = b10 * a01 + b11 * a11;
            worldTransform[5] = b10 * a02 + b11 * a12 + b12;
        },
        
        _refreshSize: function() {},
        
    });
    

})();
 
















