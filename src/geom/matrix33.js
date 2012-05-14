/*
 * matrix33.js
 */

tm.geom = tm.geom || {};

(function() {
    
    /**
     * @class
     * 3*3 マトリックスクラス
     */
    tm.geom.Matrix33 = tm.createClass({
        /**
         * 要素
         */
        m: null,
        
        /**
         * 初期化
         */
        init: function() {
            this.m = [];
            if (arguments.length >= 9) {
                this.set.apply(this, arguments);
            }
            else {
                this.identity();
            }
        },
        

        /**
         * セッター
         */
        set: function(m00, m01, m02, m10, m11, m12, m20, m21, m22)
        {
            console.assert(arguments.length>=9, "");
            
            // |m00, m01, m02|
            // |m10, m11, m12|
            // |m20, m21, m22|
            
            this.m00 = m00; this.m01 = m01; this.m02 = m02;
            this.m10 = m10; this.m11 = m11; this.m12 = m12;
            this.m20 = m20; this.m21 = m21; this.m22 = m22;
            
            return this;
        },
        
        /**
         * 配列からセット
         */
        setArray: function(arr)
        {
            this.set(
                arr[0], arr[3], arr[6],
                arr[1], arr[4], arr[7],
                arr[2], arr[5], arr[8]
            );
            
            return this;
        },
        
        /**
         * オブジェクトからセット
         */
        setObject: function(obj)
        {
            this.set(
                obj.m00, obj.m01, obj.m02,
                obj.m10, obj.m11, obj.m12,
                obj.m20, obj.m21, obj.m22
            );
            
            return this;
        },
        
        /**
         * 単位行列
         */
        identity: function() {
            var m = this.m;
            
            m[0] = 1; m[3] = 0; m[6] = 0;
            m[1] = 0; m[4] = 1; m[7] = 0;
            m[2] = 0; m[5] = 0; m[8] = 1;
            
            return this;
        },
        
        /**
         * 転地
         */
        transpose: function() {
            this.m.swap(1, 3);
            this.m.swap(2, 6);
            this.m.swap(5, 7);
            
            return this;
        },
        
        /**
         * ゼロクリア
         */
        zero: function() {
            this.set(
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            );
            
            return this;
        },
        
        /**
         * 移動
         */
        translate: function(x, y) {
            var m = this.m;
            
            m[6] = m[0] * x + m[3] * y + m[6];
            m[7] = m[1] * x + m[4] * y + m[7];
            m[8] = m[2] * x + m[5] * y + m[8];
            
            return this;
            
            return this.multiply( tm.geom.Matrix33.translate(x, y) );
        },
        
        /**
         * X軸回転
         */
        rotateX: function(rad) {
            return this.multiply( tm.geom.Matrix33.rotateX(rad) );
        },
        
        /**
         * Y軸回転
         */
        rotateY: function(rad) {
            return this.multiply( tm.geom.Matrix33.rotateY(rad) );
        },
        
        /**
         * Z軸回転
         */
        rotateZ: function(rad) {
            var s = Math.sin(rad);
            var c = Math.cos(rad);
            var m = this.m;
            
            var m00 = m[0];
            var m10 = m[1];
            var m20 = m[2];
            var m01 = m[3];
            var m11 = m[4];
            var m21 = m[5];
            
            
            return this.multiply( tm.geom.Matrix33.rotateZ(rad) );
        },
        
        /**
         * スケーリング
         */
        scale: function(x, y) {
            var m = this.m;
            
            m[0] *= x; m[3] *= y;
            m[1] *= x; m[4] *= y;
            m[2] *= x; m[5] *= y;
            
            return this;
            return this.multiply( tm.geom.Matrix33.scale(x, y) );
        },
        
        /**
         * 掛け算
         */
        multiply: function(mat)
        {
            var m = this.m;
            
            var m00 = m[0]*mat.m00 + m[3]*mat.m10 + m[6]*mat.m20;
            var m01 = m[0]*mat.m01 + m[3]*mat.m11 + m[6]*mat.m21;
            var m02 = m[0]*mat.m02 + m[3]*mat.m12 + m[6]*mat.m22;
            
            var m10 = m[1]*mat.m00 + m[4]*mat.m10 + m[7]*mat.m20;
            var m11 = m[1]*mat.m01 + m[4]*mat.m11 + m[7]*mat.m21;
            var m12 = m[1]*mat.m02 + m[4]*mat.m12 + m[7]*mat.m22;
            
            var m20 = m[2]*mat.m00 + m[5]*mat.m10 + m[8]*mat.m20;
            var m21 = m[2]*mat.m01 + m[5]*mat.m11 + m[8]*mat.m21;
            var m22 = m[2]*mat.m02 + m[5]*mat.m12 + m[8]*mat.m22;
            
            m[0] = m00; m[3] = m01; m[6] = m02;
            m[1] = m10; m[4] = m11; m[7] = m12;
            m[2] = m20; m[5] = m21; m[8] = m22;
            
            return this;
        },
        
        /**
         * ベクトルとの掛け算
         */
        multiplyVector2: function(v)
        {
            var vx = this.m00*v.x + this.m01*v.y + this.m02;
            var vy = this.m10*v.x + this.m11*v.y + this.m12;
            
            return v.set(vx, vy);
        },
        
        /**
         * ベクトルとの掛け算
         */
        multiplyVector3: function(v)
        {
            var vx = this.m00*v.x + this.m01*v.y + this.m02*v.z;
            var vy = this.m10*v.x + this.m11*v.y + this.m12*v.z;
            var vz = this.m20*v.x + this.m21*v.y + this.m22*v.z;
            
            return v.set(vx, vy, vz);
        },
        
        /**
         * 配列に変換
         */
        toArray: function() {
            return this.m.slice();
        },
        
        /**
         * 文字列化
         */
        toString: function() {
            return "|{m00}, {m01}, {m02}|\n|{m10}, {m11}, {m12}|\n|{m20}, {m21}, {m22}|".format(this);
        },
        
    });
    
    
    
    /**
     * @property    m00
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m00", {
        "get": function()   { return this.m[0]; },
        "set": function(v)  { this.m[0] = v;    }
    });
    /**
     * @property    m10
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m10", {
        "get": function()   { return this.m[1]; },
        "set": function(v)  { this.m[1] = v;    }
    });
    /**
     * @property    m20
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m20", {
        "get": function()   { return this.m[2]; },
        "set": function(v)  { this.m[2] = v;    }
    });
    
    /**
     * @property    m01
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m01", {
        "get": function()   { return this.m[3]; },
        "set": function(v)  { this.m[3] = v;    }
    });
    /**
     * @property    m11
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m11", {
        "get": function()   { return this.m[4]; },
        "set": function(v)  { this.m[4] = v;    }
    });
    /**
     * @property    m21
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m21", {
        "get": function()   { return this.m[5]; },
        "set": function(v)  { this.m[5] = v;    }
    });
    
    /**
     * @property    m02
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m02", {
        "get": function()   { return this.m[6]; },
        "set": function(v)  { this.m[6] = v;    }
    });
    /**
     * @property    m12
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m12", {
        "get": function()   { return this.m[7]; },
        "set": function(v)  { this.m[7] = v;    }
    });
    /**
     * @property    m22
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m22", {
        "get": function()   { return this.m[8]; },
        "set": function(v)  { this.m[8] = v;    }
    });
    

    /**
     * @static
     * @method
     * 移動
     */
    tm.geom.Matrix33.translate = function(x, y) {
        return tm.geom.Matrix33(
            1, 0, x,
            0, 1, y,
            0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * X軸回転
     */
    tm.geom.Matrix33.rotateX = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix33(
            1, 0, 0,
            0, c,-s,
            0, s, c
        );
    };
    
    /**
     * @static
     * @method
     * Y軸回転
     */
    tm.geom.Matrix33.rotateY = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix33(
             c, 0, s,
             0, 1, 0,
            -s, 0, c
        );
    };
    
    /**
     * @static
     * @method
     * Z軸回転
     */
    tm.geom.Matrix33.rotateZ = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix33(
            c,-s, 0,
            s, c, 0,
            0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * スケーリング
     */
    tm.geom.Matrix33.scale = function(x, y) {
        var mat = tm.geom.Matrix33();
        
        if (y == undefined) y = x;
        
        mat.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
        
        return mat;
    };
    
})();









